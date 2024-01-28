import cookies from "../../../../../util/cookies";
import jwtGuard from "../../../../../util/middlewares/jwtGuard";
import { createExchangeSaved } from "../../../../../util/db";
import { getExchangeSaved } from "../../../../../util/fql-db";

export default cookies(
  jwtGuard(async function(req, res) {
    const userJWT = await req.getJWT();
    if (req.method === "GET") {
      res.json(await getExchangeSaved(userJWT._id));
    } else if (req.method === "POST") {
      res.json(await createExchangeSaved({ ...req.body, userId: userJWT._id }));
    } else {
      res.json({ error: "not-implemented" });
    }
  })
);
