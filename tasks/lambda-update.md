# Lambda Handler Update

## What Changed

- **Route map pattern** replaces double switch statement — single source of truth, no fallthrough bugs
- **Error handling** returns actual Riot API errors (rate limited, not found, etc.) instead of generic 500
- **Removed `item` endpoint** — frontend fetches DDragon directly, no hardcoded version to go stale
- **Removed junk query params** (`&method=GET&dataType=json` were jQuery options, not Riot API params)
- **Unknown `apiName`** returns 400 instead of crashing
- **`entriesBySummoner`** now uses `/league/v4/entries/by-puuid/` (puuid-based, replaces deprecated summoner ID lookup)
- **`response.data`** returned directly for all endpoints (no special-casing `[0]` that crashes on empty arrays)

## Updated handler.js

```js
"use strict";
const axios = require("axios");
const apiKey = process.env.league_api_key;

const API_ROUTES = {
  entriesBySummoner: (param) =>
    `https://na1.api.riotgames.com/lol/league/v4/entries/by-puuid/${param}`,
  matchByAccounts: (param) =>
    `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${param}/ids`,
  summonersByName: (param, tag) =>
    `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${param}/${tag}`,
  getSummonerId: (param) =>
    `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${param}`,
  championMastery: (param) =>
    `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${param}`,
  matches: (param) =>
    `https://americas.api.riotgames.com/lol/match/v5/matches/${param}`,
};

module.exports.example = async (event) => {
  try {
    const { apiName, apiParam, tagName } = event.queryStringParameters || {};

    const routeFn = API_ROUTES[apiName];
    if (!routeFn) {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ error: `Unknown apiName: ${apiName}` }),
      };
    }

    const url = `${routeFn(apiParam, tagName)}?api_key=${apiKey}`;
    const response = await axios.get(url);

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ message: response.data }),
    };
  } catch (err) {
    const status = err.response?.status || 500;
    return {
      statusCode: status,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({
        error: err.response?.data?.status?.message || "Internal error",
      }),
    };
  }
};
```
