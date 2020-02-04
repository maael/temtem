import React, { useState } from "react";
import TemtemText from "@maael/temtem-text-component";
import TemtemButton from "@maael/temtem-button-component";
import TemtemStatsTable from "@maael/temtem-stats-table-component";
import { colors } from "@maael/temtem-theme";
import ExchangeForm from "../../components/compositions/ExchangeForm";
import ExchangeHeaderBar from "../../components/compositions/ExchangeHeaderBar";
import useFetch from "../../components/hooks/useFetch";

export default function UserExchangeListings() {
  const [showingForm, setShowingForm] = useState(false);
  const [ads] = useFetch(
    "/db/exchange/listings",
    {},
    {
      defaultValue: [],
      source: "local",
      mapper: d => d.data
    }
  );
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
        {`You have ${ads.length || "no"} listings.`}
      </TemtemText>
      {ads.map(l => (
        <TemtemStatsTable
          key={l._id}
          temtem={{
            name: l.temtem.name,
            stats: {},
            types: ["Wind", "Electric"]
          }}
          svs={l.temtem.svs}
          trait={l.temtem.trait}
          gender={l.temtem.gender}
          breedTechniques={l.temtem.bredTechniques.map(n => ({
            name: n,
            type: "Toxic"
          }))}
          fertility={l.temtem.fertility}
          isLuma={false}
        />
      ))}
    </div>
  );
}
