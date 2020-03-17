import React from "react";
import TemtemText from "@maael/temtem-text-component";
import ListingItem from "../../components/compositions/ListingItem";
import ExchangeHeaderBar from "../../components/compositions/ExchangeHeaderBar";
import useFetch from "../../components/hooks/useFetch";

export default function ExchangeSaved() {
  const [saved, loadingSaved] = useFetch(
    "/db/exchange/saved",
    {},
    {
      mapper: res => (res.data ? res.data : []),
      defaultValue: [],
      source: "local"
    }
  );
  return (
    <React.Fragment>
      <ExchangeHeaderBar />
      <div css={{ textAlign: "center", marginTop: 10 }}>
        <TemtemText style={{ fontSize: 30 }} borderWidth={10}>
          {loadingSaved
            ? "Loading..."
            : `You have ${saved.length || "no"} saved listings.`}
        </TemtemText>
        <div css={{ maxWidth: 1000, margin: "0px auto", textAlign: "center" }}>
          {saved.map(s => (
            <ListingItem
              key={s._id}
              listing={s.exchangeListing}
              onSave={() => console.info("save")}
              onUnsave={() => console.info("unsave")}
              isSaved={false}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}
