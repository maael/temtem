import {
  ExchangeListing,
  ExchangeListingInput,
  RawCreateInput
} from "../../types/db";
import {
  embellishCreate,
  embellishDelete,
  embellishUpdate,
  f,
  query
} from "./client";

export async function getExchangeListings(): Promise<{
  data: ExchangeListing[];
}> {
  const result = await query(
    f`
      Collection("exchange_listings")
        .all()
        .where((l) => l.type == "LISTING" && l.isActive == true)
        .map((listing) => Object.assign({ temtemBredTechniques: [] }, Object.assign(listing, { user: users.byId(listing.user.id) })))
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
        .map((listing) => Object.assign({ temtemBredTechniques: [] }, Object.assign(listing, { user: users.byId(listing.user.id) })))
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
        .map((listing) => Object.assign({ temtemBredTechniques: [] }, Object.assign(listing, { user: users.byId(listing.user.id) })))
        .paginate(1)
    `
  );
  return result[0] || null;
}

export async function createExchangeListing(
  rawData: RawCreateInput<ExchangeListingInput>
): Promise<ExchangeListing> {
  const { coll: _coll, data: _data, ...data } = rawData as any;
  const result = await query(
    f`Collection('exchange_listings').createData(${embellishCreate({
      ...data,
      temtemBredTechniques: data.temtemBredTechniques || [],
      user: f`Ref(Collection("users"), ${data.userId})`
    })})`
  );
  return result;
}

export async function updateExchangeListing(
  listingId: string,
  rawData: Partial<ExchangeListing>
) {
  const { coll: _coll, data: _data, ...update } = rawData as any;
  const result = await query(
    f`Collection('exchange_listings').byId(${listingId}).updateData(${embellishUpdate(
      {
        ...update,
        temtemBredTechniques: update.temtemBredTechniques || [],
        user: f`Ref(Collection("users"), ${update.userId})`
      }
    )})`
  );
  return result;
}

export async function setExchangeInactive(
  listingId: string,
  rawData: Partial<ExchangeListing>
) {
  const { coll: _coll, data: _data, ...update } = rawData as any;
  const data = embellishDelete(
    embellishCreate({
      ...update,
      temtemBredTechniques: update.temtemBredTechniques || []
    })
  );
  const result = await query(
    f`Collection('exchange_listings').byId(${listingId}).updateData(${embellishUpdate(
      data
    )})`
  );
  return result;
}
