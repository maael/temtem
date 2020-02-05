/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import TemtemPortrait from "@maael/temtem-portrait-component";
import TemtemText from "@maael/temtem-text-component";
import {
  TemtemHeaderChip,
  TemtemStatChip,
  TemtemDynamicChip
} from "@maael/temtem-svg-chip-components";
import TemtemButton from "@maael/temtem-button-component";
import { colors } from "@maael/temtem-theme";

export interface Props {
  temtem: {
    name: string;
    types: string[];
  };
  svs: Record<string, number>;
  trait: string;
  isLuma: boolean;
  gender: "m" | "f";
  breedTechniques: { name: string; type: string }[];
  fertility: number;
  cost?: number;
  details?: string;
  userName?: string;
  style?: React.CSSProperties;
}

const breakpoints = {
  mobile: "@media (min-width: 400px)",
  tablet: "@media (min-width: 600px)",
  desktop: "@media (min-width: 800px)"
};

export function HideOnMobile({ children }: { children: any }) {
  return (
    <div
      css={{
        display: "none",
        [breakpoints.desktop]: {
          display: "initial"
        }
      }}
    >
      {children}
    </div>
  );
}

export function HideOnDesktop({ children }: { children: any }) {
  return (
    <div
      css={{
        display: "initial",
        [breakpoints.desktop]: {
          display: "none"
        }
      }}
    >
      {children}
    </div>
  );
}

export default function TemtemStatsTable(props: Props) {
  return (
    <React.Fragment>
      <HideOnMobile>
        <TemtemStatsTableDesktop {...props} />
      </HideOnMobile>
      <HideOnDesktop>
        <TemtemStatsTableMobile {...props} />
      </HideOnDesktop>
    </React.Fragment>
  );
}

function TemtemStatsTableMobile({
  temtem,
  gender,
  svs,
  trait,
  breedTechniques
}: Props) {
  return (
    <div style={{ margin: "10px 0px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <TemtemPortrait
          size={40}
          borderWidth={2}
          shape="circle"
          temtem={temtem.name}
        />
        <TemtemText containerStyle={{ margin: "0px 5px" }}>
          {temtem.name}
        </TemtemText>
        <TemtemText
          containerStyle={{ margin: 5, position: "relative" }}
          style={{ fontSize: 12 }}
          borderWidth={8}
          color={colors.uiYellowGender}
        >
          {gender === "m" ? "M" : "F"}
        </TemtemText>
        <TemtemText
          containerStyle={{ margin: 5, position: "relative" }}
          style={{ fontSize: 10 }}
          borderWidth={8}
        >
          {trait}
        </TemtemText>
        {breedTechniques.length ? (
          <TemtemText
            containerStyle={{ margin: 5, position: "relative" }}
            style={{ fontSize: 10 }}
            borderWidth={8}
          >
            {breedTechniques[0].name}
          </TemtemText>
        ) : null}
      </div>
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <td style={{ textAlign: "center" }}>
              <TemtemDynamicChip
                chipColor={colors.uiYellow}
                textProps={{ style: { fontSize: 10 } }}
                style={{ padding: 10 }}
              >
                HP
              </TemtemDynamicChip>
            </td>
            <td style={{ textAlign: "center" }}>
              <TemtemDynamicChip
                chipColor={colors.uiYellow}
                textProps={{ style: { fontSize: 10 } }}
                style={{ padding: 10 }}
              >
                STA
              </TemtemDynamicChip>
            </td>
            <td style={{ textAlign: "center" }}>
              <TemtemDynamicChip
                chipColor={colors.uiYellow}
                textProps={{ style: { fontSize: 10 } }}
                style={{ padding: 10 }}
              >
                SPD
              </TemtemDynamicChip>
            </td>
            <td style={{ textAlign: "center" }}>
              <TemtemDynamicChip
                chipColor={colors.uiYellow}
                textProps={{ style: { fontSize: 10 } }}
                style={{ padding: 10 }}
              >
                ATK
              </TemtemDynamicChip>
            </td>
            <td style={{ textAlign: "center" }}>
              <TemtemDynamicChip
                chipColor={colors.uiYellow}
                textProps={{ style: { fontSize: 10 } }}
                style={{ padding: 10 }}
              >
                DEF
              </TemtemDynamicChip>
            </td>
            <td style={{ textAlign: "center" }}>
              <TemtemDynamicChip
                chipColor={colors.uiYellow}
                textProps={{ style: { fontSize: 10 } }}
                style={{ padding: 10 }}
              >
                SPATK
              </TemtemDynamicChip>
            </td>
            <td style={{ textAlign: "center" }}>
              <TemtemDynamicChip
                chipColor={colors.uiYellow}
                textProps={{ style: { fontSize: 10 } }}
                style={{ padding: 10 }}
              >
                SPDEF
              </TemtemDynamicChip>
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: "center" }}>
              <TemtemDynamicChip
                style={{
                  boxSizing: "border-box",
                  maxWidth: 60,
                  width: "98%",
                  padding: 8
                }}
              >{`${svs.hp || 0}`}</TemtemDynamicChip>
            </td>
            <td style={{ textAlign: "center" }}>
              <TemtemDynamicChip
                style={{
                  boxSizing: "border-box",
                  maxWidth: 60,
                  width: "98%",
                  padding: 8
                }}
              >{`${svs.sta || 0}`}</TemtemDynamicChip>
            </td>
            <td style={{ textAlign: "center" }}>
              <TemtemDynamicChip
                style={{
                  boxSizing: "border-box",
                  maxWidth: 60,
                  width: "98%",
                  padding: 8
                }}
              >{`${svs.spd || 0}`}</TemtemDynamicChip>
            </td>
            <td style={{ textAlign: "center" }}>
              <TemtemDynamicChip
                style={{
                  boxSizing: "border-box",
                  maxWidth: 60,
                  width: "98%",
                  padding: 8
                }}
              >{`${svs.atk || 0}`}</TemtemDynamicChip>
            </td>
            <td style={{ textAlign: "center" }}>
              <TemtemDynamicChip
                style={{
                  boxSizing: "border-box",
                  maxWidth: 60,
                  width: "98%",
                  padding: 8
                }}
              >{`${svs.def || 0}`}</TemtemDynamicChip>
            </td>
            <td style={{ textAlign: "center" }}>
              <TemtemDynamicChip
                style={{
                  boxSizing: "border-box",
                  maxWidth: 60,
                  width: "98%",
                  padding: 8
                }}
              >{`${svs.spatk || 0}`}</TemtemDynamicChip>
            </td>
            <td style={{ textAlign: "center" }}>
              <TemtemDynamicChip
                style={{
                  boxSizing: "border-box",
                  maxWidth: 60,
                  width: "98%",
                  padding: 8
                }}
              >{`${svs.spdef || 0}`}</TemtemDynamicChip>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function TemtemStatsTableDesktop({
  style,
  temtem,
  gender,
  svs,
  trait,
  fertility,
  isLuma,
  breedTechniques,
  cost,
  details,
  userName
}: Props) {
  return (
    <div
      style={{
        padding: 20,
        backgroundColor: "rgba(10, 10, 10, 0.3)",
        borderRadius: 20,
        marginTop: 60,
        marginLeft: 25,
        position: "relative",
        ...style
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          position: "absolute",
          top: -50,
          left: -25
        }}
      >
        <TemtemPortrait
          style={{ marginTop: -16 }}
          size={100}
          borderWidth={8}
          shape="hexagon"
          temtem={temtem.name}
        />
        <TemtemText
          style={{ fontSize: 36 }}
          borderWidth={10}
          containerStyle={{ margin: 10 }}
        >
          {temtem.name}
        </TemtemText>
        <TemtemText
          containerStyle={{ margin: 5, position: "relative", top: -5 }}
          style={{ fontSize: 36 }}
          borderWidth={8}
          color={colors.uiYellowGender}
        >
          {gender === "m" ? "♂" : "♀"}
        </TemtemText>
        {temtem.types.map(t => (
          <div
            key={t}
            style={{
              position: "relative",
              top: -8,
              width: 60,
              display: "flex",
              justifyContent: "center",
              paddingBottom: 5
            }}
          >
            <img
              key={t}
              src={`https://temtem-api.mael.tech/images/icons/types/${t}.png`}
              style={{ height: 50, width: 50 }}
            />
            <TemtemText
              containerStyle={{ position: "absolute", bottom: 0 }}
              style={{ fontSize: 14 }}
            >
              {t}
            </TemtemText>
          </div>
        ))}
        <TemtemButton style={{ margin: 10 }} bgColor="#FFFFFF" nonInteractive>
          {trait}
        </TemtemButton>
        <TemtemText
          style={{ fontSize: 16 }}
        >{`Fertility: ${fertility}`}</TemtemText>
        {isLuma ? <TemtemText style={{ fontSize: 16 }}>LUMA</TemtemText> : null}
        <div css={{ flex: 1, flexDirection: "row" }}>
          {cost ? (
            <TemtemText style={{ fontSize: 16 }}>{`${cost}`}</TemtemText>
          ) : null}
          {userName ? (
            <TemtemText style={{ fontSize: 16 }}>{`${userName}`}</TemtemText>
          ) : null}
          {details ? (
            <TemtemText style={{ fontSize: 16 }}>{`${details}`}</TemtemText>
          ) : null}
        </div>
      </div>
      <div style={{ position: "relative", marginTop: 15 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <TemtemHeaderChip height={60} width={100} label="SVs" />
          <TemtemStatChip height={60} width={100} value={svs.hp || 0} />
          <TemtemStatChip height={60} width={100} value={svs.sta || 0} />
          <TemtemStatChip height={60} width={100} value={svs.spd || 0} />
          <TemtemStatChip height={60} width={100} value={svs.atk || 0} />
          <TemtemStatChip height={60} width={100} value={svs.def || 0} />
          <TemtemStatChip height={60} width={150} value={svs.spatk || 0} />
          <TemtemStatChip height={60} width={150} value={svs.spdef || 0} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 5
        }}
      >
        <TemtemText style={{ fontSize: 24, marginRight: 10 }} borderWidth={8}>
          Bred Techniques :
        </TemtemText>
        {breedTechniques.map(({ name, type }, i) => (
          <TemtemButton
            style={{ margin: 5 }}
            key={`${name}-${i}`}
            type={type as any}
            theme="technique"
          >
            {name}
          </TemtemButton>
        ))}
      </div>
    </div>
  );
}
