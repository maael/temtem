import { useEffect, useState } from "react";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { JWT } from "../../types";
import MOCK_JWT from "../../util/mockJWT";
import { JWT_VERSION } from "../../util/constants";

export default function useJWT() {
  const [userJWT, setUserJWT] = useState<JWT | null>();

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      if (window.location.search.includes("logged-out")) return;
      setUserJWT(MOCK_JWT);
      return;
    }
    const parsed = cookie.parse(document.cookie)["temtem-jwt"];
    const decoded = jwt.decode(parsed, { json: true });
    if (!userJWT && isValidJWT(decoded)) {
      setUserJWT(decoded);
    }
  });
  return userJWT;
}

function isValidJWT(inp: any): inp is JWT {
  return inp && typeof inp === "object" && inp.version === JWT_VERSION;
}
