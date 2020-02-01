/** @jsx jsx */
import { useEffect, useState } from "react";
import Link from "next/link";
import { Global, jsx } from "@emotion/core";
import { colors, fonts } from "@maael/temtem-theme";

export default function TemtemApp({ Component, pageProps }) {
  const [pathname, setPathname] = useState("");
  useEffect(() => {
    setPathname(window.location.pathname);
  });
  return (
    <div>
      <Global
        styles={{
          body: {
            backgroundColor: colors.uiBgGradientStart,
            color: "#FFFFFF",
            ...fonts.default,
            padding: 0,
            margin: 0
          }
        }}
      />
      <div
        css={{
          backgroundColor: colors.uiOutline,
          padding: 5,
          fontSize: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div css={{ flex: 1, height: 1, backgroundColor: colors.uiBlue }}></div>
        <div css={{ padding: "0px 5px" }}>Temtem Tools</div>
        <div css={{ flex: 1, height: 1, backgroundColor: colors.uiBlue }}></div>
      </div>
      <div
        css={{
          backgroundColor: colors.uiOutline,
          padding: "10px 5px",
          fontSize: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <NavItem url="/" pathname={pathname}>
          Home
        </NavItem>
        <NavItem url="/exchange" pathname={pathname}>
          Temtem Exchange
        </NavItem>
        <NavItem url="/tempedia" pathname={pathname}>
          Personal Tempedia
        </NavItem>
        <NavItem url="/quest-tracker" pathname={pathname}>
          Quest Tracker
        </NavItem>
        <NavItem url="/battle-tools" pathname={pathname}>
          Battle Tools
        </NavItem>
      </div>
      <Component {...pageProps} />
    </div>
  );
}

function NavItem({
  url,
  pathname,
  children
}: {
  url: string;
  pathname: string;
  children: string;
}) {
  return (
    <Link href={url}>
      <a
        css={{
          borderBottom: `2px solid ${
            pathname === url ? colors.uiBlue : colors.uiBlueFaded
          }`,
          margin: "0 10px",
          padding: "0px 2px",
          cursor: "pointer",
          "&:hover": {
            borderColor: colors.uiBlue
          }
        }}
      >
        {children}
      </a>
    </Link>
  );
}
