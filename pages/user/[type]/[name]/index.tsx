import fetch from "isomorphic-fetch";
import Link from "next/link";
import { FaDiscord, FaRedditAlien } from "react-icons/fa";
import TemtemText from "@maael/temtem-text-component";
import TemtemPortrait from "@maael/temtem-portrait-component";
import TemtemButton from "@maael/temtem-button-component";
import { colors } from "@maael/temtem-theme";
import useFetch from "../../../../components/hooks/useFetch";
import useSavedListing from "../../../../components/hooks/useSavedListing";
import useJWT from "../../../../components/hooks/useJWT";
import SafeImage from "../../../../components/primitives/SafeImage";
import ListingItem from "../../../../components/compositions/ListingItem";
import SteamProfile from "../../../../components/compositions/SteamProfile";
import EditUserDetails from "../../../../components/compositions/EditUserDetails";
import {
  getUserName,
  getUserProfileLink,
  getUserIcon
} from "../../../../util/user";
import { User } from "../../../../types/db";

export default function UserPage({ user = {} as any }: { user: User }) {
  const jwt = useJWT();
  const {
    isListingSaved,
    refetchSaved,
    saveListing,
    unsaveListing
  } = useSavedListing();
  const [listingsResult] = useFetch<any>(
    `/db/exchange/listings/user/${user._id}`,
    {},
    {
      defaultValue: { data: [] },
      source: "local"
    },
    [user._id]
  );
  const [tempediaResult] = useFetch<{ data: any[] }>(
    `/db/tempedia/user/${user._id}`,
    {},
    {
      defaultValue: { data: [] },
      source: "local"
    },
    [user._id]
  );
  const mostRecentlyTamed =
    tempediaResult.data.length &&
    tempediaResult.data.sort(
      (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
    )[0].temtemName;
  return (
    <div css={{ textAlign: "center", marginTop: 10 }}>
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
        {getUserName(user)}
      </TemtemText>
      {user.redditName ? (
        <a href={`https://reddit.com/user/${user.redditName}`}>
          <TemtemButton
            size="small"
            style={{
              margin: "0px 5px 10px",
              position: "relative",
              paddingLeft: 30
            }}
            bgColor="#FF5700"
          >
            <>
              <FaRedditAlien
                style={{ fontSize: 18, position: "absolute", left: 8, top: 9 }}
              />
              {user.redditName}
            </>
          </TemtemButton>
        </a>
      ) : null}
      {user.discordFullName ? (
        <a href={"https://discordapp.com/"}>
          <TemtemButton
            size="small"
            style={{
              margin: "0px 5px 10px",
              position: "relative",
              paddingLeft: 30
            }}
            bgColor="#7289DA"
          >
            <>
              <FaDiscord
                style={{ fontSize: 18, position: "absolute", left: 8, top: 9 }}
              />
              {user.discordFullName}
            </>
          </TemtemButton>
        </a>
      ) : null}
      {user.temtemName ? (
        <a href={"https://store.steampowered.com/app/745920/Temtem/"}>
          <TemtemButton
            size="small"
            style={{
              margin: "0px 5px 10px",
              position: "relative"
            }}
            bgColor={colors.uiBlue}
          >
            <>"{user.temtemName}" in game</>
          </TemtemButton>
        </a>
      ) : null}
      <Link
        as={`${getUserProfileLink(user)}/tempedia`}
        href={"/user/[type]/[name]/tempedia"}
        style={{ textDecoration: "none" }}
      >
        <TemtemButton
          size="small"
          style={{ margin: "0px 5px 10px" }}
          bgColor={colors.uiBlueFaded}
        >
          User Tempedia
        </TemtemButton>
      </Link>
      <SteamProfile steamId={user.steamId} />
      {jwt && jwt._id === user._id ? <EditUserDetails user={user} /> : null}
      <TemtemText style={{ fontSize: 20 }} borderWidth={10}>
        {`${listingsResult.data.length} Total Listings`}
      </TemtemText>
      <TemtemText style={{ fontSize: 20 }} borderWidth={10}>
        {`${
          listingsResult.data.filter(i => i.isActive).length
        } Active Listings`}
      </TemtemText>
      <TemtemText style={{ fontSize: 20 }} borderWidth={10}>
        {`${tempediaResult.data.length} Tamed Temtem`}
      </TemtemText>
      {tempediaResult.data.length ? (
        <div>
          <TemtemPortrait
            style={{ margin: "0 auto" }}
            shape="hexagon"
            temtem={mostRecentlyTamed}
          />
          <TemtemText style={{ fontSize: 20 }} borderWidth={10}>
            {`Most recently tamed a ${mostRecentlyTamed}`}
          </TemtemText>
        </div>
      ) : null}
      {listingsResult.data.length ? (
        <TemtemText
          containerStyle={{ marginTop: 40, marginBottom: -20 }}
          style={{ fontSize: 40 }}
          borderWidth={10}
        >
          Listings
        </TemtemText>
      ) : null}
      <div css={{ maxWidth: 1000, margin: "0 auto", padding: "0px 30px" }}>
        {listingsResult.data
          .filter(i => i.isActive)
          .map(l => (
            <ListingItem
              key={l._id}
              listing={l}
              isSaved={isListingSaved(l)}
              onSave={async () => {
                await saveListing({
                  body: JSON.stringify({
                    userId: jwt && jwt._id,
                    exchangeListingId: l._id
                  })
                });
                await refetchSaved();
              }}
              onUnsave={async () => {
                await unsaveListing({}, l._id);
                await refetchSaved();
              }}
            />
          ))}
      </div>
    </div>
  );
}

UserPage.getInitialProps = async ({ req, query }) => {
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
