/** @jsx jsx */
import { jsx } from "@emotion/core";
import { MdLocationOn } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import TemtemPortrait from "@maael/temtem-portrait-component";
import TemtemText from "@maael/temtem-text-component";
import { Encounter } from "../../types/db";

export default function EncounterItem({
  temtemName,
  location,
  trait,
  createdAt
}: Encounter) {
  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        position: "relative",
        flex: 1,
        padding: 5
      }}
    >
      <TemtemPortrait
        borderWidth={5}
        style={{ display: "inline-block", marginRight: 10 }}
        temtem={temtemName}
        shape="hexagon"
        size={80}
      />
      <div>
        <TemtemText borderWidth={10} style={{ fontSize: 20 }}>
          {temtemName}
        </TemtemText>
        <div css={{ display: "flex", alignItems: "center" }}>
          <MdLocationOn style={{ marginRight: 7 }} />
          <TemtemText borderWidth={10} style={{ fontSize: 16 }}>
            {location}
          </TemtemText>
        </div>
        {trait ? (
          <TemtemText
            borderWidth={10}
            style={{ fontSize: 16 }}
          >{`Trait: ${trait}`}</TemtemText>
        ) : null}
      </div>
      <div
        style={{
          position: "absolute",
          right: 10,
          top: 15,
          display: "flex",
          alignItems: "center"
        }}
      >
        <FaRegClock />
        <TemtemText
          borderWidth={8}
          containerStyle={{ marginLeft: 7 }}
          style={{ fontSize: 12 }}
        >
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </TemtemText>
      </div>
    </div>
  );
}
