import { getUsers } from "../../../../util/db";

export default async function(req, res) {
  if (req.method === "GET") {
    const users = await getUsers();
    res.json(users || { data: [] });
  } else {
    res.json({ error: "not-implemented" });
  }
}
