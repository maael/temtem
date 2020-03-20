import client from "./client";
import { embellishCreate, embellishUpdate } from "./util";

const encounterFields = `
  _id
  userId
  user {
    redditId
    redditName
    redditIcon
    discordName
    discordDiscriminator
    discordIcon
  }
  temtemName
  isLuma
  wasCaught
  trait
  location
  createdAt
  updatedAt
`;

export async function createEncounter(rawData) {
  const data = embellishCreate({
    ...rawData,
    user: {
      connect: rawData.userId
    }
  });
  delete data.isActive;
  const query = `
    mutation CreateEncounter ($data: EncounterInput!) {
      createEncounter (data: $data) {
        ${encounterFields}
      }
    }
  `;
  return (await client.request(query, { data })).createEncounter;
}

export async function updateEncounter(encounterId: string, rawData) {
  const data = embellishUpdate(rawData);
  delete data.isActive;
  const query = `
    mutation UpdateEncounter ($encounterId: ID!, $data: EncounterInput!) {
      updateEncounter (id: $encounterId data: $data) {
        ${encounterFields}
      }
    }
  `;
  return (await client.request(query, { encounterId, data })).updateEncounter;
}

export async function deleteEncounter(encounterId: string) {
  const query = `
    mutation DeleteEncounter ($encounterId: ID!) {
      deleteEncounter (id: $encounterId) {
        ${encounterFields}
      }
    }
  `;
  return (await client.request(query, { encounterId })).deleteEncounter;
}

export async function getUserEncounter(userId: string) {
  const query = `
    query GetUserEncounters ($userId: ID!) {
      getUserEncounters (_size: 10000, userId: $userId) {
        data {
          ${encounterFields}
        }
      }
    }
  `;
  return (await client.request(query, { userId })).getUserEncounters;
}
