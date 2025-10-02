# Dev Joke Bot - Upgraded 🎉🤖

This is a **funny** upgrade of the original Dev Joke Bot — now with GIFs, better jokes, and a daily README that changes like your mood after reading stack traces.

> WARNING: excessive laughter may cause coffee spills, keyboard crumbs, and stale PRs.

## What it does

- Fetches high-quality programming jokes from JokeAPI.
- Fetches a related GIF from Giphy or Tenor (configurable).
- Tweets the joke + GIF via Twitter API (use your keys).
- Updates the repository `README.md` daily with a fresh joke + GIF preview via GitHub Actions.

## Setup (local quick start)

1. Copy `.env.example` → `.env` and fill keys (`GIPHY_API_KEY`, Twitter credentials, etc.).
2. Install deps:
```bash
npm ci
```
3. Run once locally (tweets live if your Twitter keys are valid):
```bash
npm run tweet
```
4. To just update README (without tweeting):
```bash
npm run update-readme
```

## GitHub Actions
A workflow included (`.github/workflows/daily.yml`) will run daily and update `README.md` with a fresh joke and GIF.

## Notes
- Twitter API access is required for tweeting images/GIFs. If you only want README updates, the GitHub Actions flow can run with only `GITHUB_TOKEN` and `GIPHY_API_KEY`.
- This project intentionally keeps the README *funny*. Don’t take it too seriously — it’s a joke bot after all. 😄

---
Powered by coffee, Node.js, and an unhealthy relationship with semicolons.
