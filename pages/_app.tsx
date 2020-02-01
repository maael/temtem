/** @jsx jsx */
import React from "react";
import Head from "next/head";
import { Global, jsx } from "@emotion/core";
import { colors, fonts } from "@maael/temtem-theme";
import NavItem from "../components/NavItem";
import HeaderBar from "../components/HeaderBar";

export default function TemtemApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
        <meta httpEquiv="content-language" content="en-gb" />
        <meta name="theme-color" content={colors.uiBgGradientStart} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Temtem Tools</title>
      </Head>
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
      <HeaderBar>
        <React.Fragment>
          <NavItem url="/">Home</NavItem>
          <NavItem url="/exchange">Temtem Exchange</NavItem>
          <NavItem url="/tempedia">Personal Tempedia</NavItem>
          <NavItem url="/quest-tracker">Quest Tracker</NavItem>
          <NavItem url="/battle-tools">Battle Tools</NavItem>
        </React.Fragment>
      </HeaderBar>
      <Component {...pageProps} />
    </div>
  );
}
