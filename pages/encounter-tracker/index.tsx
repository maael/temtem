/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import React from "react";
import cookie from "cookie";
import { decode } from "jsonwebtoken";
import Link from "next/link";
import TemtemButton from "@maael/temtem-button-component";
import { TemtemDynamicChip } from "@maael/temtem-svg-chip-components";
import TemtemText from "@maael/temtem-text-component";
import EncounterTrackerHeaderBar from "../../components/compositions/EncounterTrackerHeaderBar";
import EncounterItem from "../../components/compositions/EncounterItem";
import NewEncounter from "../../components/compositions/NewEncounter";
import Loading from "../../components/primitives/Loading";
import useFetch from "../../components/hooks/useFetch";
import useJWT from "../../components/hooks/useJWT";
import { useMemo, useState } from "react";

export default function EncounterPage({ user }: { user: any }) {
  const [showingNew, setShowingNew] = useState(false);
  const jwt = useJWT();
  const [selected, setSelected] = useState();
  const [encounters, loadingEncounters, _errors, refetchEncounters] = useFetch(
    `/db/encounters/user/${user ? user._id : ""}`,
    {},
    { source: "local", defaultValue: [], mapper: ({ data }) => data }
  );
  const encounterComponents = useMemo(
    () =>
      encounters
        .sort(
          (a, b) =>
            Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
        )
        .map(e =>
          selected === e._id ? (
            <div key={e._id}>
              <NewEncounter
                existing={e}
                onSave={async () => {
                  setSelected(undefined);
                  await refetchEncounters();
                }}
                onDelete={async () => {
                  setSelected(undefined);
                  await refetchEncounters();
                }}
              />
            </div>
          ) : (
            <div key={e._id} onClick={() => setSelected(e._id)}>
              <EncounterItem {...e} />
            </div>
          )
        ),
    [encounters, selected]
  );
  return jwt && jwt._id ? (
    <>
      <EncounterTrackerHeaderBar />
      <div css={{ textAlign: "center" }}>
        {showingNew ? (
          <>
            <NewEncounter
              onSave={() => {
                window.location.reload();
              }}
            />
            <TemtemButton onClick={() => setShowingNew(false)}>
              Hide
            </TemtemButton>
          </>
        ) : (
          <TemtemButton
            onClick={() => setShowingNew(true)}
            style={{ marginTop: 10 }}
          >
            New Encounter
          </TemtemButton>
        )}
      </div>
      <Loading loading={loadingEncounters} />
      <div css={{ maxWidth: 500, margin: "0px auto" }}>
        {encounterComponents}
      </div>
    </>
  ) : (
    <>
      <EncounterTrackerHeaderBar />
      <div css={{ textAlign: "center", marginTop: 10 }}>
        <Link href="/encounter-tracker">
          <TemtemDynamicChip
            style={{
              textAlign: "center",
              padding: "10px 30px",
              fontSize: 30
            }}
            textProps={{ borderWidth: 10 }}
          >
            {`Encounter Tracker`}
          </TemtemDynamicChip>
        </Link>
        <TemtemText
          containerStyle={{ marginBottom: 30 }}
          style={{ fontSize: 26 }}
          borderWidth={10}
        >
          Track your temtem encounters here, and any Lumas you find.
        </TemtemText>
      </div>
    </>
  );
}

EncounterPage.getInitialProps = async ({ req }) => {
  try {
    const cookieString = req ? req.headers.cookie : document.cookie;
    const parsed = cookie.parse(cookieString)["temtem-jwt"];
    const decoded = decode(parsed, { json: true });
    return { user: decoded };
  } catch (e) {
    return { user: {} };
  }
};
