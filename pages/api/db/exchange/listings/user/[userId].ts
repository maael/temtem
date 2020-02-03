import cookies from "../../../../../../util/cookies";
import { getUserExchangeListings } from "../../../../../../util/db";

export default cookies(async function(req, res) {
  const userJWT = await req.getJWT();
  if (!userJWT) {
    return res.status(400).json({ error: "not authenticated" });
  }
  if (!req.query.userId) {
    return res.status(400).json({ error: "missing param" });
  }
  if (req.method === "GET") {
    const listings = await getUserExchangeListings(req.query.userId);
    res.json(listings);
  } else {
    res.json({ error: "not-implemented" });
  }
});
