import { NextApiResponseWithCookie, NextApiRequestWithJWT } from "../cookies";

const jwtGuard = (
  handler: (req: any, res: NextApiResponseWithCookie) => void | Promise<void>
) => async (req: NextApiRequestWithJWT, res: any) => {
  try {
    const userJWT = await req.getJWT();
    if (!userJWT) {
      console.warn("failed jwt guard");
      return res.status(400).json({ error: "not authenticated" });
    }
    return await handler(req, res);
  } catch (e) {
    console.error(e);
    return res.status(500);
  }
};

export default jwtGuard;
