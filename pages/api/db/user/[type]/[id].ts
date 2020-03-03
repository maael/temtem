import cookies from "../../../../../util/cookies";
import {
  getUserByRedditName,
  getUserByDiscordName
} from "../../../../../util/db";

export default cookies(async function(req, res) {
  const { id, type } = req.query;
  const method = type === "reddit" ? getUserByRedditName : getUserByDiscordName;
  if (req.method === "GET") {
    const user = await method(id);
    res.json(user || {});
    return;
  } else {
    res.json({ error: "not-implemented" });
  }
});
