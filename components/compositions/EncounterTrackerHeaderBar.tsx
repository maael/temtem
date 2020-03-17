import React from "react";
import HeaderBar from "../primitives/HeaderBar";
import NavItem from "../primitives/NavItem";
import RequireAuth from "../primitives/RequireAuth";
import HideOnMobile from "../primitives/HideOnMobile";

export default function EncounterTrackerHeaderBar() {
  return (
    <RequireAuth>
      <HeaderBar
        style={{ alignItems: "flex-end !important", padding: 5, fontSize: 18 }}
      >
        <React.Fragment>
          <NavItem url="/encounter-tracker" exact>
            Encounters
          </NavItem>
          <NavItem url="/encounter-tracker/stats" exact>
            Stats
          </NavItem>
          <HideOnMobile style={{ position: "relative", top: -2 }}>
            <NavItem url="/encounter-tracker/auto">Automatic Tracker</NavItem>
          </HideOnMobile>
        </React.Fragment>
      </HeaderBar>
    </RequireAuth>
  );
}
