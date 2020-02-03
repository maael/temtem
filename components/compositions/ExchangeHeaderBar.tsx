import React from "react";
import HeaderBar from "../primitives/HeaderBar";
import NavItem from "../primitives/NavItem";
import RequireAuth from "../primitives/RequireAuth";

export default function ExchangeHeaderBar() {
  return (
    <HeaderBar>
      <React.Fragment>
        <NavItem url="/exchange" exact>
          All Listings
        </NavItem>
        <RequireAuth>
          <NavItem url="/exchange/listings">My Listings</NavItem>
        </RequireAuth>
        <RequireAuth>
          <NavItem url="/exchange/saved">My Saved</NavItem>
        </RequireAuth>
      </React.Fragment>
    </HeaderBar>
  );
}
