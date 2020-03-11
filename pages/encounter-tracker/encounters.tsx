/** @jsx jsx */
import { jsx } from "@emotion/core";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import EncounterTrackerHeaderBar from "../../components/compositions/EncounterTrackerHeaderBar";
import EncounterItem from "../../components/compositions/EncounterItem";
import Loading from "../../components/primitives/Loading";
import useFetch from "../../components/hooks/useFetch";
import { useMemo } from "react";

export default function EncounterPage({ user }) {
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
        .map(e => <EncounterItem key={e._id} {...e} />),
    [encounters]
  );
  return (
    <>
      <EncounterTrackerHeaderBar />
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
