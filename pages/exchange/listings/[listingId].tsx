import React, { useState } from "react";
import fetch from "isomorphic-fetch";
import TemtemText from "@maael/temtem-text-component";
import TemtemButton from "@maael/temtem-button-component";
import ListingItem from "../../../components/compositions/ListingItem";
import ExchangeHeaderBar from "../../../components/compositions/ExchangeHeaderBar";
import ExchangeForm from "../../../components/compositions/ExchangeForm";
import useJWT from "../../../components/hooks/useJWT";
import useCallableFetch from "../../../components/hooks/useCallableFetch";
import useSavedListing from "../../../components/hooks/useSavedListing";
import { colors } from "@maael/temtem-theme";

export default function ListingPage({ listing }: any) {
  const jwt = useJWT();
  const {
    saved,
    isListingSaved,
    refetchSaved,
    saveListing,
    unsaveListing
  } = useSavedListing();
  const [editing, setEditing] = useState(false);
  const { user, _id, ...remaining } = listing || {};
  const [stateListing] = useState(listing);
  const [removeListing, _, removeLoading] = useCallableFetch(
    `/db/exchange/listings/id/${listing ? listing._id : ""}`,
    {
      method: "DELETE",
      body: JSON.stringify(remaining)
    }
  );
  const savedListing = isListingSaved(stateListing);
  return (
    <>
      <ExchangeHeaderBar />
      {stateListing && stateListing.isActive ? (
        <div css={{ textAlign: "center" }}>
          <div
            css={{
              maxWidth: 1000,
              margin: "0 auto",
              position: "relative",
              padding: "0px 30px"
            }}
          >
            <ListingItem
              key={stateListing._id}
              listing={stateListing}
              isSaved={saved.some(
                s => s.exchangeListing._id === stateListing._id
              )}
              onUnsave={async () => {
                await unsaveListing(
                  {},
                  `${savedListing ? savedListing._id : savedListing}`
                );
                await refetchSaved();
              }}
              onSave={async () => {
                await saveListing({
                  body: JSON.stringify({
                    userId: jwt && jwt._id,
                    exchangeListingId: listing && listing._id
                  })
                });
                await refetchSaved();
              }}
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
