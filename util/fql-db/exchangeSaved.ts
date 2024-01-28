import {
  ExchangeSaved,
  ExchangeSavedInput,
  RawCreateInput
} from "../../types/db";
import { embellishCreate, f, mapSafe, query } from "./client";

export async function getExchangeSaved(
  userId: string
): Promise<{ data: ExchangeSaved[] }> {
  const result = await query(
    f`
      Collection("exchange_saved")
        .all()
        .where((s) => s.userId == ${userId})
        .map((saved) => Object.assign({ user: {}, exchangeListing: {}, temtemBredTechniques: [] }, saved))
        .map((saved) => Object.assign(saved, { exchangeListing: Object.assign(saved.exchangeListing, { user: users.byId(exchange_listings.byId(saved.exchangeListing.id)!.user.id) }) }))
        .paginate(5000)
    `
  );
  return {
    data: result.map(r => ({
      ...r,
      exchangeListing: mapSafe(r.exchangeListing)
    }))
  };
}

export async function createExchangeSaved(
  rawData: RawCreateInput<ExchangeSavedInput>
): Promise<ExchangeSaved> {
  const { coll: _coll, data: _data, ...data } = rawData as any;
  const result = await query(
    f`Collection('exchange_saved').createData(${embellishCreate({
      ...data,
      temtemBredTechniques: data.temtemBredTechniques || [],
      user: {
        id: data.userId
      },
      exchangeListing: {
        id: data.exchangeListingId
      }
    })})`
  );
  return result;
}

export async function deleteExchangeSaved(id: string) {
  const result = await query(
    f`Collection('exchange_saved').byId(${id})!.delete()`
  );
  return result;
}
