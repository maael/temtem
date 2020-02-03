import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { colors } from "@maael/temtem-theme";
import NavItem from "./NavItem";

export default function OverlayMenu({ onClose }: { onClose: () => void }) {
  const [first, setFirst] = useState();
  const router = useRouter();
  useEffect(() => {
    if (first) {
      onClose();
    } else {
      setFirst(true);
    }
  }, [router.pathname]);
  return (
    <div
      css={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: colors.uiDark,
        zIndex: 99,
        paddingTop: 50
      }}
    >
      <div
        onClick={() => onClose()}
        style={{ position: "absolute", top: 10, left: 5 }}
      >
        <IoIosCloseCircleOutline color={colors.uiBlueFaded} size={50} />
      </div>
      <NavItem
        style={{
          padding: "20px 10px 10px 10px",
          display: "block",
          width: "100%"
        }}
        url="/"
        exact
      >
        Home
      </NavItem>
      <NavItem
        style={{
          padding: "20px 10px 10px 10px",
          display: "block",
          width: "100%"
        }}
        url="/exchange"
      >
        Temtem Exchange
      </NavItem>
      <NavItem
        style={{
          padding: "20px 10px 10px 10px",
          display: "block",
          width: "100%"
        }}
        url="/tempedia"
      >
        Personal Tempedia
      </NavItem>
      <NavItem
        style={{
          padding: "20px 10px 10px 10px",
          display: "block",
          width: "100%"
        }}
        url="/quest-tracker"
      >
        Quest Tracker
      </NavItem>
      <NavItem
        style={{
          padding: "20px 10px 10px 10px",
          display: "block",
          width: "100%"
        }}
        url="/battle-tools"
      >
        Battle Tools
      </NavItem>
    </div>
  );
}
