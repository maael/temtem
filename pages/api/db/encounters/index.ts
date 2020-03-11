import cookies from "../../../../util/cookies";
import jwtGuard from "../../../../util/middlewares/jwtGuard";
import { createEncounter } from "../../../../util/db";

export default cookies(
  jwtGuard(async function(req, res) {
    if (req.method === "POST") {
      const userJWT = await req.getJWT();
      console.info("saving", req.body);
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
