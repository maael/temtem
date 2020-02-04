/** @jsx jsx */
import { jsx } from "@emotion/core";
import { TemtemDynamicChip } from "@maael/temtem-svg-chip-components";
import TemtemText from "@maael/temtem-text-component";
import useFetch from "../components/hooks/useFetch";

export default function QuestTracker() {
  const [quests] = useFetch<
    { name: string; type: "side" | "main"; wikiUrl: string }[]
  >("/quests", {}, { source: "temtem-api", defaultValue: [] });
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
      {quests
        .filter(q => q.type === "main")
        .map(q => (
          <a href={q.wikiUrl} style={{ textDecoration: "none" }}>
            <TemtemText
              key={q.name}
              style={{ fontSize: 30, textAlign: "center" }}
              borderWidth={10}
            >
              {q.name}
            </TemtemText>
          </a>
        ))}
      {quests
        .filter(q => q.type === "side")
        .map(q => (
          <a href={q.wikiUrl} style={{ textDecoration: "none" }}>
            <TemtemText
              key={q.name}
              style={{ fontSize: 20, textAlign: "center" }}
              borderWidth={10}
            >
              {q.name}
            </TemtemText>
          </a>
        ))}
    </div>
  );
}
