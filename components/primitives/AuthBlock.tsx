/** @jsx jsx */
import { jsx } from "@emotion/core";
import Link from "next/link";
import { FaDiscord, FaRedditAlien } from "react-icons/fa";
import TemtemButton from "@maael/temtem-button-component";
import TemtemText from "@maael/temtem-text-component";
import { colors } from "@maael/temtem-theme";
import useJWT from "../hooks/useJWT";
import { JWT_VERSION } from "../../util/constants";
import * as userUtil from "../../util/user";

export default function AuthBlock() {
  const jwt = useJWT();
  return jwt ? (
    <div
      css={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
      }}
    >
      <img
        css={{
          border: `2px solid ${colors.uiBlueFaded}`,
          height: 30,
          width: 30,
          borderRadius: "50%",
          margin: "0px 5px"
        }}
        src={userUtil.getUserIcon(jwt)}
      />
      <Link href="/user/[type]/[name]" as={userUtil.getUserProfileLink(jwt)}>
        <a css={{ textDecoration: "none", cursor: "pointer" }}>
          <TemtemText containerStyle={{ marginRight: 5 }}>
            {userUtil.getUserName(jwt)}
          </TemtemText>
        </a>
      </Link>
      <a href={`/api/logout?v${JWT_VERSION}&cb=${Math.random()}`}>
        <TemtemButton type={"Neutral" as any} bgColor={colors.uiBlueFaded}>
          Logout
        </TemtemButton>
      </a>
    </div>
  ) : (
    <div css={{ marginLeft: 10 }}>
      <a href={`/api/login/reddit?v${JWT_VERSION}&cb=${Math.random()}`}>
        <TemtemButton
          type={"Neutral" as any}
          bgColor="#FF5700"
          size="small"
          style={{ paddingLeft: 35, position: "relative" }}
        >
          <>
            <FaRedditAlien
              style={{ fontSize: 18, position: "absolute", left: 10, top: 9 }}
            />
            Login
          </>
        </TemtemButton>
      </a>
      <a href={`/api/login/discord?v${JWT_VERSION}&cb=${Math.random()}`}>
        <TemtemButton
          type={"Neutral" as any}
          bgColor="#7289DA"
          size="small"
          style={{ paddingLeft: 35, position: "relative" }}
        >
          <>
            <FaDiscord
              style={{ fontSize: 18, position: "absolute", left: 10, top: 10 }}
            />
            Login
          </>
        </TemtemButton>
      </a>
    </div>
  );
}
