import { f, query } from "./client";

export async function getTempediaEntries(userId: string) {
  const result = await query(
    f`Collection('tempedia_entries').where(.userId == ${userId})`
  );
  return { data: result };
}
