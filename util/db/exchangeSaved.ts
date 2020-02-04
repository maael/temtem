import client from "./client";
import { embellishCreate } from "./util";
import {
  ExchangeSavedInput,
  ExchangeSaved,
  RawCreateInput
} from "../../types/db";

export async function getExchangeSaved(
  userId: string
): Promise<{ data: ExchangeSaved[] }> {
  const query = `
    query UserExchangeSaved ($userId: ID!){
      getUserExchangeSaved(userId: $userId) {
        data {
          _id
          user {
            _id
            redditName
            redditIcon
          }
          exchangeListing {
            _id
          }
          isActive
          createdAt
          updatedAt
        }
      }
    }
  `;
  return (await client.request(query, { userId })).getUserExchangeSaved;
}

export async function createExchangeSaved(
  rawData: RawCreateInput<ExchangeSavedInput>
): Promise<ExchangeSaved> {
  const query = `
    mutation CreateUserExchangeSaved ($data: ExchangeSavedInput!){
      createExchangeSaved(data: $data) {
        _id
        user {
          _id
          redditName
          redditIcon
        }
        exchangeListing {
          _id
        }
        isActive
        createdAt
        updatedAt
      }
    }
  `;
  const data = embellishCreate({
    ...rawData,
    user: {
      connect: rawData.userId
    }
  });
  return (await client.request(query, { data })).createExchangeSaved;
}
