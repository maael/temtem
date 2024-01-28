import cookies from "../../../../../../util/cookies";
import paramGuard from "../../../../../../util/middlewares/paramGuard";
import {
  updateExchangeListing,
  setExchangeInactive
} from "../../../../../../util/db";
import { getExchangeListing } from "../../../../../../util/fql-db";

export default paramGuard(
  cookies(async function(req, res) {
    const userJWT = await req.getJWT();
    if (req.method === "GET") {
      const listing = await getExchangeListing(req.query.listingId);
      res.json(listing);
    } else if (req.method === "PUT") {
      if (!userJWT) {
        res.status(400).json({ error: "missing jwt" });
        return;
      }
      res.json(
        await updateExchangeListing(req.query.listingId, {
          ...req.body,
          userId: userJWT._id
        })
      );
    } else if (req.method === "DELETE") {
      if (!userJWT) {
        res.status(400).json({ error: "missing jwt" });
        return;
      }
      res.json(
        await setExchangeInactive(req.query.listingId, {
          ...req.body,
          userId: userJWT._id
        })
      );
    } else {
      res.json({ error: "not-implemented" });
    }
  }),
  ["listingId"]
);
