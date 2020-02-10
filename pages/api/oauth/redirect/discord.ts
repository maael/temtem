import qs from "querystring";
import url from "url";
import got from "got";
import * as jwt from "../../../../util/jwt";
import cookies, { NextApiResponseWithCookie } from "../../../../util/cookies";
import { getUserByDiscordName, createUser } from "../../../../util/db";
import { JWT_VERSION } from "../../../../util/constants";
import { User } from "../../../../types/db";
import { JWT } from "../../../../types";

export default cookies(async function(req, res) {
  const { code, _state } = req.query;
  const { access_token, token_type } = await getTokenFromCode(code);
  const identity = await getIdentityFromToken(token_type, access_token);
  console.info("identity", identity);
  const user = await getOrCreateUser(identity);
  await setUserCookie(res, user);
  res.writeHead(301, { Location: "/" });
  res.end();
});

interface DiscordUser {
  id: string;
  username: string;
  discriminator: number;
  avatar?: string;
}

async function setUserCookie(
  res: NextApiResponseWithCookie,
  user: Pick<User, "_id" | "discordIcon" | "discordName" | "discordId">
) {
  const toEncode: JWT = {
    ...user,
    version: JWT_VERSION
  };
  const jwtToken = await jwt.sign(toEncode);
  res.cookie("temtem-jwt", jwtToken as string, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90),
    sameSite: "Lax",
    path: "/"
  });
}

async function getIdentityFromToken(
  tokenType: string,
  accessToken: string
): Promise<DiscordUser> {
  return got(`https://discordapp.com/api/users/@me`, {
    headers: {
      Authorization: `${tokenType} ${accessToken}`
    }
  }).json();
}

async function getTokenFromCode(
  code: string
): Promise<{
  access_token: string;
  token_type: string;
  expires_in: string;
  refresh_token: string;
  scope: string;
}> {
  const basicAuth = new Buffer(
    `${process.env.DISCORD_OAUTH_ID!}:${process.env.DISCORD_OAUTH_SECRET!}`
  ).toString("base64");
  return got
    .post(
      `https://discordapp.com/api/oauth2/token?${qs.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: `${process.env.OAUTH_REDIRECT_ORIGIN}/api/oauth/redirect/discord`,
        scope: "identity"
      })}`,
      {
        headers: {
          Authorization: `Basic ${basicAuth}`
        }
      }
    )
    .json();
}

async function getOrCreateUser(
  identity: DiscordUser
): Promise<Pick<User, "_id" | "discordIcon" | "discordName" | "discordId">> {
  const result = await getUserByDiscordName(identity.username);
  if (result) {
    return {
      _id: result._id,
      discordName: result.discordName,
      discordId: result.discordId,
      discordIcon: result.discordIcon
    };
  }
  const parsedIconUrl = url.parse(identity.avatar || "");
  const { _id, discordIcon, discordName, discordId } = await createUser({
    discordIcon: identity.avatar
      ? `https://cdn.discordapp.com/avatars/${identity.id}/${identity.avatar}.png`
      : `https://cdn.discordapp.com/embed/avatars/${identity.discriminator %
          5}.png`,
    discordName: identity.username,
    discordId: identity.id
  });
  return {
    _id,
    discordIcon,
    discordName,
    discordId
  };
}
