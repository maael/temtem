import fetch from "isomorphic-fetch";
import Link from "next/link";
import TemtemText from "@maael/temtem-text-component";
import TemtemPortrait from "@maael/temtem-portrait-component";
import TemtemButton from "@maael/temtem-button-component";
import { colors } from "@maael/temtem-theme";
import useFetch from "../../../../components/hooks/useFetch";
import TemtemStatsTable from "../../../../components/compositions/StatsTable";
import ListingRequestDetails from "../../../../components/compositions/ListingRequestDetails";
import { getUserName, getUserProfileLink } from "../../../../util/user";

export default function UserPage({ user = {} }: any) {
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
      <img
        css={{
          border: `2px solid ${colors.uiBlueFaded}`,
          height: 50,
          width: 50,
          borderRadius: "50%",
          margin: "0px 5px"
        }}
        src={user.redditIcon || user.discordIcon}
      />
      <TemtemText style={{ fontSize: 40 }} borderWidth={10}>
        {getUserName(user)}
      </TemtemText>
      {user.redditName ? (
        <a href={`https://reddit.com/user/${user.redditName}`}>
          <TemtemButton
            size="small"
            style={{ marginBottom: 10 }}
            bgColor="#FF5700"
          >
            Open on Reddit
          </TemtemButton>
        </a>
      ) : null}
      <Link
        as={`${getUserProfileLink(user)}/tempedia`}
        href={"/user/[type]/[name]/tempedia"}
      >
        <a style={{ textDecoration: "none" }}>
          <TemtemButton
            size="small"
            style={{ marginBottom: 10 }}
            bgColor={colors.uiBlueFaded}
          >
            User Tempedia
          </TemtemButton>
        </a>
      </Link>
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
      <div css={{ maxWidth: 1000, margin: "0 auto" }}>
        {listingsResult.data
          .filter(i => i.isActive)
          .map(l => (
            <Link href={`/exchange/listings/${l._id}`} key={l._id}>
              <a style={{ textDecoration: "none" }}>
                <TemtemStatsTable
                  temtem={{
                    name: l.temtemName,
                    types: []
                  }}
                  svs={{
                    hp: l.svHp,
                    sta: l.svSta,
                    spd: l.svSpd,
                    atk: l.svAtk,
                    def: l.svDef,
                    spatk: l.svSpatk,
                    spdef: l.svSpdef
                  }}
                  trait={l.temtemTrait}
                  gender={l.temtemGender}
                  breedTechniques={l.temtemBredTechniques.map(n => ({
                    name: n,
                    type: "Toxic"
                  }))}
                  fertility={l.temtemFertility}
                  isLuma={l.temtemIsLuma}
                />
                <ListingRequestDetails
                  user={l.user}
                  cost={l.requestCost}
                  details={l.requestDetails}
                />
              </a>
            </Link>
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
