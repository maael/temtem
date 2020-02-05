import React, { useState } from "react";
import Link from "next/link";
import TemtemText from "@maael/temtem-text-component";
import TemtemButton from "@maael/temtem-button-component";
import TemtemStatsTable from "@maael/temtem-stats-table-component";
import { colors } from "@maael/temtem-theme";
import ListingRequestDetails from "../../../components/compositions/ListingRequestDetails";
import ExchangeForm from "../../../components/compositions/ExchangeForm";
import ExchangeHeaderBar from "../../../components/compositions/ExchangeHeaderBar";
import useFetch from "../../../components/hooks/useFetch";

export default function UserExchangeListings() {
  const [showingForm, setShowingForm] = useState(false);
  const [ads] = useFetch(
    "/db/exchange/listings",
    {},
    {
      defaultValue: [],
      source: "local",
      mapper: d => d.data
    }
  );
  return (
    <div css={{ textAlign: "center" }}>
      <ExchangeHeaderBar />
      <TemtemButton
        style={{ margin: 10 }}
        type={"" as any}
        bgColor={colors.uiBlueFaded}
        onClick={() => setShowingForm(s => !s)}
      >
        {showingForm ? "Close Listing Form" : "New Listing"}
      </TemtemButton>
      {showingForm ? <ExchangeForm /> : null}
      <TemtemText style={{ fontSize: 30 }} borderWidth={10}>
        {`You have ${ads.length || "no"} listings.`}
      </TemtemText>
      <div css={{ maxWidth: 1000, margin: "0 auto" }}>
        {ads.map(l => (
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
              <ListingRequestDetails
                user={l.user}
                cost={l.requestCost}
                details={l.requestDetails}
              />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
