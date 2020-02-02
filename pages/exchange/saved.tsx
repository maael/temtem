import React from "react";
import HeaderBar from "../../components/primitives/HeaderBar";
import NavItem from "../../components/primitives/NavItem";

export default function ExchangeAds() {
  return (
    <HeaderBar>
      <React.Fragment>
        <NavItem url="/exchange" exact>
          Home
        </NavItem>
        <NavItem url="/exchange/ads">My Ads</NavItem>
        <NavItem url="/exchange/saved">Saved</NavItem>
      </React.Fragment>
    </HeaderBar>
  );
}
