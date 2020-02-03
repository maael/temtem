import cookies from "../../../util/cookies";
import { getUserQuests } from "../../../util/db";

export default cookies(async function(req, res) {
  const userJWT = await req.getJWT();
  if (!userJWT) {
    return res.status(400).json({ error: "not authenticated" });
  }
  if (req.method === "GET") {
    res.json(await getUserQuests(userJWT._id));
  } else if (req.method === "POST") {
    res.json({ error: "not-implemented" });
  } else if (req.method === "DELETE") {
    res.json({ error: "not-implemented" });
  } else {
    res.json({ error: "not-implemented" });
  }
});
