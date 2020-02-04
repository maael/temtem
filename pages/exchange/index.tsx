/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import TemtemStatsTable from "@maael/temtem-stats-table-component";
import ExchangeHeaderBar from "../../components/compositions/ExchangeHeaderBar";
import useFetch from "../../components/hooks/useFetch";
import TemtemText from "@maael/temtem-text-component";

export default function Trades() {
  const [listings] = useFetch(
    "/db/exchange/listings/all",
    {},
    {
      defaultValue: [],
      source: "local",
      mapper: d => d.data
    }
  );
  return (
    <React.Fragment>
      <ExchangeHeaderBar />
      <div css={{ maxWidth: 1000, margin: "10px auto", textAlign: "center" }}>
        <TemtemText
          style={{ fontSize: 30 }}
          borderWidth={10}
        >{`${listings.length || "No"} Listings`}</TemtemText>
        {listings.map(l => (
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
    </React.Fragment>
  );
}
