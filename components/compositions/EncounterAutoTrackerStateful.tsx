import { EventEmitter } from "events";
import { useEffect, useState } from "react";
import leven from "leven";
import isAfter from "date-fns/isAfter";
import add from "date-fns/add";
import TemtemText from "@maael/temtem-text-component";
import TemtemButton from "@maael/temtem-button-component";
import useFetch from "../hooks/useFetch";
import useJWT from "../hooks/useJWT";
import useCallableFetch from "../hooks/useCallableFetch";
import EncounterItem from "./EncounterItem";

export default ({ emitter }: { emitter: EventEmitter }) => {
  const [matchData, setMatchData] = useState({
    defBb1: "",
    defBb2: ""
  });
  const [encounters, setEncounters] = useState<any[]>([]);
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
        levenData.defBb1[0].leven <
          Math.ceil(levenData.defBb1[0].name.length / 2)
      ) {
        update.defBb1 = levenData.defBb1[0].name;
      } else if (
        levenData.defBb1.length > 0 &&
        update.defBb1 !== levenData.defBb1[0].name &&
        (levenData.defBb1[0].leven > 9 || data.defBb1 === "")
      ) {
        update.defBb1 = "";
      }

      if (
        levenData.defBb2.length > 0 &&
        update.defBb2 !== levenData.defBb2[0].name &&
        levenData.defBb2[0].leven <
          Math.ceil(levenData.defBb2[0].name.length / 2)
      ) {
        update.defBb2 = levenData.defBb2[0].name;
      } else if (
        levenData.defBb2.length > 0 &&
        update.defBb2 !== levenData.defBb2[0].name &&
        (levenData.defBb2[0].leven > 9 || data.defBb2 === "")
      ) {
        update.defBb2 = "";
      }
      if (
        update.defBb1 !== matchData.defBb1 ||
        update.defBb2 !== matchData.defBb2
      ) {
        const lastUpdateTime = new Date().toISOString();
        setMatchData({
          defBb1: update.defBb1,
          defBb2: update.defBb2
        });
        if (
          encounters.length < 1 ||
          encounters[encounters.length - 1].finished
        ) {
          setEncounters(e =>
            e.concat({
              temtem: [update.defBb1, update.defBb2].filter(Boolean),
              startTime: new Date().toISOString(),
              lastUpdateTime,
              finished: false
            })
          );
        } else {
          setEncounters(e => {
            e[e.length - 1].lastUpdateTime = lastUpdateTime;
            return e;
          });
        }
      }
      if (
        encounters.length > 0 &&
        !encounters[encounters.length - 1].finished &&
        isFinishedEncounter(update, encounters)
      ) {
        setEncounters(e => {
          e[e.length - 1].finished = true;
          return e;
        });
      }
    });
    return () => {
      emitter.removeAllListeners();
    };
  }, [temtemNames, matchData, encounters]);
  const jwt = useJWT();
  const [createEncounter] = useCallableFetch("/db/encounters", {
    method: "POST"
  });
  return (
    <div css={{ maxWidth: 500, margin: "0px auto", textAlign: "center" }}>
      <TemtemText style={{ fontSize: 20 }}>{`Current: ${matchData.defBb1 ||
        "Unknown"}, ${matchData.defBb2 || "Unknown"}`}</TemtemText>
      <TemtemText>{`Encounters: ${encounters.length}`}</TemtemText>
      {encounters.length > 0 && jwt && jwt._id ? (
        <TemtemButton
          onClick={async () => {
            await Promise.all(
              encounters
                .reduce(
                  (acc, { temtem, startTime }) => [
                    ...acc,
                    ...temtem.map(t => ({
                      temtemName: t,
                      createdAt: startTime
                    }))
                  ],
                  []
                )
                .map(t =>
                  createEncounter({
                    body: JSON.stringify({
                      userId: jwt && jwt._id,
                      temtemName: t.temtemName,
                      location: null,
                      trait: null,
                      isLuma: false,
                      wasCaught: false,
                      createdAt: t.createdAt
                    })
                  })
                )
            );
            setEncounters([]);
          }}
        >
          Save
        </TemtemButton>
      ) : null}
      <div>
        {encounters
          .reduce(
            (acc, { temtem, startTime }) => [
              ...acc,
              ...temtem.map(t => ({ temtemName: t, createdAt: startTime }))
            ],
            []
          )
          .sort(
            (a, b) =>
              Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
          )
          .map((t, i) => (
            <EncounterItem key={`${i}-${t.temtemName}`} {...t} />
          ))}
      </div>
    </div>
  );
};

function isFinishedEncounter(
  update: { defBb1: string; defBb2: string },
  encounters: { lastUpdateTime: string }[]
) {
  const lastEncounter = encounters.slice(-1)[0];
  if (
    lastEncounter &&
    isAfter(
      new Date(),
      add(new Date(lastEncounter.lastUpdateTime), { seconds: 30 })
    )
  ) {
    return update.defBb1 === "" && update.defBb2 === "";
  } else {
    return false;
  }
}
