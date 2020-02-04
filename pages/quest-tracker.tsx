/** @jsx jsx */
import { useState } from "react";
import { jsx } from "@emotion/core";
import { TemtemDynamicChip } from "@maael/temtem-svg-chip-components";
import TemtemText from "@maael/temtem-text-component";
import TemtemButton from "@maael/temtem-button-component";
import TemtemInput from "@maael/temtem-input-component";
import useFetch from "../components/hooks/useFetch";
import useCallableFetch from "../components/hooks/useCallableFetch";

export default function QuestTracker() {
  const [quests] = useFetch<
    { name: string; type: "side" | "main"; wikiUrl: string }[]
  >("/quests", {}, { source: "temtem-api", defaultValue: [] });
  const [userQuests] = useFetch<string[]>(
    "/db/quests",
    {},
    {
      source: "local",
      defaultValue: [],
      mapper: d => d.data.map(({ questName }) => questName)
    }
  );
  const [createUserQuest] = useCallableFetch("/db/quests", { method: "POST" });
  console.info(userQuests);
  const [search, setSearch] = useState("");
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
        Eventually you'll be able to track your quests here.
      </TemtemText>
      <TemtemText
        style={{ fontSize: 40, textAlign: "center" }}
        borderWidth={10}
      >
        {`${quests.length} quests`}
      </TemtemText>
      <TemtemInput
        containerStyle={{ maxWidth: 400, margin: "0 auto" }}
        placeholder="Search quests..."
        value={search}
        onChange={e => setSearch((e.target as any).value)}
      />
      <div css={{ maxWidth: 800, margin: "0 auto" }}>
        <TemtemText
          style={{ fontSize: 40, textAlign: "center" }}
          borderWidth={10}
        >
          Main Quests
        </TemtemText>
        {quests
          .filter(
            q =>
              q.type === "main" &&
              (search
                ? q.name.toLowerCase().includes(search.toLowerCase())
                : true)
          )
          .map((q, i) => (
            <div
              key={`${q.name}${i}`}
              css={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <a href={q.wikiUrl} style={{ textDecoration: "none" }}>
                <TemtemText
                  style={{ fontSize: 30, textAlign: "center" }}
                  borderWidth={10}
                >
                  {i === 0 ||
                  userQuests.includes(quests.map(({ name }) => name)[i - 1])
                    ? q.name
                    : "[Hidden Quest]"}
                </TemtemText>
              </a>
              <TemtemButton
                onClick={() => {
                  userQuests.push(q.name);
                  createUserQuest({
                    body: JSON.stringify({ questName: q.name })
                  });
                }}
                disabled={userQuests.includes(q.name)}
              >
                {userQuests.includes(q.name) ? "Done" : "Done?"}
              </TemtemButton>
            </div>
          ))}
        <TemtemText
          containerStyle={{ marginTop: 10 }}
          style={{ fontSize: 40, textAlign: "center" }}
          borderWidth={10}
        >
          Side Quests
        </TemtemText>
        {quests
          .filter(
            q =>
              q.type === "side" &&
              (search
                ? q.name.toLowerCase().includes(search.toLowerCase())
                : true)
          )
          .map((q, i) => (
            <div
              key={`${q.name}${i}`}
              css={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <a href={q.wikiUrl} style={{ textDecoration: "none" }}>
                <TemtemText
                  style={{ fontSize: 20, textAlign: "center" }}
                  borderWidth={10}
                >
                  {q.name}
                </TemtemText>
              </a>
              <TemtemButton
                onClick={() => {
                  userQuests.push(q.name);
                  createUserQuest({
                    body: JSON.stringify({ questName: q.name })
                  });
                }}
                size="small"
                disabled={userQuests.includes(q.name)}
              >
                {userQuests.includes(q.name) ? "Done" : "Done?"}
              </TemtemButton>
            </div>
          ))}
      </div>
    </div>
  );
}
