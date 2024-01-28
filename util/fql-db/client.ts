import { Client, Query, fql } from "fauna";

export const f = fql;

export const faunaClient = new Client({
  secret: process.env.TEMTEM_FAUNA_SECRET!
});

export async function query(fqlFragment: Query) {
  const result = await faunaClient.query<any>(fqlFragment);
  return result.data.data && Array.isArray(result.data.data)
    ? result.data.data.map(mapSafe)
    : mapSafe(result.data);
}

export async function getList(collection: string) {
  return {
    data: await query(fql`Collection(${collection}).all().paginate(5000)`)
  };
}

export function mapSafe(u) {
  return {
    ...u,
    createdAt: u.createdAt
      ? u.createdAt.isoString || u.createdAt.ts
      : undefined,
    updatedAt: u.updatedAt
      ? u.updatedAt.isoString || u.updatedAt.ts
      : undefined,
    ts: u.ts ? u.ts.isoString : undefined,
    _id: u.id,
    coll: undefined
  };
}

export function getIsoString() {
  return new Date().toISOString();
}

export function embellishCreate<T>(
  data: T
): T & {
  createdAt: { isoString: string };
  updatedAt: { isoString: string };
  isActive: boolean;
} {
  return {
    createdAt: {
      isoString: getIsoString()
    },
    updatedAt: {
      isoString: getIsoString()
    },
    ...data,
    isActive: true
  };
}

export function embellishUpdate<T>(data: T) {
  delete (data as any)._id;
  const update = {
    ...data,
    updatedAt: {
      isoString: getIsoString()
    }
  };
  if (
    (update as any).createdAt &&
    typeof (update as any).createdAt === "string"
  ) {
    (update as any).createdAt = {
      isoString: (update as any).createdAt
    };
  }
  return update;
}

export function embellishDelete<T>(data: T) {
  return {
    ...data,
    isActive: false,
    deletedAt: {
      isoString: getIsoString()
    }
  };
}
