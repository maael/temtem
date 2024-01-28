import { f, query } from "./client";

export async function getUserQuests(userId: string) {
  const result = await query(
    f`Collection('tracked_quests').where(.userId == ${userId})`
  );
  return { data: result };
}
