import cookies from "../../../../../util/cookies";
import { createExchangeListing } from "../../../../../util/db";
import { getUserExchangeListings } from "../../../../../util/fql-db";

export default cookies(async function(req, res) {
  const userJWT = await req.getJWT();
  if (!userJWT) {
    res.status(400).json({ error: "not authenticated" });
    return;
  }
  if (req.method === "GET") {
    res.json(await getUserExchangeListings(userJWT._id));
  } else if (req.method === "POST") {
    res.json(await createExchangeListing({ ...req.body, userId: userJWT._id }));
  } else {
    res.json({ error: "not-implemented" });
  }
});
