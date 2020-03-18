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

  return (await client.request(query, { user })).createUser;
}

export async function getUserByDiscordName(discordName: string): Promise<User> {
  const query = `
    query UserByDiscordName ($discordName:String!) {
      getUserByDiscordName(discordName:$discordName){
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
        goodReviews
        mixedReviews
        badReviews
        isActive
        createdAt
      }
    }
  `;
  return (await client.request(query, { discordName })).getUserByDiscordName;
}

export async function getUserByDiscordFullName(
  discordFullName: string
): Promise<User> {
  const query = `
    query UserByDiscordFullName ($discordFullName:String!) {
      getUserByDiscordFullName(discordFullName:$discordFullName){
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
        goodReviews
        mixedReviews
        badReviews
        isActive
        createdAt
      }
    }
  `;
  return (await client.request(query, { discordFullName }))
    .getUserByDiscordFullName;
}

export async function getUserByDiscordId(discordId: string): Promise<User> {
  const query = `
    query UserByDiscordId ($discordId:String!) {
      getUserByDiscordId(discordId:$discordId){
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
        goodReviews
        mixedReviews
        badReviews
        isActive
        createdAt
      }
    }
  `;
  return (await client.request(query, { discordId })).getUserByDiscordId;
}

export async function getUser(userId: string): Promise<User> {
  const query = `
    query GetUser ($userId:ID!) {
      findUserByID(id:$userId){
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
        goodReviews
        mixedReviews
        badReviews
        isActive
        createdAt
      }
    }
  `;
  return (await client.request(query, { userId })).findUserByID;
}

export async function getUserByRedditName(redditName: string): Promise<User> {
  const query = `
    query UserByRedditName ($redditName:String!) {
      getUserByRedditName(redditName:$redditName){
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
        goodReviews
        mixedReviews
        badReviews
        isActive
        createdAt
      }
    }
  `;
  return (await client.request(query, { redditName })).getUserByRedditName;
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

  return (await client.request(query, { userId, user })).updateUser;
}

export async function getUsers() {
  const query = `
  query Users {
    getUsers (_size: 10000){
      data {
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
        goodReviews
        mixedReviews
        badReviews
        isActive
        createdAt
      }
    }
  }
`;
  return (await client.request(query)).getUsers;
}
