import cookies from "../../../../util/cookies";
import { getUser } from "../../../../util/db";

export default cookies(async function(req, res) {
  const userJWT = await req.getJWT();
  if (!userJWT) {
    return res.status(400).json({ error: "not authenticated" });
  }
  if (req.method === "GET") {
    res.json(await getUser(req.query.id));
  } else {
    res.json({ error: "not-implemented" });
  }
});
