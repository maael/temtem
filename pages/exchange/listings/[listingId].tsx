import React, { useState } from "react";
import fetch from "isomorphic-fetch";
import TemtemText from "@maael/temtem-text-component";
import TemtemButton from "@maael/temtem-button-component";
import { FaRegStar, FaStar } from "react-icons/fa";
import TemtemStatsTable from "../../../components/compositions/StatsTable";
import ListingRequestDetails from "../../../components/compositions/ListingRequestDetails";
import ExchangeHeaderBar from "../../../components/compositions/ExchangeHeaderBar";
import ExchangeForm from "../../../components/compositions/ExchangeForm";
import useJWT from "../../../components/hooks/useJWT";
import useFetch from "../../../components/hooks/useFetch";
import useCallableFetch from "../../../components/hooks/useCallableFetch";
import { colors } from "@maael/temtem-theme";

export default function ListingPage({ listing }: any) {
  const jwt = useJWT();
  const [editing, setEditing] = useState(false);
  const { user, _id, ...remaining } = listing || {};
  const [stateListing] = useState(listing);
  const [saved, _savedLoading, _savedError, refetchSaved] = useFetch(
    "/db/exchange/saved",
    {},
    {
      mapper: res => (res && res.data ? res.data : []),
      source: "local",
      defaultValue: []
    }
  );
  const [removeListing, _, removeLoading] = useCallableFetch(
    `/db/exchange/listings/id/${listing ? listing._id : ""}`,
    {
      method: "DELETE",
      body: JSON.stringify(remaining)
    }
  );
  const [saveListing] = useCallableFetch(`/db/exchange/saved`, {
    method: "POST",
    body: JSON.stringify({
      userId: jwt && jwt._id,
      exchangeListingId: listing && listing._id
    })
  });
  const savedListing = saved.find(
    s => s.exchangeListing._id === stateListing._id
  );
  const [unsaveListing] = useCallableFetch(
    `/db/exchange/saved`,
    {
      method: "DELETE"
    },
    {
      source: "local",
      suffix: `/${savedListing ? savedListing._id : savedListing}`
    }
  );
  return (
    <>
      <ExchangeHeaderBar />
      {stateListing && stateListing.isActive ? (
        <div css={{ textAlign: "center" }}>
          <div css={{ maxWidth: 1000, margin: "0 auto", position: "relative" }}>
            <TemtemStatsTable
              key={stateListing._id}
              temtem={{
                name: stateListing.temtemName,
                types: []
              }}
              svs={{
                hp: stateListing.svHp,
                sta: stateListing.svSta,
                spd: stateListing.svSpd,
                atk: stateListing.svAtk,
                def: stateListing.svDef,
                spatk: stateListing.svSpatk,
                spdef: stateListing.svSpdef
              }}
              trait={stateListing.temtemTrait}
              gender={stateListing.temtemGender}
              breedTechniques={stateListing.temtemBredTechniques.map(n => ({
                name: n,
                type: "Toxic"
              }))}
              fertility={stateListing.temtemFertility}
              isLuma={stateListing.temtemIsLuma}
            />
            <ListingRequestDetails
              user={stateListing.user}
              cost={stateListing.requestCost}
              details={stateListing.requestDetails}
            />
            {jwt && stateListing.user._id === jwt._id ? null : saved.some(
                s => s.exchangeListing._id === stateListing._id
              ) ? (
              <FaStar
                size={40}
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  top: -20,
                  right: -20
                }}
                onClick={async () => {
                  await unsaveListing();
                  await refetchSaved();
                }}
              />
            ) : (
              <FaRegStar
                size={40}
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  top: -20,
                  right: -20
                }}
                onClick={async () => {
                  await saveListing();
                  await refetchSaved();
                }}
              />
            )}
          </div>
          {jwt && stateListing.user._id === jwt._id ? (
            <div>
              <TemtemButton
                style={{ margin: 5 }}
                onClick={() => setEditing(e => !e)}
              >
                {editing ? "Cancel" : "Edit"}
              </TemtemButton>
              <TemtemButton
                disabled={removeLoading}
                style={{ margin: 5 }}
                bgColor={colors.typeFire}
                onClick={async () => {
                  await removeListing({});
                }}
              >
                Remove
              </TemtemButton>
            </div>
          ) : null}
          {editing ? (
            <ExchangeForm
              existing={stateListing}
              onSave={() => {
                window.setTimeout(() => {
                  setEditing(false);
                  window.location.reload();
                }, 100);
              }}
            />
          ) : null}
        </div>
      ) : (
        <div css={{ textAlign: "center" }}>
          <TemtemText
            containerStyle={{ marginTop: 10, fontSize: 40 }}
            borderWidth={10}
          >
            Not found
          </TemtemText>
        </div>
      )}
    </>
  );
}

ListingPage.getInitialProps = async ({ req, query }) => {
  try {
    const host = req ? req.headers.host : window.location.host;
    const res = await fetch(
      `${
        host.includes("localhost") ? "http" : "https"
      }://${host}/api/db/exchange/listings/id/${query.listingId}`,
      { headers: req.headers }
    );
    if (res.ok) {
      const listing = await res.json();
      return {
        listing
      };
    }
    console.warn("failed to get listing");
    return {};
  } catch (e) {
    console.error("error", e);
    return {};
  }
};
