/** @jsx jsx */
import { jsx } from "@emotion/core";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import TemtemButton from "@maael/temtem-button-component";
import EncounterTrackerHeaderBar from "../../components/compositions/EncounterTrackerHeaderBar";
import EncounterItem from "../../components/compositions/EncounterItem";
import NewEncounter from "../../components/compositions/NewEncounter";
import Loading from "../../components/primitives/Loading";
import useFetch from "../../components/hooks/useFetch";
import { useMemo, useState } from "react";

export default function EncounterPage({ user }) {
  const [showingNew, setShowingNew] = useState(false);
  const [selected, setSelected] = useState();
  const [encounters, loadingEncounters] = useFetch(
    `/db/encounters/user/${user._id}`,
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
              <NewEncounter existing={e} />
            </div>
          ) : (
            <div key={e._id} onClick={() => setSelected(e._id)}>
              <EncounterItem {...e} />
            </div>
          )
        ),
    [encounters, selected]
  );
  return (
    <>
      <EncounterTrackerHeaderBar />
      <div css={{ textAlign: "center" }}>
        {showingNew ? (
          <>
            <NewEncounter />
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
  );
}

EncounterPage.getInitialProps = async ({ req }) => {
  try {
    const cookieString = req ? req.headers.cookie : document.cookie;
    const parsed = cookie.parse(cookieString)["temtem-jwt"];
    const decoded = jwt.decode(parsed, { json: true });
    return { user: decoded };
  } catch (e) {
    return { user: {} };
  }
};
