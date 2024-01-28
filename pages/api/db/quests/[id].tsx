import cookies from "../../../../util/cookies";
import jwtGuard from "../../../../util/middlewares/jwtGuard";
import paramGuard from "../../../../util/middlewares/paramGuard";
import { updateUserQuest } from "../../../../util/fql-db";

export default paramGuard(
  cookies(
    jwtGuard(async function(req, res) {
      const userJWT = await req.getJWT();
      if (req.method === "PUT") {
        res.json(
          await updateUserQuest(req.query.id, {
            userId: userJWT._id,
            ...req.body
          })
        );
      } else if (req.method === "DELETE") {
        res.json({ error: "not-implemented" });
      } else {
        res.json({ error: "not-implemented" });
      }
    })
  ),
  ["id"]
);
