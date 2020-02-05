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
    query ExchangeListings(type: LISTING, isActive: true) {
      getExchangeListingsByTypeAndActive {
        data {
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
      }
    }
  `;
  return (await client.request(query)).getExchangeListings;
}

export async function getUserExchangeListings(
  userId: string
): Promise<{ data: ExchangeListing[] }> {
  const query = `
    query UserExchangeListings ($userId: ID!) {
      getUserExchangeListingsByType (userId: $userId, type: LISTING) {
        data {
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
      }
    }
  `;
  return (await client.request(query, { userId })).getUserExchangeListings;
}

export async function createExchangeListing(
  rawData: RawCreateInput<ExchangeListingInput>
): Promise<ExchangeListing> {
  const query = `
    mutation CreateUserExchangeListing ($data:ExchangeListingInput!){
      createExchangeListing(data: $data) {
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
        updatedAt
        deletedAt
      }
    }
  `;
  const data = embellishCreate({
    ...rawData,
    user: {
      connect: rawData.userId
    }
  });
  return (await client.request(query, { data })).createExchangeListing;
}
