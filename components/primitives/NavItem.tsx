/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import Link from "next/link";
import { jsx } from "@emotion/react";
import React from "react";
import { colors } from "@maael/temtem-theme";

export default function NavItem({
  url,
  children,
  exact = false,
  style
}: {
  url: string;
  children: string | JSX.Element;
  exact?: boolean;
  style?: React.CSSProperties;
}) {
  const [pathname, setPathname] = useState("");
  useEffect(() => {
    setPathname(window.location.pathname);
  });
  return (
    <Link
      href={url}
      css={
        {
          borderBottom: `2px solid ${
            (exact
            ? pathname === url
            : pathname.startsWith(url))
              ? colors.uiBlue
              : colors.uiBlueFaded
          }`,
          margin: "0 5px",
          padding: "0px 2px",
          cursor: "pointer",
          "&:hover": {
            borderColor: colors.uiBlue
          },
          textAlign: "center",
          color: "white",
          textDecoration: "none",
          ...style
        } as any
      }
    >
      {children}
    </Link>
  );
}
