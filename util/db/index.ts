import { GraphQLClient } from "graphql-request";
import {
  User,
  UserInput,
  UserPartialInput,
  TempediaEntry
} from "../../types/db";

function getIsoString() {
  return new Date().toISOString();
}

export function getClient() {
  const endpoint = "https://graphql.fauna.com/graphql";
  console.info("prepared client with secret", process.env.TEMTEM_FAUNA_SECRET);
  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.TEMTEM_FAUNA_SECRET}`
    }
  });
  return client;
}

const client = getClient();

export async function createUser(
  variables: Omit<UserInput, "isActive" | "createdAt" | "updatedAt">
): Promise<User> {
  const query = `
    mutation CreateUser ($user:UserInput!) {
      createUser(data:$user){
        deletedAt
        updatedAt
        _id
        redditName
        redditDarkmode
        redditId
        createdAt
        isActive
        redditIcon
      }
    }
  `;

  const user: UserInput = {
    ...variables,
    isActive: true,
    createdAt: getIsoString(),
    updatedAt: getIsoString()
  };

  return (await client.request(query, { user })).createUser;
}

export async function getUser(redditName: string): Promise<User> {
  const query = `
    query UserByRedditName ($redditName:String!) {
      userByRedditName(redditName:$redditName){
        deletedAt
        updatedAt
        _id
        redditName
        redditDarkmode
        redditId
        createdAt
        isActive
        redditIcon
      }
    }
  `;
  return (await client.request(query, { redditName })).userByRedditName;
}

export async function updateUser(variables: UserPartialInput) {
  const query = `{
    update(data:$user){
      _id
      redditName
    }
  }`;

  return client.request<User>(query, variables);
}

export function getUsers() {}

export async function getTempediaEntries(
  user: string
): Promise<{ data: TempediaEntry[] }> {
  const query = `
    query UserTempediaEntries ($user:ID!){
      userTempediaEntries(userId:$user) {
        data {
          _id
          temtemName
        }
      }
    }
  `;
  return (await client.request(query, { user })).userTempediaEntries;
}

export async function createTempediaEntry(
  userId: string,
  temtemName: string
): Promise<TempediaEntry> {
  const query = `
    mutation CreateUserTempediaEntry ($data:TempediaEntryInput!){
      createTempediaEntry(data:$data) {
        _id
        temtemName
      }
    }
  `;
  const data = {
    userId,
    temtemName,
    isActive: true,
    createdAt: getIsoString(),
    updatedAt: getIsoString()
  };
  try {
    return (await client.request(query, { data })).createTempediaEntry;
  } catch (e) {
    console.error(e);
    return undefined as any;
  }
}
