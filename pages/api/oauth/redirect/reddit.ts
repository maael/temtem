import got from "got";
import { stringify } from "querystring";
import cookies from "../../../../util/cookies";
import * as jwt from "../../../../util/jwt";
import { JWT } from "../../../../types";
import { createUser, getUser } from "../../../../util/db";
import { JWT_VERSION } from "../../../../util/constants";

async function getOrCreateUser(identity: any) {
  const result = await getUser(identity.name);
  if (result) {
    return {
      _id: result._id,
      redditName: result.redditName,
      redditId: result.redditId,
      redditDarkmode: result.redditDarkmode,
      redditIcon: result.redditIcon
    };
  }
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
  return {
    _id,
    redditName,
    redditId,
    redditDarkmode,
    redditIcon
  };
}

export default cookies(async function(req, res) {
  const { error, code, state } = req.query;
  try {
    if (!error) {
      if (state === process.env.OAUTH_STATE) {
        const { access_token } = await getAccessToken(code as string);
        if (access_token) {
          const identity = await getIdentity(access_token);
          const {
            _id,
            redditName,
            redditId,
            redditDarkmode,
            redditIcon
          } = await getOrCreateUser(identity);
          const toEncode: JWT = {
            _id,
            redditId,
            redditName,
            redditIcon,
            redditDarkmode,
            version: JWT_VERSION
          };
          const jwtToken = await jwt.sign(toEncode);
          res.cookie("temtem-jwt", jwtToken as string, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90),
            sameSite: "Lax",
            path: "/"
          });
          res.writeHead(301, { Location: "/" });
          res.end();
        } else {
          res.writeHead(302, { Location: "/?error=missing_access_token" });
          res.end();
        }
      } else {
        res.writeHead(302, { Location: "/?error=state_mismatch" });
        res.end();
      }
    } else {
      if (error === "access_denied") {
        res.writeHead(302, { Location: "/" });
        res.end();
      } else {
        res.writeHead(302, { Location: `/?error=${error}` });
        res.end();
      }
    }
  } catch (err) {
    res.writeHead(302, {
      Location: `/?error=${encodeURIComponent(err.message)}`
    });
    res.end();
  }
});

async function getAccessToken(code: string) {
  const tokenUri = `https://www.reddit.com/api/v1/access_token`;
  const body = stringify({
    grant_type: "authorization_code",
    code,
    redirect_uri: `${process.env.REDDIT_OAUTH_REDIRECT_ORIGIN}/api/oauth/redirect/reddit`
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
