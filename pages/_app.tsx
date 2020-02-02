/** @jsx jsx */
import React from "react";
import Head from "next/head";
import { Global, jsx } from "@emotion/core";
import { colors, fonts } from "@maael/temtem-theme";
import NavItem from "../components/primitives/NavItem";
import HeaderBar from "../components/primitives/HeaderBar";
import AuthBlock from "../components/primitives/AuthBlock";

export default function TemtemApp({ Component, pageProps }) {
  return (
    <div css={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Head>
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
        <meta httpEquiv="content-language" content="en-gb" />
        <meta name="theme-color" content={colors.uiBgGradientStart} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Temtem Tools</title>
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
      <HeaderBar>
        <React.Fragment>
          <NavItem url="/" exact>
            Home
          </NavItem>
          <NavItem url="/exchange">Temtem Exchange</NavItem>
          <NavItem url="/tempedia">Personal Tempedia</NavItem>
          <NavItem url="/quest-tracker">Quest Tracker</NavItem>
          <NavItem url="/battle-tools">Battle Tools</NavItem>
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
          css={{ color: colors.uiBlueFaded, textDecoration: "none" }}
          href="https://reddit.com/user/maael"
        >
          u/maael
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
