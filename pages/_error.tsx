import Link from "next/link";
import TemtemText from "@maael/temtem-text-component";
import TemtemPortrait from "@maael/temtem-portrait-component";
import TemtemButton from "@maael/temtem-button-component";

export default function ErrorPage() {
  return (
    <div style={{ textAlign: "center", marginTop: 20 }}>
      <TemtemPortrait
        temtem="Blooze"
        shape="hexagon"
        size={200}
        style={{ display: "inline-block" }}
      />
      <TemtemText borderWidth={10} style={{ fontSize: 44 }}>
        Hmmm?
      </TemtemText>
      <TemtemText borderWidth={10} style={{ fontSize: 44 }}>
        Well this isn't right.
      </TemtemText>
      <Link href="/">
        <TemtemButton
          style={{ marginTop: 20 }}
          size="large"
          type={"Toxic" as any}
          theme="technique"
        >
          Go back
        </TemtemButton>
      </Link>
    </div>
  );
}
