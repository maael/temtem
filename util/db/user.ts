import client from "./client";
import { getIsoString } from "./util";
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
        goodReviews
        mixedReviews
        badReviews
        isActive
        createdAt
      }
    }
  `;

  const user: UserInput = {
    ...variables,
    goodReviews: 0,
    badReviews: 0,
    mixedReviews: 0,
    isActive: true,
    createdAt: getIsoString(),
    updatedAt: getIsoString()
  };

  return (await client.request(query, { user })).createUser;
}

export async function getUser(redditName: string): Promise<User> {
  const query = `
    query UserByRedditName ($redditName:String!) {
      getUserByRedditName(redditName:$redditName){
        _id
        redditId
        redditName
        redditIcon
        redditDarkmode
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

export async function updateUser(variables: UserPartialInput) {
  const query = `{
    update(data:$user){
      _id
      redditName
    }
  }`;

  return client.request<User>(query, variables);
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
