import React from "react";
import { FaSteam } from "react-icons/fa";
import TemtemButton from "@maael/temtem-button-component";
import useFetch from "../hooks/useFetch";

export default function SteamProfile({ steamId }: { steamId?: string }) {
  const [data] = useFetch<any>(
    `/steam/user`,
    {},
    { suffix: `/${steamId}`, source: "local" },
    [steamId]
  );
  return steamId && data && data.personaname ? (
    <div>
      <a
        href={data.profileurl}
        css={{
          textDecoration: "none"
        }}
      >
        <TemtemButton style={{ marginBottom: 10 }}>
          <div
            css={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <img
              src={data.avatar}
              css={{ borderRadius: "0.5em", marginRight: 10 }}
            />
            <FaSteam style={{ marginRight: 5 }} />
            {data.personaname}
          </div>
        </TemtemButton>
      </a>
    </div>
  ) : null;
}
