import cookies from "../../../../../util/cookies";
import { getTempediaEntries } from "../../../../../util/fql-db";

export default cookies(async function(req, res) {
  if (!req.query.userId) {
    res.status(400).json({ error: "missing param" });
    return;
  }
  if (req.method === "GET") {
    const tempedia = await getTempediaEntries(req.query.userId);
    res.json(tempedia);
  } else {
    res.json({ error: "not-implemented" });
  }
});
