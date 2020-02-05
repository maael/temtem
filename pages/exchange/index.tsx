/** @jsx jsx */
import React from "react";
import Link from "next/link";
import { jsx } from "@emotion/core";
import TemtemStatsTable from "../../components/compositions/StatsTable";
import TemtemText from "@maael/temtem-text-component";
import TemtemInput from "@maael/temtem-input-component";
import ExchangeHeaderBar from "../../components/compositions/ExchangeHeaderBar";
import ListingRequestDetails from "../../components/compositions/ListingRequestDetails";
import useFetch from "../../components/hooks/useFetch";

export default function Trades() {
  const [listings, loadingListings] = useFetch(
    "/db/exchange/listings/all",
    {},
    {
      defaultValue: [],
      source: "local",
      mapper: d => d.data
    }
  );
  return (
    <React.Fragment>
      <ExchangeHeaderBar />
      <div css={{ maxWidth: 1000, margin: "10px auto", textAlign: "center" }}>
        <TemtemText>
          Find Temtem here, and DM their tamers on Reddit to organise an
          exchange!
        </TemtemText>
        <TemtemText style={{ fontSize: 30 }} borderWidth={10}>
          {loadingListings
            ? "Loading..."
            : `${listings.length || "No"} Listings`}
        </TemtemText>
        {listings.map(l => (
          <div key={l._id}>
            <Link href={`/exchange/listings/${l._id}`}>
              <a style={{ textDecoration: "none" }}>
                <TemtemStatsTable
                  temtem={{
                    name: l.temtemName,
                    types: []
                  }}
                  svs={{
                    hp: l.svHp,
                    sta: l.svSta,
                    spd: l.svSpd,
                    atk: l.svAtk,
                    def: l.svDef,
                    spatk: l.svSpatk,
                    spdef: l.svSpdef
                  }}
                  trait={l.temtemTrait}
                  gender={l.temtemGender}
                  breedTechniques={l.temtemBredTechniques.map(n => ({
                    name: n,
                    type: "Toxic"
                  }))}
                  fertility={l.temtemFertility}
                  isLuma={l.temtemIsLuma}
                />
              </a>
            </Link>
            <ListingRequestDetails
              user={l.user}
              cost={l.requestCost}
              details={l.requestDetails}
            />
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}
