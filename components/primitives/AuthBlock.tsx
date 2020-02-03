/** @jsx jsx */
import { jsx } from "@emotion/core";
import Link from "next/link";
import TemtemButton from "@maael/temtem-button-component";
import TemtemText from "@maael/temtem-text-component";
import { colors } from "@maael/temtem-theme";
import useJWT from "../hooks/useJWT";

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
        src={jwt.redditIcon}
      />
      <Link href="/user/[name]" as={`/user/${jwt.redditName}`}>
        <a css={{ textDecoration: "none", cursor: "pointer" }}>
          <TemtemText containerStyle={{ marginRight: 5 }}>
            {jwt.redditName}
          </TemtemText>
        </a>
      </Link>
      <a href="/api/logout">
        <TemtemButton type={"Neutral" as any} bgColor={colors.uiBlueFaded}>
          Logout
        </TemtemButton>
      </a>
    </div>
  ) : (
    <a href="/api/login">
      <TemtemButton type={"Neutral" as any} bgColor={colors.uiBlue}>
        Login
      </TemtemButton>
    </a>
  );
}
