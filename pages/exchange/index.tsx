/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import TemtemStatsTable from "@maael/temtem-stats-table-component";
import ExchangeHeaderBar from "../../components/compositions/ExchangeHeaderBar";
import useFetch from "../../components/hooks/useFetch";
import TemtemText from "@maael/temtem-text-component";

export default function Trades() {
  const [listings] = useFetch("/db/exchange/listings/all", {
    defaultValue: [],
    source: "local"
  });
  return (
    <React.Fragment>
      <ExchangeHeaderBar />
      <div css={{ maxWidth: 1000, margin: "10px auto", textAlign: "center" }}>
        <TemtemText
          style={{ fontSize: 30 }}
          borderWidth={10}
        >{`${listings.length || "No"} Listings`}</TemtemText>
        <TemtemStatsTable
          temtem={{ name: "Ganki", stats: {}, types: ["Wind", "Electric"] }}
          svs={{}}
          trait="Botonophobia"
          gender="m"
          breedTechniques={[{ name: "Tesla Prison", type: "Electric" }]}
          fertility={5}
          isLuma={false}
        />
        <TemtemStatsTable
          temtem={{ name: "Pigepic", stats: {}, types: ["Wind"] }}
          svs={{}}
          trait="Botonophobia"
          gender="m"
          breedTechniques={[]}
          fertility={5}
          isLuma
        />
        <TemtemStatsTable
          temtem={{ name: "Loali", stats: {}, types: ["Wind"] }}
          svs={{}}
          trait="Botonophobia"
          gender="f"
          breedTechniques={[]}
          fertility={5}
          isLuma={false}
        />
      </div>
    </React.Fragment>
  );
}
