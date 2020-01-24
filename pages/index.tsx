import React, { useEffect, useState } from "react";
import TemtemWeaknessTable from "@maael/temtem-weakness-table-component";
import TemtemCalculator from "@maael/temtem-calculator-component";

export default function Home() {
  const [types, setTypes] = useState<string[]>([]);
  const [weaknessTable, setWeaknessTable] = useState({});
  useEffect(() => {
    (async () => {
      const res = await fetch("https://temtem-api.mael.tech/api/types");
      if (res.ok) {
        setTypes((await res.json()).map(({ name }) => name));
      }
    })();
  });
  useEffect(() => {
    (async () => {
      const res = await fetch("https://temtem-api.mael.tech/api/weaknesses");
      if (res.ok) {
        setWeaknessTable(await res.json());
      }
    })();
  });
  return (
    <div>
      <div>Temtem App</div>
      <TemtemWeaknessTable
        weaknessData={weaknessTable}
        renderHeading={t => (
          <img
            width={50}
            src={`https://temtem-api.mael.tech/images/icons/types/${t}.png`}
          />
        )}
      />
      <TemtemCalculator weaknessData={weaknessTable} types={types} />
    </div>
  );
}
