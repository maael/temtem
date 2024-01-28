import { f, query } from "./client";

export async function getUserEncounter(userId: string) {
  const result = await query(
    f`
      Collection("encounter")
        .all()
        .where((e) => e.userId == ${userId})
        .paginate(5000)
    `
  );

  return { data: result };
}
