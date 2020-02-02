export default function(_req, res) {
  res.cookie("temtem-jwt", "logged-out", {
    sameSite: "Lax",
    path: "/"
  });
  res.writeHead(301, { Location: "/" });
  res.end();
}
