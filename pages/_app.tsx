/** @jsx jsx */
import React, { useState } from "react";
import Head from "next/head";
import { Global, jsx } from "@emotion/core";
import { TiHomeOutline } from "react-icons/ti";
import { FaReddit, FaDiscord } from "react-icons/fa";
import { colors, fonts } from "@maael/temtem-theme";
import NavItem from "../components/primitives/NavItem";
import HeaderBar from "../components/primitives/HeaderBar";
import AuthBlock from "../components/primitives/AuthBlock";
import HideOnMobile from "../components/primitives/HideOnMobile";
import HideOnDesktop from "../components/primitives/HideOnDesktop";
import OverlayMenu from "../components/primitives/OverlayMenu";
import useJWT from "../components/hooks/useJWT";
import { getUserProfileLink } from "../util/user";

export default function TemtemApp({ Component, pageProps }) {
  const [overlay, setOverlay] = useState(false);
  const jwt = useJWT();
  return (
    <div css={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Head>
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
        <meta httpEquiv="content-language" content="en-gb" />
        <meta name="theme-color" content={colors.uiBgGradientStart} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Temtools</title>
      </Head>
      <Global
        styles={{
          html: {
            minHeight: "100vh"
          },
          body: {
            backgroundColor: colors.uiBgGradientStart,
            color: "#FFFFFF",
            ...fonts.default,
            padding: 0,
            margin: 0,
            minHeight: "100vh"
          },
          ".auto-tracker-hide-video": {
            height: 0,
            overflow: "hidden"
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
        <div css={{ padding: "0px 5px" }}>Temtools</div>
        <div css={{ flex: 1, height: 1, backgroundColor: colors.uiBlue }}></div>
      </div>
      <HeaderBar
        style={{
          padding: "0 20px 10px 20px",
          "@media (min-width: 800px)": { padding: 0 }
        }}
      >
        <React.Fragment>
          <HideOnMobile>
            <>
              <NavItem url="/" exact>
                <TiHomeOutline />
              </NavItem>
              <NavItem url="/exchange">Temtem Exchange</NavItem>
              <NavItem
                url={jwt ? `${getUserProfileLink(jwt)}/tempedia` : "/tempedia"}
              >
                Personal Tempedia
              </NavItem>
              <NavItem url="/quest-tracker">Quest Tracker</NavItem>
              <NavItem url="/encounter-tracker/new">Encounter Tracker</NavItem>
              <NavItem url="/users">Users</NavItem>
            </>
          </HideOnMobile>
          <HideOnDesktop style={{ flex: 1 }}>
            <div onClick={() => setOverlay(true)}>
              <img height={40} src="/backpack-by-the-backjack.png" />
            </div>
          </HideOnDesktop>
          {overlay ? <OverlayMenu onClose={() => setOverlay(false)} /> : null}
          <AuthBlock />
        </React.Fragment>
      </HeaderBar>
      <div css={{ flex: 1 }}>
        <Component {...pageProps} />
      </div>
      <div
        css={{
          backgroundColor: colors.uiMid,
          padding: 5,
          textAlign: "center",
          marginTop: 10,
          fontSize: 14
        }}
      >
        Made by{" "}
        <a
          css={{
            color: colors.uiBlueFaded,
            textDecoration: "none",
            marginRight: 5,
            marginLeft: 2
          }}
          href="https://reddit.com/user/maael"
        >
          <FaReddit style={{ marginRight: 2, position: "relative", top: 3 }} />
          maael
        </a>
        <a
          css={{ color: colors.uiBlueFaded, textDecoration: "none" }}
          href="https://discordapp.com/"
        >
          <FaDiscord style={{ marginRight: 2, position: "relative", top: 3 }} />
          maael#2482
        </a>
        <div css={{ fontSize: 10 }}>
          Temtem Tools is not endorsed by Crema and does not reflect the views
          or opinions of Crema or anyone officially involved in producing or
          managing Temtem. Temtem and Crema are trademarks or registered
          trademarks of Crema.
        </div>
      </div>
    </div>
  );
}
