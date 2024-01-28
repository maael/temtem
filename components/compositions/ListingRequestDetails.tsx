import React from "react";
import Link from "next/link";
import TemtemText from "@maael/temtem-text-component";
import { colors } from "@maael/temtem-theme";
import * as userUtils from "../../util/user";

export default function ListingRequestDetails({ user, cost, details }: any) {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        padding: 5,
        marginBottom: 10
      }}
    >
      <div
        css={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <Link
          href="/user/[type]/[name]"
          as={userUtils.getUserProfileLink(user)}
          css={{
            textDecoration: "none",
            cursor: "pointer",
            display: "flex",
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
            src={userUtils.getUserIcon(user)}
          />
          <TemtemText containerStyle={{ marginRight: 5 }}>
            {userUtils.getUserName(user)}
          </TemtemText>
        </Link>
      </div>
      <TemtemText containerStyle={{ marginRight: 5 }}>
        {`${cost} Pansuns`}
      </TemtemText>
      {details ? (
        <TemtemText containerStyle={{ marginRight: 5, maxWidth: 200 }}>
          {`Details: ${details}`}
        </TemtemText>
      ) : null}
    </div>
  );
}
