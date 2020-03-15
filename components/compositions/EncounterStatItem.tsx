import TemtemPortrait from "@maael/temtem-portrait-component";
import TemtemText from "@maael/temtem-text-component";

export default function EncounterStatItem({
  temtemName,
  count
}: {
  temtemName: string;
  count: number;
}) {
  return (
    <div css={{ display: "inline-block", margin: "10px 20px" }}>
      <div
        css={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <TemtemPortrait
          style={{ display: "inline-block", marginTop: 5, marginRight: 10 }}
          temtem={temtemName}
          shape="hexagon"
          borderWidth={5}
          size={60}
        />
        <TemtemText
          borderWidth={10}
          style={{ fontSize: 20 }}
        >{`${count}`}</TemtemText>
      </div>
    </div>
  );
}
