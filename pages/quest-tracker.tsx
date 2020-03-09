/** @jsx jsx */
import { useState } from "react";
import { jsx } from "@emotion/core";
import { IoIosLink } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import TemtemText from "@maael/temtem-text-component";
import TemtemButton from "@maael/temtem-button-component";
import TemtemInput from "@maael/temtem-input-component";
import RequireAuth from "../components/primitives/RequireAuth";
import useFetch from "../components/hooks/useFetch";
import useCallableFetch from "../components/hooks/useCallableFetch";
import { TrackedQuest } from "../types/db";

export default function QuestTracker() {
  const [quests] = useFetch<
    { name: string; type: "side" | "main"; wikiUrl: string }[]
  >("/quests", {}, { source: "temtem-api", defaultValue: [] });
  const [userQuests, loadingUserQuests, _, refetchUserQuests] = useFetch<
    Array<TrackedQuest>
  >(
    "/db/quests",
    {},
    {
      source: "local",
      defaultValue: [],
      mapper: d =>
        d.data.map(({ questStep, questStarted, questFinished, ...q }) => ({
          ...q,
          questStep: questStep || 0,
          questStarted: !!questStarted,
          questFinished: !!questFinished
        }))
    }
  );
  const [createUserQuest] = useCallableFetch("/db/quests", { method: "POST" });
  const [updateUserQuest] = useCallableFetch(
    "/db/quests",
    { method: "PUT" },
    {
      source: "local",
      generateSuffixFromBody: (b = "") => {
        return `/${typeof b === "string" ? JSON.parse(b)._id : ""}`;
      }
    }
  );
  const [search, setSearch] = useState("");
  const filteredMain = quests.filter(
    q =>
      q.type === "main" &&
      (search ? q.name.toLowerCase().includes(search.toLowerCase()) : true)
  );
  return (
    <div style={{ margin: "10px auto", textAlign: "center" }}>
      <TemtemInput
        containerStyle={{ maxWidth: 400, margin: "0 auto" }}
        placeholder={
          loadingUserQuests ? "Loading..." : `Search ${quests.length} quests...`
        }
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
            updateUserQuest={updateUserQuest}
            refetchUserQuests={refetchUserQuests}
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
              updateUserQuest={updateUserQuest}
              refetchUserQuests={refetchUserQuests}
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
  updateUserQuest,
  quests,
  refetchUserQuests
}: {
  quest: any;
  quests: any[];
  userQuests: any[];
  createUserQuest: (d: any) => Promise<unknown>;
  updateUserQuest: (d: any) => Promise<unknown>;
  refetchUserQuests: () => Promise<void>;
}) {
  const userQuestsNames = userQuests.map(({ questName }) => questName);
  const userIsOnQuest = userQuestsNames.includes(
    quests.map(({ name }) => name)[
      quests.findIndex(({ name }) => name === q.name) - 1
    ]
  );
  const isFirstMainQuest =
    quests.findIndex(({ name }) => name === q.name) === 0;
  const userQuest = userQuests.find(
    ({ questName }) => questName === q.name
  ) || { questStep: 0 };
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 25
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
          <IoIosLink style={{ marginRight: 10, color: "#FFFFFF" }} size={14} />
          <TemtemText
            style={{ fontSize: 30, textAlign: "left" }}
            borderWidth={10}
          >
            {isFirstMainQuest ||
            (userIsOnQuest &&
              (userQuest.questStarted || userQuest.questStep > 0))
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
        {(isFirstMainQuest && !userQuest.questFinished) ||
        (!userQuest.questFinished && userQuestsNames.includes(q.name)) ? (
          <TemtemText
            containerStyle={{ marginLeft: 24 }}
            style={{ fontSize: 20, textAlign: "left" }}
            borderWidth={10}
          >
            {isFirstMainQuest || userIsOnQuest
              ? `Step ${Number(userQuest.questStep) + 1}. ${q.steps[
                  userQuest.questStep
                ] || "???"}`
              : "[Hidden Step]"}
          </TemtemText>
        ) : null}
      </div>
      {isFirstMainQuest || userIsOnQuest ? (
        <RequireAuth>
          {userQuest.questStarted &&
          !userQuest.questFinished &&
          userQuest.questStep > 0 ? (
            <TemtemButton
              onClick={async () => {
                if (userQuestsNames.includes(q.name)) {
                  const newStep = (userQuest.questStep || 0) - 1;
                  await updateUserQuest({
                    body: JSON.stringify({
                      ...userQuest,
                      questStep: newStep,
                      questFinished: false
                    })
                  });
                }
                await refetchUserQuests();
              }}
              size="small"
              style={{ marginRight: 5 }}
            >
              Undo
            </TemtemButton>
          ) : null}
          <TemtemButton
            onClick={async () => {
              if (userQuestsNames.includes(q.name)) {
                const newStep = Number(userQuest.questStep || 0) + 1;
                await updateUserQuest({
                  body: JSON.stringify({
                    ...userQuest,
                    questStep: newStep,
                    questFinished: newStep >= q.steps.length
                  })
                });
              } else {
                await createUserQuest({
                  body: JSON.stringify({ questName: q.name })
                });
              }
              await refetchUserQuests();
            }}
            disabled={
              userQuestsNames.includes(q.name) && userQuest.questFinished
            }
          >
            {userQuestsNames.includes(q.name)
              ? userQuest.questFinished
                ? "Finished"
                : userQuest.questStep >= q.steps.length - 1
                ? "Finish quest"
                : "Complete Step"
              : "Start"}
          </TemtemButton>
        </RequireAuth>
      ) : null}
    </div>
  );
}

function SideQuestItem({
  quest: q,
  userQuests,
  createUserQuest,
  updateUserQuest,
  refetchUserQuests
}: {
  quest: any;
  userQuests: any[];
  createUserQuest: (d: any) => Promise<unknown>;
  updateUserQuest: (d: any) => Promise<unknown>;
  refetchUserQuests: () => Promise<void>;
}) {
  const userQuestsNames = userQuests.map(({ questName }) => questName);
  const userQuest = userQuests.find(
    ({ questName }) => questName === q.name
  ) || { questStep: 0 };
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 25
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
          <IoIosLink style={{ marginRight: 10, color: "#FFFFFF" }} size={14} />
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
        {!userQuest.questFinished && userQuestsNames.includes(q.name) ? (
          <TemtemText
            containerStyle={{ marginLeft: 24 }}
            style={{ fontSize: 20, textAlign: "left" }}
            borderWidth={10}
          >
            {`Step ${Number(userQuest.questStep) + 1}. ${q.steps[
              userQuest.questStep
            ] || "???"}`}
          </TemtemText>
        ) : !userQuest.questFinished ? (
          <div
            style={{
              marginLeft: 24,
              display: "flex",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <MdLocationOn size={20} />
            <TemtemText
              containerStyle={{ marginLeft: 8 }}
              style={{ fontSize: 20, textAlign: "left" }}
              borderWidth={10}
            >
              {`${q.startingNPC}${
                q.startingNPC && q.startingLocation ? " in " : ""
              }${q.startingLocation.replace("Narwhal", "The Narwhal")}`}
            </TemtemText>
          </div>
        ) : null}
      </div>
      <RequireAuth>
        {userQuest.questStarted &&
        !userQuest.questFinished &&
        userQuest.questStep > 0 ? (
          <TemtemButton
            onClick={async () => {
              if (userQuestsNames.includes(q.name)) {
                const newStep = (userQuest.questStep || 0) - 1;
                await updateUserQuest({
                  body: JSON.stringify({
                    ...userQuest,
                    questStep: newStep,
                    questFinished: false
                  })
                });
              }
              await refetchUserQuests();
            }}
            size="small"
            style={{ marginRight: 5 }}
          >
            Undo
          </TemtemButton>
        ) : null}
        <TemtemButton
          onClick={async () => {
            if (userQuestsNames.includes(q.name)) {
              const newStep = Number(userQuest.questStep || 0) + 1;
              await updateUserQuest({
                body: JSON.stringify({
                  ...userQuest,
                  questStep: newStep,
                  questFinished: newStep >= q.steps.length
                })
              });
            } else {
              await createUserQuest({
                body: JSON.stringify({ questName: q.name })
              });
            }
            await refetchUserQuests();
          }}
          size="small"
          disabled={userQuestsNames.includes(q.name) && userQuest.questFinished}
        >
          {userQuestsNames.includes(q.name)
            ? userQuest.questFinished
              ? "Finished"
              : userQuest.questStep >= q.steps.length - 1
              ? "Finish quest"
              : "Complete Step"
            : "Start"}
        </TemtemButton>
      </RequireAuth>
    </div>
  );
}
