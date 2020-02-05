import cookies from "../../../../../../util/cookies";
import jwtGuard from "../../../../../../util/middlewares/jwtGuard";
import paramGuard from "../../../../../../util/middlewares/paramGuard";
import {
  getExchangeListing,
  updateExchangeListing,
  setExchangeInactive
} from "../../../../../../util/db";

export default paramGuard(
  cookies(
    jwtGuard(async function(req, res) {
      const userJWT = await req.getJWT();
      if (req.method === "GET") {
        res.json(await getExchangeListing(req.query.listingId));
      } else if (req.method === "PUT") {
        res.json(
          await updateExchangeListing(req.query.listingId, {
            ...req.body,
            userId: userJWT._id
          })
        );
      } else if (req.method === "DELETE") {
        res.json(
          await setExchangeInactive(req.query.listingId, {
            ...req.body,
            userId: userJWT._id
          })
        );
      } else {
        res.json({ error: "not-implemented" });
      }
    })
  ),
  ["listingId"]
);
