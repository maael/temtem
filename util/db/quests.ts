import client from "./client";
import { TrackedQuest } from "../../types/db";

export async function getUserQuests(
  userId: string
): Promise<{ data: TrackedQuest[] }> {
  const query = `
    query UserTrackedQuest ($userId: ID!){
      userTrackedQuest(userId: $userId) {
        data {
          _id
          userId
          questName
          isActive
          createdAt
          updatedAt
          deletedAt
        }
      }
    }
  `;
  return (await client.request(query, { userId })).userTrackedQuest;
}
