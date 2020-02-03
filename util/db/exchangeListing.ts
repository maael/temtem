import client from "./client";
import { embellishCreate } from "./util";
import {
  ExchangeListingInput,
  ExchangeListing,
  RawCreateInput
} from "../../types/db";

export async function getExchangeListings(): Promise<{
  data: ExchangeListing[];
}> {
  const query = `
    query ExchangeListings {
      exchangeListings {
        data {
          _id
          userId
          temtem {
            name
            gender
            fertility
            trait
            bredTechniques
            svs {
              hp
              sta
              spd
              atk
              def
              spatk
              spdef
            }
          }
          request {
            cost
            details
          }
          isActive
          createdAt
          updatedAt
          deletedAt
        }
      }
    }
  `;
  return (await client.request(query)).exchangeListings;
}

export async function getUserExchangeListings(
  userId: string
): Promise<{ data: ExchangeListing[] }> {
  const query = `
    query UserExchangeListings ($userId: ID!) {
      userExchangeListings (userId: $userId) {
        data {
          _id
          userId
          temtem {
            name
            gender
            fertility
            trait
            bredTechniques
            svs {
              hp
              sta
              spd
              atk
              def
              spatk
              spdef
            }
          }
          request {
            cost
            details
          }
          isActive
          createdAt
          updatedAt
          deletedAt
        }
      }
    }
  `;
  return (await client.request(query, { userId })).userExchangeListings;
}

export async function createExchangeListing(
  rawData: RawCreateInput<ExchangeListingInput>
): Promise<ExchangeListing> {
  const query = `
    mutation CreateUserExchangeListing ($data:ExchangeListingInput!){
      createExchangeListing(data: $data) {
        _id
        userId
        temtem {
          name
          gender
          fertility
          trait
          bredTechniques
          svs {
            hp
            sta
            spd
            atk
            def
            spatk
            spdef
          }
        }
        request {
          cost
          details
        }
        isActive
        createdAt
        updatedAt
        deletedAt
      }
    }
  `;
  const data = embellishCreate(rawData);
  return (await client.request(query, { data })).createExchangeListing;
}
