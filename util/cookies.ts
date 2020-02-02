import { serialize, parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import * as jwt from "../util/jwt";
import { JWT_VERSION } from "../util/constants";
import { JWT } from "../types/index";

type NextApiResponseWithCookie = NextApiResponse & {
  cookie: (name: string, value: string, options: any) => void;
};

type NextApiRequestWithJWT = NextApiRequest & {
  getJWT: () => Promise<JWT | undefined>;
};
/**
 * This sets `cookie` on `res` object
 */
const cookie = (
  res: NextApiResponse,
  name: string,
  value: string,
  options: any = {}
) => {
  const stringValue =
    typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);

  if ("maxAge" in options) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge /= 1000;
  }

  res.setHeader("Set-Cookie", serialize(name, String(stringValue), options));
};

/**
 * Adds `cookie` function on `res.cookie` to set cookies for response
 */
const cookies = (
  handler: (
    req: NextApiRequestWithJWT,
    res: NextApiResponseWithCookie
  ) => void | Promise<void>
) => async (req: NextApiRequestWithJWT, res: NextApiResponseWithCookie) => {
  res.cookie = (name, value, options) => cookie(res, name, value, options);
  req.getJWT = async () => {
    const items = parse(req.headers.cookie || "");
    if (!items["temtem-jwt"]) return;
    const decoded = await jwt.verify(items["temtem-jwt"]);
    if (decoded && decoded.version !== JWT_VERSION) return;
    return decoded;
  };
  return await handler(req, res);
};

export default cookies;
