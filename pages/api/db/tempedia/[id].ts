import cookies from "../../../../util/cookies";
import paramGuard from "../../../../util/middlewares/paramGuard";
import jwtGuard from "../../../../util/middlewares/jwtGuard";
import { deleteTempediaEntry } from "../../../../util/db";

export default paramGuard(
  cookies(
    jwtGuard(async function(req, res) {
      const userJWT = await req.getJWT();
      if (!userJWT) {
        res.status(400).json({ error: "not authenticated" });
        return;
      }
      if (req.method === "DELETE") {
        res.json(await deleteTempediaEntry(req.query.id));
      } else if (req.method === "DELETE") {
        res.json({ error: "not-implemented" });
      } else {
        res.json({ error: "not-implemented" });
      }
    })
  ),
  ["id"]
);
