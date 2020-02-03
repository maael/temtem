import cookies from "../../../../../util/cookies";
import { getExchangeListings } from "../../../../../util/db";

export default cookies(async function(req, res) {
  const userJWT = await req.getJWT();
  if (!userJWT) {
    return res.status(400).json({ error: "not authenticated" });
  }
  if (req.method === "GET") {
    res.json(await getExchangeListings());
  } else {
    res.json({ error: "not-implemented" });
  }
});
