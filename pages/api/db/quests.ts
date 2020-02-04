import cookies from "../../../util/cookies";
import { getUserQuests, createUserQuests } from "../../../util/db";

export default cookies(async function(req, res) {
  const userJWT = await req.getJWT();
  if (!userJWT) {
    return res.status(400).json({ error: "not authenticated" });
  }
  if (req.method === "GET") {
    res.json(await getUserQuests(userJWT._id));
  } else if (req.method === "POST") {
    res.json(
      await createUserQuests({
        userId: userJWT._id,
        questName: req.body.questName
      })
    );
  } else if (req.method === "DELETE") {
    res.json({ error: "not-implemented" });
  } else {
    res.json({ error: "not-implemented" });
  }
});
