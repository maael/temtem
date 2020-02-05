import React from "react";
import Link from "next/link";
import TemtemText from "@maael/temtem-text-component";
import { colors } from "@maael/temtem-theme";

export default function ListingRequestDetails({ user, cost, details }: any) {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        padding: 5
      }}
    >
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
          src={user.redditIcon}
        />
        <Link href="/user/[name]" as={`/user/${user.redditName}`}>
          <a css={{ textDecoration: "none", cursor: "pointer" }}>
            <TemtemText containerStyle={{ marginRight: 5 }}>
              {user.redditName}
            </TemtemText>
          </a>
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
