import cookies from "../../../../../util/cookies";
import jwtGuard from "../../../../../util/middlewares/jwtGuard";
import paramGuard from "../../../../../util/middlewares/paramGuard";
import { deleteExchangeSaved } from "../../../../../util/fql-db";

export default paramGuard(
  cookies(
    jwtGuard(async function(req, res) {
      if (req.method === "DELETE") {
        res.json(await deleteExchangeSaved(req.query.id));
      } else {
        res.json({ error: "not-implemented" });
      }
    })
  ),
  ["id"]
);
