require('dotenv').config();
const fetch = require('node-fetch');

/**
 * Fetch a GIF URL using Giphy first, then Tenor fallback.
 * Tag is a keyword like 'programming', 'funny', 'meme'.
 */
async function getGif(tag = 'programming') {
  try {
    const giphyKey = process.env.GIPHY_API_KEY;
    if (giphyKey) {
      const r = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${giphyKey}&tag=${encodeURIComponent(tag)}&rating=pg-13`);
      const j = await r.json();
      if (j && j.data && j.data.images && j.data.images.original && j.data.images.original.url) {
        return j.data.images.original.url;
      }
    }
  } catch (e) {
    console.warn('Giphy failed:', e && e.message);
  }

  // Tenor fallback
  try {
    const tenorKey = process.env.TENOR_API_KEY;
    if (tenorKey) {
      const r2 = await fetch(`https://g.tenor.com/v1/random?q=${encodeURIComponent(tag)}&key=${tenorKey}&limit=1`);
      const j2 = await r2.json();
      if (j2 && j2.results && j2.results[0] && j2.results[0].media && j2.results[0].media[0] && j2.results[0].media[0].gif && j2.results[0].media[0].gif.url) {
        return j2.results[0].media[0].gif.url;
      }
    }
  } catch (e) {
    console.warn('Tenor failed:', e && e.message);
  }

  return null;
}

module.exports = { getGif };
