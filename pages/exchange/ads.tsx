import React, { useState } from "react";
import TemtemText from "@maael/temtem-text-component";
import TemtemButton from "@maael/temtem-button-component";
import { colors } from "@maael/temtem-theme";
import ExchangeForm from "../../components/compositions/ExchangeForm";
import ExchangeHeaderBar from "../../components/compositions/ExchangeHeaderBar";

export default function ExchangeAds() {
  const [showingForm, setShowingForm] = useState(false);
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
      {showingForm ? <ExchangeForm /> : null}
      <TemtemText style={{ fontSize: 30 }} borderWidth={10}>
        You have no listings.
      </TemtemText>
    </div>
  );
}
