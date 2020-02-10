import cookies from "../../../../../util/cookies";
import {
  getUserByRedditName,
  getUserByDiscordName
} from "../../../../../util/db";

export default cookies(async function(req, res) {
  const userJWT = await req.getJWT();
  const { id, type } = req.query;
  const method = type === "reddit" ? getUserByRedditName : getUserByDiscordName;
  if (!userJWT) {
    console.warn("not authenticated");
    return res.status(400).json({ error: "not authenticated" });
  }
  if (req.method === "GET") {
    const user = await method(req.query.id);
    res.json(user || {});
    return;
  } else {
    res.json({ error: "not-implemented" });
  }
});
