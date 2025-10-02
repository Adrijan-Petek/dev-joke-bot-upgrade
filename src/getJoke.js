require('dotenv').config();
const fetch = require('node-fetch');

/**
 * Fetch a programming joke from JokeAPI (https://jokeapi.dev/)
 * Falls back to icanhazdadjoke if needed.
 */
async function getJoke() {
  try {
    const res = await fetch('https://v2.jokeapi.dev/joke/Programming?type=single,twopart&blacklistFlags=nsfw,religious,political,sexist,explicit');
    const data = await res.json();
    if (!data) throw new Error('no joke');
    if (data.type === 'single') {
      return data.joke;
    }
    if (data.type === 'twopart') {
      return `${data.setup}\n\n${data.delivery}`;
    }
    // fallback
    const r = await fetch('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } });
    const jd = await r.json();
    return jd.joke || 'I have no joke left...';
  } catch (err) {
    console.error('getJoke error', err);
    return 'JokeAPI is out of coffee ☕';
  }
}

module.exports = { getJoke };
