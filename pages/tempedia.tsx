/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { jsx } from "@emotion/core";
import ReactModal from "react-modal";
import TemtemText from "@maael/temtem-text-component";
import TemtemInput from "@maael/temtem-input-component";
import TemtemPortrait from "@maael/temtem-portrait-component";
import TemtemButton from "@maael/temtem-button-component";
import { colors } from "@maael/temtem-theme";
import HideOnMobile from "../components/primitives/HideOnMobile";
import useJWT from "../components/hooks/useJWT";
import useFetch from "../components/hooks/useFetch";

ReactModal.setAppElement("#__next");

export default function Tempedia({ userId }: { userId?: string }) {
  const jwt = useJWT();
  const [search, setSearch] = useState("");
  const [temtem, setTemtem] = useState<any[]>([]);
  const [taming, setTaming] = useState<string[]>([]);
  const [tamed, setTamed] = useState<string[]>([]);
  const [modalTemtem, setModalTemtem] = useState<string | undefined>();
  const [temtems] = useFetch<any[]>(
    `/temtems?expand=techniques,traits,type`,
    {},
    { source: "temtem-api", defaultValue: [] }
  );
  useEffect(() => {
    (async () => {
      const res = await fetch(
        "https://temtem-api.mael.tech/api/temtems?fields=number,name,types"
      );
      if (res.ok) {
        const data = await res.json();
        setTemtem(data);
      }
    })().catch(console.error);
  }, []);
  useEffect(() => {
    (async () => {
      const res = await fetch(
        `/api/db/tempedia/user/${userId || (jwt && jwt._id)}`
      );
      if (res.ok) {
        const { data = [] } = await res.json();
        setTamed(t => data.map(({ temtemName }) => temtemName));
      }
    })().catch(console.error);
  }, [userId, jwt]);
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
    <React.Fragment>
      <div style={{ margin: "10px auto", maxWidth: 1200, textAlign: "center" }}>
        <div
          css={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TemtemInput
            containerStyle={{ flex: 1, textAlign: "left" }}
            value={search}
            onChange={({ target }) => setSearch(() => (target as any).value)}
            placeholder="Search..."
          />
          {jwt ? (
            <TemtemText
              containerStyle={{ margin: 10 }}
              style={{ fontSize: 20 }}
              borderWidth={10}
            >{`Tamed: ${tamed.length}`}</TemtemText>
          ) : null}
          <TemtemText
            containerStyle={{ margin: 10 }}
            style={{ fontSize: 20 }}
            borderWidth={10}
          >{`Total: ${temtem.length}`}</TemtemText>
          {jwt ? (
            <HideOnMobile>
              <TemtemText
                containerStyle={{ margin: 10 }}
                style={{ fontSize: 20 }}
                borderWidth={10}
              >{`${((tamed.length / temtem.length || 0) * 100).toFixed(
                1
              )}%`}</TemtemText>
            </HideOnMobile>
          ) : null}
        </div>
        {temtem
          .filter(({ name }) =>
            search.trim()
              ? name.toLowerCase().includes(search.trim().toLowerCase())
              : true
          )
          .map(({ number: num, name, types }) => (
            <TemtemItem
              key={num}
              num={num}
              jwt={jwt}
              name={name}
              types={types}
              tamed={tamed}
              taming={taming}
              onClick={onClick}
              onClickInfo={() => setModalTemtem(name)}
              userId={userId}
            />
          ))}
      </div>
      <TemtemModal
        temtem={modalTemtem}
        data={temtems.find(({ name }) => modalTemtem === name)}
        onClose={() => setModalTemtem(undefined)}
      />
    </React.Fragment>
  );
}

function TemtemModal({ temtem, data, onClose }: any) {
  return (
    <ReactModal
      isOpen={!!temtem}
      onRequestClose={onClose}
      style={{
        overlay: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)"
        },
        content: {
          backgroundColor: colors.uiBgGradientStart,
          borderColor: colors.uiBlueFaded,
          borderWidth: 2,
          maxWidth: 800,
          position: "relative",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }
      }}
    >
      <div
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <TemtemPortrait
          style={{ marginTop: -25, marginRight: 10 }}
          temtem={temtem}
          shape="hexagon"
          size={100}
          borderWidth={5}
        />
        <TemtemText style={{ fontSize: 30 }}>{temtem}</TemtemText>
      </div>
      <TemtemText
        style={{ fontSize: 24 }}
        containerStyle={{ marginBottom: 10 }}
      >
        Locations
      </TemtemText>
      <div
        css={{
          display: "flex",
          flexDirection: "row",
          borderBottom: `2px solid ${colors.uiBlueFaded}`,
          padding: "0px 20px",
          marginBottom: 5
        }}
      >
        <TemtemText containerStyle={{ width: 100 }}>Island</TemtemText>
        <TemtemText containerStyle={{ flex: 1, marginRight: 20 }}>
          Location
        </TemtemText>
        <TemtemText containerStyle={{ width: 150, marginRight: 20 }}>
          Frequency
        </TemtemText>
        <TemtemText containerStyle={{ width: 100 }}>Level</TemtemText>
      </div>
      {data && data.locations && data.locations.length ? (
        data.locations.map(({ location, island, frequency, level }, i) => {
          return (
            <div
              key={`${location}${i}`}
              css={{
                display: "flex",
                flexDirection: "row",
                padding: "0px 20px",
                margin: "5px 0px"
              }}
            >
              <TemtemText containerStyle={{ width: 100 }}>{island}</TemtemText>
              <TemtemText containerStyle={{ flex: 1, marginRight: 20 }}>
                {location.replace(/[a-z]([A-Z])/g, ", $1")}
              </TemtemText>
              <TemtemText containerStyle={{ width: 150, marginRight: 20 }}>
                {frequency}
              </TemtemText>
              <TemtemText containerStyle={{ width: 100 }}>{level}</TemtemText>
            </div>
          );
        })
      ) : (
        <TemtemText style={{ textAlign: "center" }}>???</TemtemText>
      )}
    </ReactModal>
  );
}

function TemtemItem({
  num,
  name,
  jwt,
  tamed,
  types,
  taming,
  onClick,
  userId,
  onClickInfo
}: any) {
  return (
    <div
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
        <div onClick={onClickInfo}>
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
        </div>
        {jwt ? (
          tamed.includes(name) ? (
            <TemtemText
              containerStyle={{ marginTop: 7 }}
              style={{ fontSize: 20 }}
              borderWidth={10}
            >
              Tamed
            </TemtemText>
          ) : !userId || jwt._id === userId ? (
            <TemtemButton
              size="small"
              type={types[0]}
              theme="technique"
              disabled={taming.includes(name)}
              onClick={() => onClick(name)}
            >
              {taming.includes(name) ? "Taming" : "Tamed?"}
            </TemtemButton>
          ) : null
        ) : null}
      </div>
    </div>
  );
}
