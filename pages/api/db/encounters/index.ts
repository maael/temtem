import cookies from "../../../../util/cookies";
import jwtGuard from "../../../../util/middlewares/jwtGuard";
import { createEncounter } from "../../../../util/fql-db";

export default cookies(
  jwtGuard(async function(req, res) {
    if (req.method === "POST") {
      const userJWT = await req.getJWT();
      res.json(
        await createEncounter({
          userId: userJWT._id,
          ...req.body
        })
      );
    } else {
      res.json({ error: "not-implemented" });
    }
  })
);
