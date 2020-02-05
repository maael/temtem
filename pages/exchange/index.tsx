/** @jsx jsx */
import React from "react";
import Link from "next/link";
import { jsx } from "@emotion/core";
import TemtemStatsTable from "@maael/temtem-stats-table-component";
import TemtemText from "@maael/temtem-text-component";
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
        <TemtemText style={{ fontSize: 30 }} borderWidth={10}>
          {loadingListings
            ? "Loading..."
            : `${listings.length || "No"} Listings`}
        </TemtemText>
        {listings.map(l => (
          <div>
            <Link href={`/exchange/listings/${l._id}`}>
              <a style={{ textDecoration: "none" }}>
                <TemtemStatsTable
                  key={l._id}
                  temtem={{
                    name: l.temtemName,
                    stats: {},
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
