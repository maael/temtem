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
      getUserExchangeSaved(userId: $userId, _size: 10000) {
        data {
          _id
          user {
            _id
            redditName
            redditIcon
          }
          exchangeListing {
            _id
            user {
              _id
              redditName
              redditIcon
            }
            type
            temtemName
            temtemGender
            temtemFertility
            temtemTrait
            temtemBredTechniques
            temtemIsLuma
            svHp
            svSta
            svSpd
            svAtk
            svDef
            svSpatk
            svSpdef
            requestCost
            requestDetails
            isActive
            createdAt
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
    },
    exchangeListing: {
      connect: rawData.exchangeListingId
    }
  });
  return (await client.request(query, { data })).createExchangeSaved;
}

export async function deleteExchangeSaved(id: string) {
  const query = `
    mutation DeleteExchangeSaved ($id:ID!){
      deleteExchangeSaved(id:$id) {
        _id
      }
    }
  `;
  try {
    return (await client.request(query, { id })).deleteExchangeSaved;
  } catch (e) {
    console.error(e);
    return { error: e.message } as any;
  }
}
