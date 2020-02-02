import { GraphQLClient } from "graphql-request";
import { User, UserInput, UserPartialInput } from "../../types/db";

function getIsoString() {
  return new Date().toISOString();
}

export function getClient() {
  const endpoint = "https://graphql.fauna.com/graphql";
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
  const query = `{
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
  }`;

  const completeVariables: UserInput = {
    ...variables,
    isActive: true,
    createdAt: getIsoString(),
    updatedAt: getIsoString()
  };

  return client.request<User>(query, completeVariables);
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
