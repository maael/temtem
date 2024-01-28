import { ExchangeSaved } from "../../types/db";
import { f, mapSafe, query } from "./client";

export async function getExchangeSaved(
  userId: string
): Promise<{ data: ExchangeSaved[] }> {
  const result = await query(
    f`
      Collection("exchange_saved")
        .all()
        .where((s) => s.userId == ${userId})
        .map((saved) => Object.assign({ user: {}, exchangeListing: {}, temtemBredTechniques: [] }, saved))
        .map((saved) => Object.assign(saved, { exchangeListing: Object.assign(saved.exchangeListing, { user: users.byId(saved.exchangeListing.user.id) }) }))
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
