import cookies from "../../../../../util/cookies";
import { getTempediaEntries } from "../../../../../util/db";

export default cookies(async function(req, res) {
  const userJWT = await req.getJWT();
  if (!userJWT) {
    return res.status(400).json({ error: "not authenticated" });
  }
  if (!req.query.userId) {
    return res.status(400).json({ error: "missing param" });
  }
  if (req.method === "GET") {
    const tempedia = await getTempediaEntries(req.query.userId);
    res.json(tempedia);
  } else {
    res.json({ error: "not-implemented" });
  }
});
