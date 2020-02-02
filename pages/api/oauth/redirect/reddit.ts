import got from "got";
import { stringify } from "querystring";
import cookies from "../../../../util/cookies";
import jwt from "../../../../util/jwt";
import { JWT } from "../../../../types";
import { createUser } from "../../../../util/db";
import { JWT_VERSION } from "../../../../util/constants";

type Error =
  | "access_denied"
  | "unsupported_response_type"
  | "invalid_scope"
  | "invalid_request";

export default cookies(async function(req, res) {
  const { error, code, state } = req.query;
  if (!error) {
    if (state === "testing") {
      const { access_token } = await getAccessToken(code);
      if (access_token) {
        const identity = await getIdentity(access_token);
        const {
          _id,
          redditName,
          redditId,
          redditDarkmode,
          redditIcon
        } = await createUser({
          redditDarkmode: identity.pref_nightmode,
          redditIcon: identity.icon_img,
          redditName: identity.name,
          redditId: identity.id
        });
        const toEncode: JWT = {
          _id,
          redditId,
          redditName,
          redditIcon,
          redditDarkmode,
          version: JWT_VERSION
        };
        const jwtToken = await jwt(toEncode);
        res.cookie("temtem-jwt", jwtToken, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90),
          sameSite: "Lax",
          path: "/"
        });
        res.writeHead(301, { Location: "/" });
        res.end();
      } else {
        console.error("[response error]", "missing access_token");
      }
    } else {
      console.error("[state error]", "state mismatch", state, "testing");
    }
  } else {
    console.error("[error]", error);
  }
});

async function getAccessToken(code: string) {
  const tokenUri = `https://www.reddit.com/api/v1/access_token`;
  const body = stringify({
    grant_type: "authorization_code",
    code,
    redirect_uri: "https://temtem.mael.tech/api/oauth/redirect/reddit"
  });
  const Authorization = `Basic ${Buffer.from(
    `${process.env.REDDIT_OAUTH_ID}:${process.env.REDDIT_OAUTH_SECRET}`
  ).toString("base64")}`;
  const gotRes = await got(tokenUri, {
    method: "POST",
    body,
    headers: { Authorization }
  });
  if (gotRes.statusCode === 200) {
    console.info("[user info]", gotRes.body);
    return JSON.parse(gotRes.body || "{}");
  } else {
    console.info("[auth error]", gotRes.body);
  }
}

async function getIdentity(accessToken: string) {
  const res = await got("https://oauth.reddit.com/api/v1/me", {
    headers: {
      Authorization: `bearer ${accessToken}`
    }
  });
  if (res.statusCode === 200) {
    return JSON.parse(res.body || "{}");
  } else {
    console.info("[auth error]", res.body);
  }
}
