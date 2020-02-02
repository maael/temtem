/** @jsx jsx */
import { useEffect, useState } from "react";
import { jsx } from "@emotion/core";
import { TemtemLabelChip } from "@maael/temtem-svg-chip-components";
import TemtemText from "@maael/temtem-text-component";
import TemtemPortrait from "@maael/temtem-portrait-component";
import TemtemButton from "@maael/temtem-button-component";

export default function Tempedia() {
  const [temtem, setTemtem] = useState([]);
  const [taming, setTaming] = useState<string[]>([]);
  const [tamed, setTamed] = useState<string[]>([]);
  useEffect(() => {
    (async () => {
      const res = await fetch(
        "https://temtem-api.mael.tech/api/temtems?fields=number,name,types"
      );
      if (res.ok) {
        setTemtem(await res.json());
      }
    })().catch(console.error);
  }, []);
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/db/tempedia");
      if (res.ok) {
        const { data = [] } = await res.json();
        setTamed(t => t.concat(data.map(({ temtemName }) => temtemName)));
      }
    })().catch(console.error);
  }, []);
  async function onClick(name: string) {
    setTaming(t => t.concat(name));
    try {
      const res = await fetch("/api/db/tempedia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ temtemName: name })
      });
      if (res.ok) {
        setTamed(t => t.concat(name));
      }
    } finally {
      setTaming(t => t.filter(i => i !== name));
    }
  }
  return (
    <div style={{ margin: "10px auto", maxWidth: 1200, textAlign: "center" }}>
      {temtem.map(({ number: num, name, types }) => (
        <div
          key={num}
          css={{
            display: "inline-block",
            width: 170
          }}
        >
          <div
            css={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column"
            }}
          >
            <TemtemPortrait
              style={{ margin: "0 auto" }}
              temtem={name}
              shape="hexagon"
              size={100}
              borderWidth={5}
            />
            <TemtemText
              style={{ fontSize: 20, textAlign: "center" }}
              borderWidth={10}
            >
              {`#${num} ${name}`}
            </TemtemText>
            {tamed.includes(name) ? (
              <TemtemText
                containerStyle={{ marginTop: 7 }}
                style={{ fontSize: 20 }}
                borderWidth={10}
              >
                Tamed
              </TemtemText>
            ) : (
              <TemtemButton
                size="small"
                type={types[0]}
                theme="technique"
                disabled={taming.includes(name)}
                onClick={() => onClick(name)}
              >
                {taming.includes(name) ? "Taming" : "Tamed?"}
              </TemtemButton>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
