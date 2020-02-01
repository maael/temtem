/** @jsx jsx */
import { jsx } from "@emotion/core";
import { TemtemLabelChip } from "@maael/temtem-svg-chip-components";
import TemtemText from "@maael/temtem-text-component";

export default function Home() {
  return (
    <div css={{ margin: "10px auto", width: 900, textAlign: "center" }}>
      <TemtemLabelChip label="Temtem Exchange" width={900} />
      <TemtemText
        containerStyle={{ marginBottom: 20 }}
        style={{ fontSize: 36 }}
        borderWidth={10}
      >
        Advertise and search for Temtem you want to trade here.
      </TemtemText>
      <TemtemLabelChip label="Personal Tempedia" width={900} />
      <TemtemText
        containerStyle={{ marginBottom: 20 }}
        style={{ fontSize: 36 }}
        borderWidth={10}
      >
        Track the Temtem you've tamed here, and what ones you need to hunt.
      </TemtemText>
      <TemtemLabelChip label="Quest Tracker" width={900} />
      <TemtemText
        containerStyle={{ marginBottom: 20 }}
        style={{ fontSize: 36 }}
        borderWidth={10}
      >
        Track your quests here.
      </TemtemText>
      <TemtemLabelChip label="Battle Tools" width={900} />
      <TemtemText
        containerStyle={{ marginBottom: 20 }}
        style={{ fontSize: 36 }}
        borderWidth={10}
      >
        General battle tools here.
      </TemtemText>
    </div>
  );
}
