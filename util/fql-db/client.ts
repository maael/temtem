import { Client, Query, fql } from "fauna";

export const f = fql;

export const faunaClient = new Client({
  secret: process.env.TEMTEM_FAUNA_SECRET!
});

export async function query(fqlFragment: Query) {
  const result = await faunaClient.query<any>(fqlFragment);
  return result.data.data.map(mapId);
}

export async function getList(collection: string) {
  return {
    data: await query(fql`Collection(${collection}).all().paginate(5000)`)
  };
}

function mapId(u) {
  return {
    ...u,
    _id: u.id
  };
}
