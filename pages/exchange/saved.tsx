import React from "react";
import TemtemText from "@maael/temtem-text-component";
import ExchangeHeaderBar from "../../components/compositions/ExchangeHeaderBar";

export default function ExchangeSaved() {
  return (
    <React.Fragment>
      <ExchangeHeaderBar />
      <div css={{ textAlign: "center", marginTop: 10 }}>
        <TemtemText style={{ fontSize: 30 }} borderWidth={10}>
          You have no saved listings.
        </TemtemText>
      </div>
    </React.Fragment>
  );
}
