import client from "./client";
import { embellishCreate } from "./util";
import {
  TempediaEntry,
  TempediaEntryInput,
  RawCreateInput
} from "../../types/db";

export async function getTempediaEntries(
  user: string
): Promise<{ data: TempediaEntry[] }> {
  const query = `
    query UserTempediaEntries ($user:ID!){
      userTempediaEntries(userId:$user) {
        data {
          _id
          temtemName
          createdAt
        }
      }
    }
  `;
  return (await client.request(query, { user })).userTempediaEntries;
}

export async function createTempediaEntry({
  userId,
  temtemName
}: RawCreateInput<TempediaEntryInput>): Promise<TempediaEntry> {
  const query = `
    mutation CreateUserTempediaEntry ($data:TempediaEntryInput!){
      createTempediaEntry(data:$data) {
        _id
        temtemName
      }
    }
  `;
  const data = embellishCreate({
    userId,
    temtemName
  });
  try {
    return (await client.request(query, { data })).createTempediaEntry;
  } catch (e) {
    console.error(e);
    return { error: e.message } as any;
  }
}
