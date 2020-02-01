import got from "got";
import { stringify } from "querystring";

type Error =
  | "access_denied"
  | "unsupported_response_type"
  | "invalid_scope"
  | "invalid_request";

export default async function(req, res) {
  const { error, code, state } = req.query;
  console.info("api/oauth/redirect/reddit", error, code, state);
  if (!error) {
    if (state === "testing") {
      const tokenUri = `https://www.reddit.com/api/v1/access_token`;
      const body = stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: "https://temtem.mael.tech/api/oauth/redirect/reddit"
      });
      const Authorization = new Buffer(
        `${process.env.REDDIT_OAUTH_ID}:${process.env.REDDIT_OAUTH_SECRET}`
      ).toString("base64");
      const gotRes = await got(tokenUri, {
        method: "POST",
        body,
        headers: { Authorization }
      });
      if (gotRes.statusCode === 200) {
        console.info("[user info]", gotRes.body);
        res.json(gotRes.body);
      } else {
        console.info("[auth error]", gotRes.body);
      }
    } else {
      console.info("[state error]", "state mismatch", state, "testing");
    }
  } else {
    console.info("[error]", error);
  }
}
