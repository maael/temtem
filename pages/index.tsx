/** @jsx jsx */
import { jsx } from "@emotion/core";
import { TemtemDynamicChip } from "@maael/temtem-svg-chip-components";
import TemtemText from "@maael/temtem-text-component";
import { colors } from "@maael/temtem-theme";

export default function Home() {
  return (
    <div css={{ margin: "10px auto", textAlign: "center" }}>
      <TemtemDynamicChip
        style={{ textAlign: "center", padding: "20px 40px", fontSize: 30 }}
        textProps={{ borderWidth: 10 }}
        chipColor={colors.uiYellow}
      >
        {`tem.tools`}
      </TemtemDynamicChip>
      <TemtemText
        containerStyle={{ marginBottom: 20 }}
        style={{ fontSize: 36 }}
        borderWidth={10}
      >
        A collection of different tools to augment Temtem.
      </TemtemText>
      <TemtemDynamicChip
        style={{ textAlign: "center", padding: "20px 40px", fontSize: 30 }}
        textProps={{ borderWidth: 10 }}
      >
        {`Temtem Exchange`}
      </TemtemDynamicChip>
      <TemtemText
        containerStyle={{ marginBottom: 20 }}
        style={{ fontSize: 36 }}
        borderWidth={10}
      >
        Advertise and search for Temtem you want to trade here.
      </TemtemText>
      <TemtemDynamicChip
        style={{ textAlign: "center", padding: "20px 40px", fontSize: 30 }}
        textProps={{ borderWidth: 10 }}
      >
        {`Personal Tempedia`}
      </TemtemDynamicChip>
      <TemtemText
        containerStyle={{ marginBottom: 20 }}
        style={{ fontSize: 36 }}
        borderWidth={10}
      >
        Track the Temtem you've tamed here, and what ones you need to hunt.
      </TemtemText>
      <TemtemDynamicChip
        style={{ textAlign: "center", padding: "20px 40px", fontSize: 30 }}
        textProps={{ borderWidth: 10 }}
      >
        {`Quest Tracker`}
      </TemtemDynamicChip>
      <TemtemText
        containerStyle={{ marginBottom: 20 }}
        style={{ fontSize: 36 }}
        borderWidth={10}
      >
        Track your quests here.
      </TemtemText>
      {/* <TemtemDynamicChip
        style={{ textAlign: "center", padding: "20px 40px", fontSize: 30 }}
        textProps={{ borderWidth: 10 }}
      >
        {`Battle Tools`}
      </TemtemDynamicChip>
      <TemtemText
        containerStyle={{ marginBottom: 20 }}
        style={{ fontSize: 36 }}
        borderWidth={10}
      >
        General battle tools here.
      </TemtemText> */}
    </div>
  );
}
