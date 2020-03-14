import { EventEmitter } from "events";
import { useEffect, useState } from "react";
import leven from "leven";
import useFetch from "../hooks/useFetch";

export default ({ emitter }: { emitter: EventEmitter }) => {
  const [matchData, setMatchData] = useState({
    defBb1: "",
    defBb2: ""
  });
  const [temtemNames] = useFetch<string[]>(
    "/temtems",
    {},
    {
      source: "temtem-api",
      defaultValue: [],
      mapper: data => data.map(({ name }) => name)
    }
  );
  useEffect(() => {
    emitter.on("data", data => {
      const levenData = temtemNames.reduce<{
        [k: string]: { name: string; leven: number }[];
      }>(
        (acc, n) => {
          return {
            defBb1: acc.defBb1.concat({
              name: n,
              leven: leven(n, data.defBb1)
            }),
            defBb2: acc.defBb2.concat({
              name: n,
              leven: leven(n, data.defBb2)
            })
          };
        },
        { defBb1: [], defBb2: [] }
      );
      levenData.defBb1 = levenData.defBb1.sort(
        ({ leven: l1 }, { leven: l2 }) => l1 - l2
      );
      levenData.defBb2 = levenData.defBb2.sort(
        ({ leven: l1 }, { leven: l2 }) => l1 - l2
      );
      const update = { defBb1: matchData.defBb1, defBb2: matchData.defBb2 };
      if (
        levenData.defBb1.length > 0 &&
        update.defBb1 !== levenData.defBb1[0].name &&
        levenData.defBb1[0].leven < 10
      ) {
        update.defBb1 = levenData.defBb1[0].name;
      }

      if (
        levenData.defBb2.length > 0 &&
        update.defBb2 !== levenData.defBb2[0].name &&
        levenData.defBb2[0].leven < 10
      ) {
        update.defBb2 = levenData.defBb2[0].name;
      }

      if (
        update.defBb1 !== matchData.defBb1 ||
        update.defBb2 !== matchData.defBb2
      ) {
        setMatchData({
          defBb1: update.defBb1,
          defBb2: update.defBb2
        });
      }
    });
    return () => {
      emitter.removeAllListeners();
    };
  }, [temtemNames, matchData]);
  return (
    <div>
      <div>Defending #1: {matchData.defBb1 || "Unknown"}</div>
      <div>Defending #2: {matchData.defBb2 || "Unknown"}</div>
    </div>
  );
};
