import cookies from "../../../util/cookies";
import jwtGuard from "../../../util/middlewares/jwtGuard";
import { getUserQuests, createUserQuests } from "../../../util/db";

export default cookies(
  jwtGuard(async function(req, res) {
    const userJWT = await req.getJWT();
    if (req.method === "GET") {
      res.json(await getUserQuests(userJWT._id));
    } else if (req.method === "POST") {
      res.json(
        await createUserQuests({
          userId: userJWT._id,
          questName: req.body.questName,
          questStarted: false,
          questFinished: false
        })
      );
    } else if (req.method === "DELETE") {
      res.json({ error: "not-implemented" });
    } else {
      res.json({ error: "not-implemented" });
    }
  })
);
