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
      userExchangeSaved(userId: $userId) {
        data {
          _id
          userId
          exchangeListId
          isActive
          createdAt
          updatedAt
          deletedAt
        }
      }
    }
  `;
  return (await client.request(query, { userId })).userExchangeSaved;
}

export async function createExchangeSaved(
  rawData: RawCreateInput<ExchangeSavedInput>
): Promise<ExchangeSaved> {
  const query = `
    mutation CreateUserExchangeSaved ($data: ExchangeSavedInput!){
      createExchangeSaved(data: $data) {
        _id
        userId
        exchangeListId
        isActive
        createdAt
        updatedAt
        deletedAt
      }
    }
  `;
  const data = embellishCreate(rawData);
  return (await client.request(query, { data })).createExchangeSaved;
}
