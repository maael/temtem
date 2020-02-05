import client from "./client";
import { embellishCreate, embellishUpdate, embellishDelete } from "./util";
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
      getExchangeListingsByTypeAndActive(type: LISTING, isActive: true, _size: 10000) {
        data {
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
      }
    }
  `;
  return (await client.request(query)).getExchangeListingsByTypeAndActive;
}

export async function getUserExchangeListings(
  userId: string
): Promise<{ data: ExchangeListing[] }> {
  const query = `
    query UserExchangeListings ($userId: ID!) {
      getUserExchangeListingsByType (userId: $userId, type: LISTING, _size: 10000) {
        data {
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
      }
    }
  `;
  return (await client.request(query, { userId }))
    .getUserExchangeListingsByType;
}

export async function createExchangeListing(
  rawData: RawCreateInput<ExchangeListingInput>
): Promise<ExchangeListing> {
  const query = `
    mutation CreateUserExchangeListing ($data:ExchangeListingInput!){
      createExchangeListing(data: $data) {
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
  console.info(data);
  return (await client.request(query, { data })).createExchangeListing;
}

export async function getExchangeListing(listingId: string) {
  const query = `
  query UserExchangeListings ($listingId: ID!) {
    findExchangeListingByID (id: $listingId) {
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
  }
`;
  return (await client.request(query, { listingId })).findExchangeListingByID;
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
  return (await client.request(query, { id: listingId, data }))
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
  return (await client.request(query, { id: listingId, data }))
    .updateExchangeListing;
}
