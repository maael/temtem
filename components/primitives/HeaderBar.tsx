/** @jsx jsx */
import { jsx } from "@emotion/core";
import { colors } from "@maael/temtem-theme";

export default function HeaderBar({ children }: { children: JSX.Element }) {
  return (
    <div
      css={{
        backgroundColor: colors.uiOutline,
        padding: "10px 5px",
        fontSize: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {children}
    </div>
  );
}
