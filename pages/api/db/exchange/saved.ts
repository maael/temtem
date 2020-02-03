import cookies from "../../../../util/cookies";
import { getExchangeSaved, createExchangeSaved } from "../../../../util/db";

export default cookies(async function(req, res) {
  const userJWT = await req.getJWT();
  if (!userJWT) {
    return res.status(400).json({ error: "not authenticated" });
  }
  if (req.method === "GET") {
    res.json(await getExchangeSaved(userJWT._id));
  } else if (req.method === "POST") {
    res.json(await createExchangeSaved({ ...req.body, userId: userJWT._id }));
  } else if (req.method === "DELETE") {
    res.json({ error: "not-implemented" });
  } else {
    res.json({ error: "not-implemented" });
  }
});
