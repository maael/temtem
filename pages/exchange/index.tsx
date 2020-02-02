/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import TemtemStatsTable from "@maael/temtem-stats-table-component";
import HeaderBar from "../../components/primitives/HeaderBar";
import NavItem from "../../components/primitives/NavItem";

export default function Trades() {
  return (
    <React.Fragment>
      <HeaderBar>
        <React.Fragment>
          <NavItem url="/exchange" exact>
            Home
          </NavItem>
          <NavItem url="/exchange/ads">My Ads</NavItem>
          <NavItem url="/exchange/saved">Saved</NavItem>
        </React.Fragment>
      </HeaderBar>
      <div css={{ maxWidth: 1000, margin: "0 auto" }}>
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
