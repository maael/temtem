import cookies from "../../../../../util/cookies";
import { getExchangeListings } from "../../../../../util/db";

export default cookies(async function(req, res) {
  if (req.method === "GET") {
    res.json(await getExchangeListings());
  } else {
    res.json({ error: "not-implemented" });
  }
});
