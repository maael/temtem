import React from "react";
import HeaderBar from "../primitives/HeaderBar";
import NavItem from "../primitives/NavItem";

export default function ExchangeHeaderBar() {
  return (
    <HeaderBar>
      <React.Fragment>
        <NavItem url="/exchange" exact>
          All Listings
        </NavItem>
        <NavItem url="/exchange/listings">My Listings</NavItem>
        <NavItem url="/exchange/saved">My Saved</NavItem>
      </React.Fragment>
    </HeaderBar>
  );
}
