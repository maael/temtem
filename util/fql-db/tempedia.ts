import {
  RawCreateInput,
  TempediaEntry,
  TempediaEntryInput
} from "../../types/db";
import { embellishCreate, f, query } from "./client";

export async function getTempediaEntries(userId: string) {
  const result = await query(
    f`Collection('tempedia_entries').where(.userId == ${userId}).paginate(500)`
  );
  return { data: result };
}

export async function createTempediaEntry({
  userId,
  temtemName
}: RawCreateInput<TempediaEntryInput>): Promise<TempediaEntry> {
  const newItem = embellishCreate({
    userId,
    temtemName,
    user: {
      connect: userId
    }
  });
  const result = await query(
    f`Collection('tempedia_entries').createData(${newItem})`
  );
  return result;
}

export async function deleteTempediaEntry(id: string) {
  const result = await query(
    f`Collection('tempedia_entries').byId(${id})!.delete()`
  );
  return result;
}
