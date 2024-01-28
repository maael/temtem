import client from "./client";
import { embellishCreate, embellishUpdate } from "./util";
import {
  User,
  UserInput,
  UserPartialInput,
  RawCreateInput
} from "../../types/db";

export async function createUser(
  variables: Omit<
    RawCreateInput<UserInput>,
    "goodReviews" | "mixedReviews" | "badReviews"
  >
): Promise<User> {
  const query = `
    mutation CreateUser ($user:UserInput!) {
      createUser(data:$user){
        _id
        redditId
        redditName
        redditIcon
        redditDarkmode
        discordId
        discordName
        discordDiscriminator
        discordFullName
        discordIcon
        temtemName
        steamId
        goodReviews
        mixedReviews
        badReviews
        isActive
        createdAt
      }
    }
  `;

  const user: UserInput = embellishCreate({
    ...variables,
    goodReviews: 0,
    badReviews: 0,
    mixedReviews: 0
  });

  return ((await client.request(query, { user })) as any).createUser;
}

export async function updateUser(
  userId: string,
  rawData: Partial<UserPartialInput>
) {
  const query = `
    mutation UpdateUser ($userId: ID!, $user: UserInput!) {
      updateUser(id:$userId,data:$user) {
        _id
        redditId
        redditName
        redditIcon
        redditDarkmode
        discordId
        discordName
        discordDiscriminator
        discordFullName
        discordIcon
        temtemName
        steamId
        goodReviews
        mixedReviews
        badReviews
        isActive
        createdAt
      }
    }
  `;

  const user = embellishUpdate({
    goodReviews: 0,
    badReviews: 0,
    mixedReviews: 0,
    isActive: true,
    ...rawData
  });

  return ((await client.request(query, { userId, user })) as any).updateUser;
}
