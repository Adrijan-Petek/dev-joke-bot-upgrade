require('dotenv').config();
const fetch = require('node-fetch');
const { getJoke } = require('./getJoke');
const { getGif } = require('./getGif');
const { createTwitterClient } = require('./twitterClient');
const { updateReadmeWith } = require('./updateReadmeHelper');

async function main() {
  const joke = await getJoke();
  const gifUrl = await getGif('programming meme') || '';
  console.log('Joke:', joke);
  console.log('GIF:', gifUrl);

  // Update README locally
  await updateReadmeWith(joke, gifUrl);

  // Tweet if twitter is configured
  const client = createTwitterClient();
  if (client) {
    try {
      // Download GIF (if exists) and upload
      if (gifUrl) {
        const resp = await fetch(gifUrl);
        const buf = await resp.buffer();
        const mediaId = await client.v1.uploadMedia(Buffer.from(buf), { mimeType: 'image/gif' });
        await client.v2.tweet({ text: joke, media: { media_ids: [mediaId] } });
        console.log('Tweeted with GIF');
      } else {
        await client.v2.tweet({ text: joke });
        console.log('Tweeted text-only');
      }
    } catch (e) {
      console.error('Tweet failed', e && e.message);
    }
  } else {
    console.log('Twitter client not configured; skipping tweet');
  }
}

main().catch(e => { console.error(e); process.exit(1); });
