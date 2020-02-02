import { GraphQLClient } from "graphql-request";
import { User, UserInput, UserPartialInput } from "../../types/db";

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
) {
  const query = `
    query CreateUser ($user:UserInput!) {
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

  return client.request<User>(query, { user });
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
