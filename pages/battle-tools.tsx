/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { jsx } from "@emotion/react";
import React from "react";
import { TemtemDynamicChip } from "@maael/temtem-svg-chip-components";
import TemtemText from "@maael/temtem-text-component";
import TemtemCalculator from "@maael/temtem-calculator-component";
import TemtemWeaknessTable from "@maael/temtem-weakness-table-component";

export default function BattleTools() {
  const [types, setTypes] = useState<string[]>([]);
  const [weaknessTable, setWeaknessTable] = useState({});
  useEffect(() => {
    (async () => {
      const res = await fetch("https://temtem-api.mael.tech/api/types");
      if (res.ok) {
        setTypes((await res.json()).map(({ name }) => name));
      }
    })().catch(e => console.error(e));
  });
  useEffect(() => {
    (async () => {
      const res = await fetch("https://temtem-api.mael.tech/api/weaknesses");
      if (res.ok) {
        setWeaknessTable(await res.json());
      }
    })().catch(e => console.error(e));
  });
  return (
    <div style={{ margin: "10px auto", textAlign: "center" }}>
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
        Eventually tools for battle will go here.
      </TemtemText>
      <TemtemCalculator weaknessData={weaknessTable} types={types} />
      <TemtemWeaknessTable
        weaknessData={weaknessTable}
        renderHeading={t => (
          <img
            width={50}
            src={`https://temtem-api.mael.tech/images/icons/types/${t}.png`}
          />
        )}
      />
    </div>
  );
}
