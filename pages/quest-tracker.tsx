/** @jsx jsx */
import { useState } from "react";
import { jsx } from "@emotion/core";
import { TemtemDynamicChip } from "@maael/temtem-svg-chip-components";
import TemtemText from "@maael/temtem-text-component";
import TemtemButton from "@maael/temtem-button-component";
import TemtemInput from "@maael/temtem-input-component";
import RequireAuth from "../components/primitives/RequireAuth";
import useFetch from "../components/hooks/useFetch";
import useCallableFetch from "../components/hooks/useCallableFetch";

export default function QuestTracker() {
  const [quests] = useFetch<
    { name: string; type: "side" | "main"; wikiUrl: string }[]
  >("/quests", {}, { source: "temtem-api", defaultValue: [] });
  const [userQuests, loadingUserQuests] = useFetch<
    {
      questName: string;
      questStep: number;
      questStarted: boolean;
      questFinished: boolean;
    }[]
  >(
    "/db/quests",
    {},
    {
      source: "local",
      defaultValue: [],
      mapper: d =>
        d.data.map(({ questName, questStep, questStarted, questFinished }) => ({
          questName,
          questStep: questStep || 0,
          questStarted: !!questStarted,
          questFinished: !!questFinished
        }))
    }
  );
  const [createUserQuest] = useCallableFetch("/db/quests", { method: "POST" });
  const [search, setSearch] = useState("");
  const filteredMain = quests.filter(
    q =>
      q.type === "main" &&
      (search ? q.name.toLowerCase().includes(search.toLowerCase()) : true)
  );
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
        {loadingUserQuests ? "Loading..." : `${quests.length} quests`}
      </TemtemText>
      <TemtemInput
        containerStyle={{ maxWidth: 400, margin: "0 auto" }}
        placeholder="Search quests..."
        value={search}
        onChange={e => setSearch((e.target as any).value)}
      />
      <div css={{ maxWidth: 800, margin: "0 auto" }}>
        <TemtemText
          style={{ fontSize: 40, textAlign: "left" }}
          borderWidth={10}
        >
          Main Quests
        </TemtemText>
        {filteredMain.map((q, i) => (
          <MainQuestItem
            key={`${q.name}${i}`}
            quest={q}
            quests={quests}
            userQuests={userQuests}
            createUserQuest={createUserQuest}
          />
        ))}
        <TemtemText
          containerStyle={{ marginTop: 10 }}
          style={{ fontSize: 40, textAlign: "left" }}
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
            <SideQuestItem
              key={`${q.name}${i}`}
              quest={q}
              userQuests={userQuests}
              createUserQuest={createUserQuest}
            />
          ))}
      </div>
    </div>
  );
}

function MainQuestItem({
  quest: q,
  userQuests,
  createUserQuest,
  quests
}: {
  quest: any;
  quests: any[];
  userQuests: any[];
  createUserQuest: (d: any) => void;
}) {
  const userQuestsNames = userQuests.map(({ questName }) => questName);
  const userIsOn = userQuestsNames.includes(
    quests.map(({ name }) => name)[
      quests.findIndex(({ name }) => name === q.name) - 1
    ]
  );
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "10px 0px"
      }}
    >
      <div style={{ flex: 1 }}>
        <a
          href={q.wikiUrl}
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center"
          }}
        >
          <TemtemText
            style={{ fontSize: 30, textAlign: "left" }}
            borderWidth={10}
          >
            {quests.findIndex(({ name }) => name === q.name) === 0 || userIsOn
              ? q.name
              : "[Hidden Quest]"}
          </TemtemText>
          <TemtemText
            containerStyle={{ marginLeft: 12 }}
            style={{ fontSize: 16, textAlign: "left" }}
            borderWidth={10}
          >
            {`(${q.steps.length || "?"} step${
              q.steps.length === 1 ? "" : "s"
            })`}
          </TemtemText>
        </a>
        <TemtemText
          style={{ fontSize: 20, textAlign: "left" }}
          borderWidth={10}
        >
          {userIsOn ? q.steps[0] || "???" : "[Hidden Step]"}
        </TemtemText>
      </div>
      <RequireAuth>
        <TemtemButton
          onClick={() => {
            createUserQuest({
              body: JSON.stringify({ questName: q.name })
            });
          }}
          disabled={userQuestsNames.includes(q.name)}
        >
          {userQuestsNames.includes(q.name) ? "Finish Step" : "Start"}
        </TemtemButton>
      </RequireAuth>
    </div>
  );
}

function SideQuestItem({
  quest: q,
  userQuests,
  createUserQuest
}: {
  quest: any;
  userQuests: any[];
  createUserQuest: (d: any) => void;
}) {
  const userQuestsNames = userQuests.map(({ questName }) => questName);
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 10
      }}
    >
      <div style={{ flex: 1 }}>
        <a
          href={q.wikiUrl}
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center"
          }}
        >
          <TemtemText
            style={{ fontSize: 20, textAlign: "left" }}
            borderWidth={10}
          >
            {q.name}
          </TemtemText>
          <TemtemText
            containerStyle={{ marginLeft: 12 }}
            style={{ fontSize: 16, textAlign: "left" }}
            borderWidth={10}
          >
            {`(${q.steps.length || "?"} step${
              q.steps.length === 1 ? "" : "s"
            })`}
          </TemtemText>
        </a>
        <TemtemText
          style={{ fontSize: 20, textAlign: "left" }}
          borderWidth={10}
        >
          {q.steps[0] || "???"}
        </TemtemText>
      </div>
      <RequireAuth>
        <TemtemButton
          onClick={() => {
            createUserQuest({
              body: JSON.stringify({ questName: q.name })
            });
          }}
          size="small"
          disabled={userQuestsNames.includes(q.name)}
        >
          {userQuestsNames.includes(q.name) ? "Finish Step" : "Start"}
        </TemtemButton>
      </RequireAuth>
    </div>
  );
}
