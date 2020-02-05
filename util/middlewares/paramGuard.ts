import { NextApiRequest, NextApiResponse } from "next";
import { NextApiResponseWithCookie, NextApiRequestWithJWT } from "../cookies";

const paramGuard = (
  handler: (
    req: NextApiRequestWithJWT | NextApiRequest,
    res: NextApiResponseWithCookie | NextApiResponse
  ) => void | Promise<void>,
  requiredParams: string[]
) => async (
  req: NextApiRequestWithJWT | NextApiRequest,
  res: NextApiResponseWithCookie | NextApiResponse
) => {
  try {
    if (
      !requiredParams.every(
        r => Object.keys(req.query).includes(r) && req.query[r] !== undefined
      )
    ) {
      console.warn("failed param check", req.query);
      return res.status(400).json({ error: "missing param" });
    }
    return await handler(req, res);
  } catch (e) {
    console.error(e);
    return res.status(500);
  }
};

export default paramGuard;
