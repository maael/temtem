import client from "./client";
import { getIsoString } from "./util";
import { User, UserInput, UserPartialInput } from "../../types/db";

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
