import { GraphQLClient } from "graphql-request";

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

export default client;
