/** @jsx jsx */
import { jsx } from "@emotion/core";
import Link from "next/link";
import { TemtemDynamicChip } from "@maael/temtem-svg-chip-components";
import TemtemText from "@maael/temtem-text-component";
import { colors } from "@maael/temtem-theme";

export default function Home() {
  return (
    <div
      css={{
        margin: "0px auto",
        textAlign: "center",
        padding: 10,
        maxWidth: 1000
      }}
    >
      <TemtemDynamicChip
        style={{ textAlign: "center", padding: "10px 30px", fontSize: 30 }}
        textProps={{ borderWidth: 10 }}
        chipColor={colors.uiYellow}
      >
        {`tem.tools`}
      </TemtemDynamicChip>
      <TemtemText
        containerStyle={{ marginBottom: 30 }}
        style={{ fontSize: 26 }}
        borderWidth={10}
      >
        <>
          A collection of different tools to augment Temtem. Guaranteed to have
          the latest data on Temtem, techniques, and traits, updated every 4
          hours.
        </>
      </TemtemText>
      <Link href="/exchange">
        <a>
          <TemtemDynamicChip
            style={{ textAlign: "center", padding: "10px 30px", fontSize: 30 }}
            textProps={{ borderWidth: 10 }}
          >
            {`Temtem Exchange`}
          </TemtemDynamicChip>
        </a>
      </Link>
      <TemtemText
        containerStyle={{ marginBottom: 30 }}
        style={{ fontSize: 26 }}
        borderWidth={10}
      >
        Advertise and search for Temtem you want to trade here.
      </TemtemText>
      <Link href="/tempedia">
        <a>
          <TemtemDynamicChip
            style={{ textAlign: "center", padding: "10px 30px", fontSize: 30 }}
            textProps={{ borderWidth: 10 }}
          >
            {`Personal Tempedia`}
          </TemtemDynamicChip>
        </a>
      </Link>
      <TemtemText
        containerStyle={{ marginBottom: 30 }}
        style={{ fontSize: 26 }}
        borderWidth={10}
      >
        Track the Temtem you've tamed here, and what ones you need to hunt. And
        you can share your Tempedia progress with other people!
      </TemtemText>
      <Link href="/quest-tracker">
        <a>
          <TemtemDynamicChip
            style={{ textAlign: "center", padding: "10px 30px", fontSize: 30 }}
            textProps={{ borderWidth: 10 }}
          >
            {`Quest Tracker`}
          </TemtemDynamicChip>
        </a>
      </Link>
      <TemtemText
        containerStyle={{ marginBottom: 30 }}
        style={{ fontSize: 26 }}
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
