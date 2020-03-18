import React from "react";
import TemtemText from "@maael/temtem-text-component";
import ListingItem from "../../components/compositions/ListingItem";
import ExchangeHeaderBar from "../../components/compositions/ExchangeHeaderBar";
import useJWT from "../../components/hooks/useJWT";
import useSavedListing from "../../components/hooks/useSavedListing";

export default function ExchangeSaved() {
  const {
    saved,
    savedLoading,
    isListingSaved,
    refetchSaved,
    saveListing,
    unsaveListing
  } = useSavedListing();
  const jwt = useJWT();
  return (
    <React.Fragment>
      <ExchangeHeaderBar />
      <div css={{ textAlign: "center", marginTop: 10 }}>
        <TemtemText style={{ fontSize: 30 }} borderWidth={10}>
          {savedLoading
            ? "Loading..."
            : `You have ${saved.length || "no"} saved listings.`}
        </TemtemText>
        <div
          css={{
            maxWidth: 1000,
            margin: "0px auto",
            textAlign: "center",
            padding: "0px 30px"
          }}
        >
          {saved.map(s => (
            <ListingItem
              key={s._id}
              listing={s.exchangeListing}
              onSave={async () => {
                await saveListing({
                  body: JSON.stringify({
                    userId: jwt && jwt._id,
                    exchangeListingId: s.exchangeListing._id
                  })
                });
                await refetchSaved();
              }}
              onUnsave={async () => {
                await unsaveListing({}, s._id);
                await refetchSaved();
              }}
              isSaved={isListingSaved(s.exchangeListing)}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}
