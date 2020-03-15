import cookie from "cookie";
import jwt from "jsonwebtoken";
import { TemtemDynamicChip } from "@maael/temtem-svg-chip-components";
import { colors } from "@maael/temtem-theme";
import Loading from "../../components/primitives/Loading";
import EncounterTrackerHeaderBar from "../../components/compositions/EncounterTrackerHeaderBar";
import EncounterStatItem from "../../components/compositions/EncounterStatItem";
import useFetch from "../../components/hooks/useFetch";

export default function EncounterStatsPage({ user }) {
  const [encounters, loadingEncounters] = useFetch<Record<string, number>>(
    `/db/encounters/user/${user._id}`,
    {},
    {
      source: "local",
      defaultValue: {},
      mapper: ({ data }) =>
        data.reduce(
          (acc, { temtemName }) => ({
            ...acc,
            [temtemName]: Number(acc[temtemName] || 0) + 1
          }),
          {}
        )
    }
  );
  return (
    <>
      <EncounterTrackerHeaderBar />
      <div css={{ textAlign: "center", marginTop: 20 }}>
        <TemtemDynamicChip
          style={{ textAlign: "center", padding: "20px 35px", fontSize: 28 }}
          textProps={{ borderWidth: 10 }}
          chipColor={colors.uiBlue}
        >
          {"Number of Encounters by Temtem"}
        </TemtemDynamicChip>
      </div>
      <Loading loading={loadingEncounters} />
      <div css={{ textAlign: "center", maxWidth: 1000, margin: "0px auto" }}>
        {Object.entries(encounters).map(([temtemName, count]) => (
          <EncounterStatItem
            key={temtemName}
            temtemName={temtemName}
            count={count}
          />
        ))}
      </div>
    </>
  );
}

EncounterStatsPage.getInitialProps = async ({ req }) => {
  try {
    const cookieString = req ? req.headers.cookie : document.cookie;
    const parsed = cookie.parse(cookieString)["temtem-jwt"];
    const decoded = jwt.decode(parsed, { json: true });
    return { user: decoded };
  } catch (e) {
    return { user: {} };
  }
};
