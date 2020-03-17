import React from "react";
import Link from "next/link";
import { FaStar, FaRegStar } from "react-icons/fa";
import TemtemStatsTable from "./StatsTable";
import ListingRequestDetails from "./ListingRequestDetails";
import useJWT from "../hooks/useJWT";

interface Props {
  listing: any;
  onSave: () => void;
  onUnsave: () => void;
  isSaved: boolean;
}

export default function ListingItem({
  listing: l,
  onSave,
  onUnsave,
  isSaved
}: Props) {
  const jwt = useJWT();
  return (
    <div key={l._id} css={{ position: "relative" }}>
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
      {jwt && jwt._id ? (
        isSaved ? (
          <FaStar
            size={40}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: -20,
              right: -20
            }}
            onClick={onUnsave}
          />
        ) : (
          <FaRegStar
            size={40}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: -20,
              right: -20
            }}
            onClick={onSave}
          />
        )
      ) : null}
    </div>
  );
}
