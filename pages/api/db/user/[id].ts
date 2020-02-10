import cookies from "../../../../util/cookies";
import { getUserByRedditName, getUserByDiscordName } from "../../../../util/db";

export default cookies(async function(req, res) {
  const userJWT = await req.getJWT();
  if (!userJWT) {
    return res.status(400).json({ error: "not authenticated" });
  }
  if (req.method === "GET") {
    const user = await getUserByRedditName(req.query.id);
    if (user) {
      res.json(user || {});
      return;
    }
    const discUser = await getUserByDiscordName(req.query.id);
    res.json(discUser || {});
  } else {
    res.json({ error: "not-implemented" });
  }
});
