import React, { useState } from "react";
import Link from "next/link";
import TemtemText from "@maael/temtem-text-component";
import TemtemButton from "@maael/temtem-button-component";
import TemtemStatsTable from "../../../components/compositions/StatsTable";
import { colors } from "@maael/temtem-theme";
import ListingRequestDetails from "../../../components/compositions/ListingRequestDetails";
import ExchangeForm from "../../../components/compositions/ExchangeForm";
import ExchangeHeaderBar from "../../../components/compositions/ExchangeHeaderBar";
import useFetch from "../../../components/hooks/useFetch";

export default function UserExchangeListings() {
  const [showingForm, setShowingForm] = useState(false);
  const [ads, loadingAds] = useFetch(
    "/db/exchange/listings",
    {},
    {
      defaultValue: [],
      source: "local",
      mapper: d => d.data.filter(i => i.isActive)
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
      {showingForm ? (
        <ExchangeForm onSave={() => setShowingForm(false)} />
      ) : null}

      <TemtemText style={{ fontSize: 30 }} borderWidth={10}>
        {loadingAds
          ? "Loading..."
          : `You have ${ads.length || "no"} active listings.`}
      </TemtemText>
      <div css={{ maxWidth: 1000, margin: "0 auto" }}>
        {ads.map(l => (
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
    </div>
  );
}
