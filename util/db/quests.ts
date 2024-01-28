import client from "./client";
import { embellishCreate, embellishUpdate } from "./util";
import {
  TrackedQuest,
  TrackedQuestInput,
  RawCreateInput
} from "../../types/db";

export async function getUserQuests(
  userId: string
): Promise<{ data: TrackedQuest[] }> {
  const query = `
    query UserTrackedQuest ($userId: ID!){
      getUserTrackedQuests(userId: $userId) {
        data {
          _id
          questName
          questStarted
          questStep
          questFinished
          questNote
          isActive
          createdAt
          updatedAt
        }
      }
    }
  `;
  return ((await client.request(query, { userId })) as any)
    .getUserTrackedQuests;
}

export async function createUserQuests(
  rawData: RawCreateInput<TrackedQuestInput>
): Promise<{ data: TrackedQuest[] }> {
  const query = `
    mutation CreateUserTrackedQuest ($data: TrackedQuestInput!){
      createTrackedQuest(data: $data) {
        _id
        questName
        questStarted
        questStep
        questFinished
        questNote
        isActive
        createdAt
        updatedAt
      }
    }
  `;
  const data = embellishCreate({
    ...rawData,
    questStarted: true,
    questStep: 0,
    questFinished: false,
    user: {
      connect: rawData.userId
    }
  });
  return ((await client.request(query, { data })) as any).createTrackedQuest;
}

export async function updateUserQuest(
  id: string,
  rawData: Partial<TrackedQuestInput>
): Promise<{ data: TrackedQuest[] }> {
  const query = `
    mutation UpdateUserTrackedQuest ($id: ID!, $data: TrackedQuestInput!){
      updateTrackedQuest(id: $id, data: $data) {
        _id
        questName
        questStarted
        questStep
        questFinished
        questNote
        isActive
        createdAt
        updatedAt
      }
    }
  `;
  const data = embellishUpdate({
    ...rawData
  });
  return ((await client.request(query, { id, data })) as any)
    .updateTrackedQuest;
}
