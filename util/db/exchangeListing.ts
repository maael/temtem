import client from "./client";
import { embellishCreate, embellishUpdate, embellishDelete } from "./util";
import {
  ExchangeListingInput,
  ExchangeListing,
  RawCreateInput
} from "../../types/db";

export async function createExchangeListing(
  rawData: RawCreateInput<ExchangeListingInput>
): Promise<ExchangeListing> {
  const query = `
    mutation CreateUserExchangeListing ($data:ExchangeListingInput!){
      createExchangeListing(data: $data) {
        _id
        user {
          _id
          redditId
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
    temtemBredTechniques: rawData.temtemBredTechniques || [],
    user: {
      connect: rawData.userId
    }
  });
  return ((await client.request(query, { data })) as any).createExchangeListing;
}

export async function updateExchangeListing(
  listingId: string,
  rawData: Partial<ExchangeListing>
) {
  const query = `
    mutation UpdateUserExchangeListing ($id: ID!, $data:ExchangeListingInput!){
      updateExchangeListing(id: $id, data: $data) {
        _id
        user {
          _id
          redditId
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
  const data = embellishUpdate(
    embellishCreate({
      ...rawData,
      temtemBredTechniques: rawData.temtemBredTechniques || []
    })
  );
  return ((await client.request(query, { id: listingId, data })) as any)
    .updateExchangeListing;
}

export async function setExchangeInactive(
  listingId: string,
  rawData: Partial<ExchangeListing>
) {
  const query = `
    mutation setExchangeInactive ($id: ID!, $data:ExchangeListingInput!){
      updateExchangeListing(id: $id, data: $data) {
        _id
        isActive
        deletedAt
      }
    }
  `;
  const data = embellishDelete(
    embellishCreate({
      ...rawData,
      temtemBredTechniques: rawData.temtemBredTechniques || []
    })
  );
  return ((await client.request(query, { id: listingId, data })) as any)
    .updateExchangeListing;
}
