/** @jsxImportSource @emotion/react */
import React, { useState, useMemo } from "react";
import { jsx } from "@emotion/react";
import Fuse from "fuse.js";
import TemtemText from "@maael/temtem-text-component";
import TemtemInput from "@maael/temtem-input-component";
import ExchangeHeaderBar from "../../components/compositions/ExchangeHeaderBar";
import ListingItem from "../../components/compositions/ListingItem";
import useFetch from "../../components/hooks/useFetch";
import useSavedListing from "../../components/hooks/useSavedListing";
import useJWT from "../../components/hooks/useJWT";

export default function Trades() {
  const [listings, loadingListings] = useFetch(
    "/db/exchange/listings/all",
    {},
    {
      defaultValue: [],
      source: "local",
      mapper: d => d.data
    }
  );
  const {
    isListingSaved,
    refetchSaved,
    saveListing,
    unsaveListing
  } = useSavedListing();
  const jwt = useJWT();
  const [search, setSearch] = useState("");
  const fuse = useMemo(
    () =>
      new Fuse(listings, {
        shouldSort: true,
        threshold: 0.2,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        tokenize: true,
        keys: [
          "temtemName",
          "user.redditName",
          "user.discordName",
          "temtemTrait",
          "temtemGender",
          "temtemBredTechniques",
          "requestDetails"
        ]
      }),
    [listings]
  );
  const results = search ? fuse.search(search) : listings;
  return (
    <React.Fragment>
      <ExchangeHeaderBar />
      <div
        css={{
          maxWidth: 1000,
          margin: "10px auto",
          textAlign: "center",
          padding: "0px 30px"
        }}
      >
        <TemtemText>
          Find Temtem here, and DM their tamers on (Reddit, Discord, or Steam)
          to organise an exchange!
        </TemtemText>
        <TemtemText style={{ fontSize: 30 }} borderWidth={10}>
          {loadingListings
            ? "Loading..."
            : `${listings.length || "No"} Listings`}
        </TemtemText>
        <TemtemInput
          placeholder="Fuzzy Search..."
          value={search}
          onChange={e => setSearch((e.target as any).value)}
        />
        {results.map(l => (
          <ListingItem
            key={l._id}
            listing={l}
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
              const saved = isListingSaved(l);
              if (saved) {
                await unsaveListing({}, saved._id);
                await refetchSaved();
              }
            }}
            isSaved={isListingSaved(l)}
          />
        ))}
      </div>
    </React.Fragment>
  );
}
