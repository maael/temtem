import cookies from "../../../../../../util/cookies";
import jwtGuard from "../../../../../../util/middlewares/jwtGuard";
import paramGuard from "../../../../../../util/middlewares/paramGuard";
import { getExchangeListing } from "../../../../../../util/db";

export default paramGuard(
  cookies(
    jwtGuard(async function(req, res) {
      const userJWT = await req.getJWT();
      if (req.method === "GET") {
        console.info("getting for", req.query.listingId);
        res.json(await getExchangeListing(req.query.listingId));
      } else if (req.method === "DELETE") {
        res.json({ error: "not-implemented" });
      } else {
        res.json({ error: "not-implemented" });
      }
    })
  ),
  ["listingId"]
);
