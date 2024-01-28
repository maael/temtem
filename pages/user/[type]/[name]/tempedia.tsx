import React from "react";
import Link from "next/link";
import fetch from "isomorphic-fetch";
import TemtemText from "@maael/temtem-text-component";
import { colors } from "@maael/temtem-theme";
import SafeImage from "../../../../components/primitives/SafeImage";
import Tempedia from "../../../tempedia";
import {
  getUserProfileLink,
  getUserIcon,
  getUserName
} from "../../../../util/user";

export default function UserTempedia({ user = {} }: any) {
  return (
    <>
      <div css={{ textAlign: "center", marginTop: 10 }}>
        <Link
          href={getUserProfileLink(user)}
          style={{ textDecoration: "none" }}
        >
          <SafeImage
            css={{
              border: `2px solid ${colors.uiBlueFaded}`,
              height: 50,
              width: 50,
              borderRadius: "50%",
              margin: "0px 5px"
            }}
            src={getUserIcon(user)}
          />
          <TemtemText style={{ fontSize: 40 }} borderWidth={10}>
            {`${getUserName(user)}'s Tempedia`}
          </TemtemText>
        </Link>
      </div>
      <Tempedia userId={user._id} />
    </>
  );
}

UserTempedia.getInitialProps = async ({ req, query }) => {
  try {
    const host = req ? req.headers.host : window.location.host;
    const res = await fetch(
      `${host.includes("localhost") ? "http" : "https"}://${host}/api/db/user/${
        query.type
      }/${query.name}`,
      { headers: req ? req.headers : {} }
    );
    if (res.ok) {
      const user = await res.json();
      return {
        user
      };
    }
    console.warn("failed to get user");
    return {};
  } catch (e) {
    console.error("error", e);
    return {};
  }
};
