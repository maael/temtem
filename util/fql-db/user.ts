import { f, getList, query } from "./client";
import { User } from "../../types/db";

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
