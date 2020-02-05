import React, { useState } from "react";
import TemtemText from "@maael/temtem-text-component";
import TemtemButton from "@maael/temtem-button-component";
import TemtemStatsTable from "@maael/temtem-stats-table-component";
import ListingRequestDetails from "../../../components/compositions/ListingRequestDetails";
import ExchangeHeaderBar from "../../../components/compositions/ExchangeHeaderBar";
import ExchangeForm from "../../../components/compositions/ExchangeForm";
import useJWT from "../../../components/hooks/useJWT";
import { colors } from "@maael/temtem-theme";

export default function ListingPage({ listing }: any) {
  const jwt = useJWT();
  const [editing, setEditing] = useState(false);
  return (
    <>
      <ExchangeHeaderBar />
      {listing ? (
        <div css={{ textAlign: "center" }}>
          <div css={{ maxWidth: 1000, margin: "0 auto" }}>
            <TemtemStatsTable
              key={listing._id}
              temtem={{
                name: listing.temtemName,
                stats: {},
                types: []
              }}
              svs={{
                hp: listing.svHp,
                sta: listing.svSta,
                spd: listing.svSpd,
                atk: listing.svAtk,
                def: listing.svDef,
                spatk: listing.svSpatk,
                spdef: listing.svSpdef
              }}
              trait={listing.temtemTrait}
              gender={listing.temtemGender}
              breedTechniques={listing.temtemBredTechniques.map(n => ({
                name: n,
                type: "Toxic"
              }))}
              fertility={listing.temtemFertility}
              isLuma={listing.temtemIsLuma}
            />
            <ListingRequestDetails
              user={listing.user}
              cost={listing.requestCost}
              details={listing.requestDetails}
            />
          </div>
          {jwt && listing.user._id === jwt._id ? (
            <div>
              <TemtemButton
                style={{ margin: 5 }}
                onClick={() => setEditing(e => !e)}
              >
                {editing ? "Cancel" : "Edit"}
              </TemtemButton>
              <TemtemButton style={{ margin: 5 }} bgColor={colors.typeFire}>
                Remove
              </TemtemButton>
            </div>
          ) : (
            <div>
              <TemtemButton>Save</TemtemButton>
            </div>
          )}
          {editing ? <ExchangeForm /> : null}
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
    console.info(
      "trying",
      `${
        host.includes("localhost") ? "http" : "https"
      }://${host}/api/db/exchange/listings/id/${query.listingId}`
    );
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
