import React, { useState } from "react";
import TemtemText from "@maael/temtem-text-component";
import TemtemButton from "@maael/temtem-button-component";
import { colors } from "@maael/temtem-theme";
import ListingItem from "../../../components/compositions/ListingItem";
import ExchangeForm from "../../../components/compositions/ExchangeForm";
import ExchangeHeaderBar from "../../../components/compositions/ExchangeHeaderBar";
import useFetch from "../../../components/hooks/useFetch";
import useJWT from "../../../components/hooks/useJWT";
import useSavedListing from "../../../components/hooks/useSavedListing";

export default function UserExchangeListings() {
  const [showingForm, setShowingForm] = useState(false);
  const jwt = useJWT();
  const [ads, loadingAds] = useFetch(
    "/db/exchange/listings",
    {},
    {
      defaultValue: [],
      source: "local",
      mapper: d => d.data.filter(i => i.isActive)
    }
  );
  const {
    isListingSaved,
    refetchSaved,
    saveListing,
    unsaveListing
  } = useSavedListing();
  return (
    <div css={{ textAlign: "center" }}>
      <ExchangeHeaderBar />
      <TemtemButton
        style={{ margin: 10 }}
        type={"" as any}
        bgColor={colors.uiBlueFaded}
        onClick={() => setShowingForm(s => !s)}
      >
        {showingForm ? "Close Listing Form" : "New Listing"}
      </TemtemButton>
      {showingForm ? (
        <ExchangeForm onSave={() => setShowingForm(false)} />
      ) : null}

      <TemtemText style={{ fontSize: 30 }} borderWidth={10}>
        {loadingAds
          ? "Loading..."
          : `You have ${ads.length || "no"} active listings.`}
      </TemtemText>
      <div css={{ maxWidth: 1000, margin: "0 auto", padding: "0px 30px" }}>
        {ads.map(l => (
          <ListingItem
            listing={l}
            isSaved={isListingSaved(l)}
            onUnsave={async () => {
              const saved = isListingSaved(l);
              if (saved) {
                await unsaveListing({}, saved._id);
                await refetchSaved();
              }
              await refetchSaved();
            }}
            onSave={async () => {
              await saveListing({
                body: JSON.stringify({
                  userId: jwt && jwt._id,
                  exchangeListingId: l._id
                })
              });
              await refetchSaved();
            }}
          />
        ))}
      </div>
    </div>
  );
}
