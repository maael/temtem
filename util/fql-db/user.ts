import { embellishCreate, embellishUpdate, f, getList, query } from "./client";
import {
  RawCreateInput,
  User,
  UserInput,
  UserPartialInput
} from "../../types/db";

export async function getUsers() {
  return getList("users");
}

export async function getUser(userId) {
  const result = await query(f`Collection('users').where(.id == ${userId})`);
  return result[0];
}

export async function getUserByRedditName(userId: string): Promise<User> {
  const result = await query(
    f`Collection('users').where(.redditName == ${userId})`
  );
  return result[0];
}

export async function getUserByDiscordName(discordName: string): Promise<User> {
  const result = await query(
    f`Collection('users').where(.discordName == ${discordName})`
  );
  return result[0];
}

export async function getUserByDiscordFullName(
  discordFullName: string
): Promise<User> {
  const result = await query(
    f`Collection('users').where(.discordFullName == ${discordFullName})`
  );
  return result[0];
}

export async function getUserByDiscordId(discordId: string): Promise<User> {
  const result = await query(
    f`Collection('users').where(.discordId == ${discordId})`
  );
  return result[0];
}

export async function updateUser(
  userId: string,
  rawData: Partial<UserPartialInput>
) {
  const { coll: _coll, data: _data, ...update } = rawData as any;
  const result = await query(
    f`Collection('users').byId(${userId}).updateData(${embellishUpdate(
      update
    )})`
  );
  return result;
}

export async function createUser(
  variables: Omit<
    RawCreateInput<UserInput>,
    "goodReviews" | "mixedReviews" | "badReviews"
  >
): Promise<User> {
  const { coll: _coll, data: _data, ...data } = variables as any;
  const result = await query(
    f`Collection('users').createData(${embellishCreate(data)})`
  );
  return result;
}
