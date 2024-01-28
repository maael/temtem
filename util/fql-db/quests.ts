import {
  RawCreateInput,
  TrackedQuest,
  TrackedQuestInput
} from "../../types/db";
import { embellishCreate, embellishUpdate, f, query } from "./client";

export async function getUserQuests(userId: string) {
  const result = await query(
    f`Collection('tracked_quests').where(.userId == ${userId}).paginate(500)`
  );
  return { data: result };
}

export async function createUserQuests(
  rawData: RawCreateInput<TrackedQuestInput>
): Promise<{ data: TrackedQuest[] }> {
  const newItem = embellishCreate({
    ...rawData,
    questStarted: true,
    questStep: 0,
    questFinished: false,
    user: rawData.userId
  });
  const result = await query(
    f`Collection('tracked_quests').createData(${newItem})`
  );
  return result;
}

export async function updateUserQuest(
  id: string,
  rawData: Partial<TrackedQuestInput>
): Promise<{ data: TrackedQuest[] }> {
  const { coll: _coll, data: _data, ...update } = rawData as any;
  const result = await query(
    f`Collection('tracked_quests').byId(${id}).updateData(${embellishUpdate(
      update
    )})`
  );
  return result;
}
