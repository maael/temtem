import cookies from "../../../../util/cookies";
import { getTempediaEntries, createTempediaEntry } from "../../../../util/db";

export default cookies(async function(req, res) {
  const userJWT = await req.getJWT();
  if (!userJWT) {
    return res.status(400).json({ error: "not authenticated" });
  }
  if (req.method === "GET") {
    res.json(await getTempediaEntries(userJWT._id));
  } else if (req.method === "POST") {
    res.json(
      await createTempediaEntry({
        userId: userJWT._id,
        temtemName: req.body.temtemName
      })
    );
  } else if (req.method === "DELETE") {
    res.json({ error: "not-implemented" });
  } else {
    res.json({ error: "not-implemented" });
  }
});
