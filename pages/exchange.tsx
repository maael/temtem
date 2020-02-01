/** @jsx jsx */
import { jsx } from "@emotion/core";
import TemtemStatsTable from "@maael/temtem-stats-table-component";

export default function Trades() {
  return (
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
  );
}
