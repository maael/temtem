import client from "./client";
import { embellishCreate } from "./util";
import { TrackedQuest, TrackedQuestInput } from "../../types/db";

export async function getUserQuests(
  userId: string
): Promise<{ data: TrackedQuest[] }> {
  const query = `
    query UserTrackedQuest ($userId: ID!){
      userTrackedQuests(userId: $userId) {
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
  return (await client.request(query, { userId })).userTrackedQuests;
}

export async function createUserQuests(
  rawData: TrackedQuestInput
): Promise<{ data: TrackedQuest[] }> {
  const query = `
    mutation CreateUserTrackedQuest ($data: TrackedQuestInput!){
      createTrackedQuest(data: $data) {
        _id
        userId
        questName
        isActive
        createdAt
        updatedAt
        deletedAt
      }
    }
  `;
  const data = rawData;
  return (await client.request(query, { data })).createTrackedQuest;
}
