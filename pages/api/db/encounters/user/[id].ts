import cookies from "../../../../../util/cookies";
import paramGuard from "../../../../../util/middlewares/paramGuard";
import { getUserEncounter } from "../../../../../util/fql-db";

export default paramGuard(
  cookies(async function(req, res) {
    if (req.method === "GET") {
      res.json(await getUserEncounter(req.query.id));
    } else {
      res.json({ error: "not-implemented" });
    }
  }),
  ["id"]
);
