/** @jsx jsx */
import { jsx } from "@emotion/core";
import { TemtemLabelChip } from "@maael/temtem-svg-chip-components";
import TemtemText from "@maael/temtem-text-component";

export default function Tempedia() {
  return (
    <div style={{ margin: "10px auto", width: 800 }}>
      <TemtemLabelChip label="Work in progress" width={800} height={100} />
      <TemtemText
        style={{ fontSize: 40, textAlign: "center" }}
        borderWidth={10}
      >
        Eventually you'll be able to show what Temtem you've caught, and what
        you still need to hunt down.
      </TemtemText>
    </div>
  );
}
