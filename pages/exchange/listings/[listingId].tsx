import React, { useState } from "react";
// import TemtemText from "@maael/temtem-text-component";
import TemtemButton from "@maael/temtem-button-component";
import TemtemStatsTable from "@maael/temtem-stats-table-component";
import ListingRequestDetails from "../../../components/compositions/ListingRequestDetails";
import ExchangeHeaderBar from "../../../components/compositions/ExchangeHeaderBar";
import ExchangeForm from "../../../components/compositions/ExchangeForm";
import useJWT from "../../../components/hooks/useJWT";
import useCallableFetch from "../../../components/hooks/useCallableFetch";
import { colors } from "@maael/temtem-theme";

export default function ListingPage({ listing }: any) {
  const jwt = useJWT();
  const [editing, setEditing] = useState(false);
  const { user, _id, ...remaining } = listing;
  const [stateListing, setStateListing] = useState(listing);
  const [removeListing, _, removeLoading] = useCallableFetch(
    `/db/exchange/listings/id/${listing ? listing._id : ""}`,
    {
      method: "DELETE",
      body: JSON.stringify(remaining)
    }
  );
  return (
    <>
      <ExchangeHeaderBar />
      {stateListing && stateListing.isActive ? (
        <div css={{ textAlign: "center" }}>
          <div css={{ maxWidth: 1000, margin: "0 auto" }}>
            <TemtemStatsTable
              key={stateListing._id}
              temtem={{
                name: stateListing.temtemName,
                stats: {},
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
                onClick={() => {
                  removeListing({});
                }}
              >
                Remove
              </TemtemButton>
            </div>
          ) : (
            <div>
              <TemtemButton>Save</TemtemButton>
            </div>
          )}
          {editing ? (
            <ExchangeForm
              existing={stateListing}
              onSave={res => {
                setEditing(false);
              }}
            />
          ) : null}
        </div>
      ) : (
        <div>Not found</div>
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
      }://${host}/api/db/exchange/listings/id/${query.listingId}`
    );
    if (res.ok) {
      const listing = await res.json();
      return {
        listing
      };
    }
    return {};
  } catch (e) {
    console.error("error", e);
    return {};
  }
};
