import client from "./client";
import { embellishCreate } from "./util";
import {
  TempediaEntry,
  TempediaEntryInput,
  RawCreateInput
} from "../../types/db";

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
    temtemName,
    user: {
      connect: userId
    }
  });
  try {
    return ((await client.request(query, { data })) as any).createTempediaEntry;
  } catch (e) {
    console.error(e);
    return { error: e.message } as any;
  }
}

export async function deleteTempediaEntry(id: string) {
  const query = `
    mutation DeleteUserTempediaEntry ($id:ID!){
      deleteTempediaEntry(id:$id) {
        _id
      }
    }
  `;
  try {
    return ((await client.request(query, { id })) as any).deleteTempediaEntry;
  } catch (e) {
    console.error(e);
    return { error: e.message } as any;
  }
}
