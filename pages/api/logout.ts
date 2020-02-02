import cookies from "../../util/cookies";

export default cookies(function(_req, res) {
  res.cookie("temtem-jwt", "logged-out", {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90),
    sameSite: "Lax",
    path: "/"
  });
  res.writeHead(301, { Location: "/" });
  res.end();
});
