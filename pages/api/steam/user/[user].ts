import fetch from "isomorphic-fetch";
import { NextApiRequest, NextApiResponse } from "next";

const STEAM_KEY = process.env.STEAM_KEY;

export default async function steamUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const isSteamId =
      req.query.user.length === 17 && !isNaN(Number(req.query.user));
    let steamId = req.query.user;
    if (!steamId) {
      res.status(400).json({ error: "Missing steam ID" });
      return;
    }
    if (!isSteamId) {
      const fres = await fetch(
        `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${STEAM_KEY}&vanityurl=${req.query.user}`
      );
      const json = await fres.json();
      steamId = json.response.steamid;
    }
    const fres2 = await fetch(
      `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_KEY}&steamids=${steamId}`
    );
    const json2 = await fres2.json();
    res.json(json2.response.players[0] || {});
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
