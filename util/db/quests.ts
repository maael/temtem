import client from "./client";
import { embellishCreate } from "./util";
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
          user {
            _id
            redditName
            redditIcon
          }
          questName
          questStarted
          questFinished
          questNote
          isActive
          createdAt
          updatedAt
        }
      }
    }
  `;
  return (await client.request(query, { userId })).getUserTrackedQuests;
}

export async function createUserQuests(
  rawData: RawCreateInput<TrackedQuestInput>
): Promise<{ data: TrackedQuest[] }> {
  const query = `
    mutation CreateUserTrackedQuest ($data: TrackedQuestInput!){
      createTrackedQuest(data: $data) {
        _id
        user {
          _id
          redditName
          redditIcon
        }
        questName
        questStarted
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
    user: {
      connect: rawData.userId
    }
  });
  return (await client.request(query, { data })).createTrackedQuest;
}
