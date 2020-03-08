import React from "react";
import TemtemText from "@maael/temtem-text-component";
import { TemtemDynamicChip } from "@maael/temtem-svg-chip-components";
import ListingRequestDetails from "../../components/compositions/ListingRequestDetails";
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
        <TemtemDynamicChip
          style={{ textAlign: "center", padding: 20, fontSize: 30 }}
          textProps={{ borderWidth: 10 }}
        >
          Work in progress
        </TemtemDynamicChip>
        <TemtemText
          style={{ fontSize: 40, textAlign: "center" }}
          borderWidth={10}
        >
          Eventually you'll be able to see saved listings here.
        </TemtemText>
        <TemtemText style={{ fontSize: 30 }} borderWidth={10}>
          {loadingSaved
            ? "Loading..."
            : `You have ${saved.length || "no"} saved listings.`}
        </TemtemText>
        {saved.map(s => (
          <ListingRequestDetails
            key={s._id}
            user={s.user}
            cost={s.requestCost}
            details={s.requestDetails}
          />
        ))}
      </div>
    </React.Fragment>
  );
}
