import cookies from "../../../../../../util/cookies";
import { getUserExchangeListings } from "../../../../../../util/fql-db";

export default cookies(async function(req, res) {
  const userJWT = await req.getJWT();
  if (!userJWT) {
    res.status(400).json({ error: "not authenticated" });
    return;
  }
  if (!req.query.userId) {
    res.status(400).json({ error: "missing param" });
    return;
  }
  if (req.method === "GET") {
    const listings = await getUserExchangeListings(req.query.userId);
    res.json(listings);
  } else {
    res.json({ error: "not-implemented" });
  }
});
