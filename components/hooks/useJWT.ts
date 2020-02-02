import { useState } from "react";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { JWT } from "../../types";

export default function useJWT() {
  const [userJWT, setUserJWT] = useState<JWT | null>();
  if (typeof document === "undefined") return;
  const parsed = cookie.parse(document.cookie)["temtem-jwt"];
  const decoded = jwt.decode(parsed, { json: true });
  if (!jwt && isValidJWT(decoded)) {
    setUserJWT(decoded);
  }
  return userJWT;
}

function isValidJWT(inp: any): inp is JWT {
  return true;
}
