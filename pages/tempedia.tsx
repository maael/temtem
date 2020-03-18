/** @jsx jsx */
import React, { useState } from "react";
import { jsx } from "@emotion/core";
import ReactModal from "react-modal";
import { IoIosCloseCircle } from "react-icons/io";
import TemtemText from "@maael/temtem-text-component";
import TemtemInput from "@maael/temtem-input-component";
import TemtemPortrait from "@maael/temtem-portrait-component";
import TemtemButton from "@maael/temtem-button-component";
import { colors } from "@maael/temtem-theme";
import HideOnMobile from "../components/primitives/HideOnMobile";
import useJWT from "../components/hooks/useJWT";
import useFetch from "../components/hooks/useFetch";
import useCallableFetch from "../components/hooks/useCallableFetch";

ReactModal.setAppElement("#__next");

export default function Tempedia({ userId }: { userId?: string }) {
  const jwt = useJWT();
  const [search, setSearch] = useState("");
  const [temtem, setTemtem] = useState<any[]>([]);
  const [taming, setTaming] = useState<string[]>([]);
  const [tamed, setTamed] = useState<{ _id: string; name: string }[]>([]);
  const [modalTemtem, setModalTemtem] = useState<string | undefined>();
  const [deleteTamed] = useCallableFetch("/db/tempedia", { method: "DELETE" });
  const [createTamed] = useCallableFetch<{ _id: string }>("/db/tempedia", {
    method: "POST"
  });
  const [temtems] = useFetch<any[]>(
    `/temtems?expand=techniques,traits,type`,
    {},
    {
      source: "temtem-api",
      defaultValue: [],
      mapper: d => {
        setTemtem(d);
        return d;
      }
    }
  );
  useFetch(
    `/db/tempedia/user`,
    {},
    {
      suffix: () => `/${userId || (jwt && jwt._id) || ""}`,
      source: "local",
      mapper: d => {
        setTamed(
          (d.data || []).map(({ temtemName: name, _id }) => ({ name, _id }))
        );
        return d.data;
      }
    },
    [userId, jwt]
  );
  async function onClick(name: string) {
    setTaming(t => t.concat(name));
    try {
      const result = await createTamed({
        body: JSON.stringify({ temtemName: name })
      });
      setTamed(t => t.concat({ name, _id: result._id }));
    } finally {
      setTaming(t => t.filter(i => i !== name));
    }
  }
  async function onDelete({ _id }) {
    try {
      await deleteTamed({}, _id);
      setTamed(t => t.filter(f => f._id !== _id));
    } catch (e) {
      console.error(e);
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
            placeholder={`Search ${temtem.length} temtem...`}
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
              >{`${(
                (temtem.length ? tamed.length / temtem.length : 0) * 100
              ).toFixed(1)}%`}</TemtemText>
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
              onDelete={onDelete}
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
          bottom: 0,
          maxHeight: "60vh"
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
        <TemtemText containerStyle={{ width: 100, marginRight: 20 }}>
          Island
        </TemtemText>
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
              <TemtemText containerStyle={{ width: 100, marginRight: 20 }}>
                {island}
              </TemtemText>
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
  onDelete,
  userId,
  onClickInfo
}: any) {
  const tamedInfo = tamed.find(t => t.name === name);
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
        <div
          onClick={onClickInfo}
          css={{
            cursor: "pointer",
            opacity: tamedInfo ? 1 : 0.5,
            filter: tamedInfo ? "" : "grayscale(100%)"
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
        </div>
        {userId && jwt && userId === jwt._id ? (
          tamedInfo ? (
            <div css={{ marginTop: 7, display: "flex", alignItems: "center" }}>
              <TemtemText style={{ fontSize: 20 }} borderWidth={10}>
                Tamed
              </TemtemText>
              <IoIosCloseCircle
                size={16}
                style={{ marginLeft: 5, marginTop: -1, cursor: "pointer" }}
                onClick={() => onDelete(tamedInfo)}
              />
            </div>
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
          )
        ) : null}
      </div>
    </div>
  );
}
