import React from "react";
import TemtemText from "@maael/temtem-text-component";
import ExchangeHeaderBar from "../../components/compositions/ExchangeHeaderBar";
import useFetch from "../../components/hooks/useFetch";

export default function ExchangeSaved() {
  const [saved] = useFetch("/db/exchange/saved", {
    defaultValue: [],
    source: "local"
  });
  return (
    <React.Fragment>
      <ExchangeHeaderBar />
      <div css={{ textAlign: "center", marginTop: 10 }}>
        <TemtemText style={{ fontSize: 30 }} borderWidth={10}>
          {`You have ${saved.length || "no"} saved listings.`}
        </TemtemText>
      </div>
    </React.Fragment>
  );
}
