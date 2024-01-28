import { ExchangeListing } from "../../types/db";
import { f, query } from "./client";

export async function getExchangeListings(): Promise<{
  data: ExchangeListing[];
}> {
  const result = await query(
    f`
      Collection("exchange_listings")
        .all()
        .where((l) => l.type == "LISTING" && l.isActive == true)
        .map((listing) => Object.assign({ user: {}, temtemBredTechniques: [] }, listing))
        .paginate(5000)
    `
  );
  return {
    data: result
  };
}

export async function getUserExchangeListings(
  userId: string
): Promise<{
  data: ExchangeListing[];
}> {
  const result = await query(
    f`
      Collection("exchange_listings")
        .all()
        .where((l) => l.type == "LISTING" && l.userId == ${userId})
        .map((listing) => Object.assign({ user: {}, temtemBredTechniques: [] }, listing))
        .paginate(5000)
    `
  );
  return {
    data: result
  };
}

export async function getExchangeListing(listingId: string) {
  const result = await query(
    f`
      Collection("exchange_listings")
        .all()
        .where((l) => l.id == ${listingId})
        .map((listing) => Object.assign({ user: {}, temtemBredTechniques: [] }, listing))
        .paginate(5000)
    `
  );
  return {
    data: result
  };
}
