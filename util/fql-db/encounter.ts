import { embellishCreate, embellishUpdate, f, query } from "./client";

export async function getUserEncounter(userId: string) {
  const result = await query(
    f`
      Collection("encounter")
        .all()
        .where((e) => e.userId == ${userId})
        .paginate(5000)
    `
  );

  return { data: result };
}

export async function createEncounter(rawData) {
  const { coll: _coll, data: _data, ...data } = rawData as any;
  const result = await query(
    f`Collection('encounter').createData(${embellishCreate(data)})`
  );
  return result;
}

export async function updateEncounter(encounterId: string, rawData) {
  const { coll: _coll, data: _data, ...update } = rawData as any;
  const result = await query(
    f`Collection('encounter').byId(${encounterId}).updateData(${embellishUpdate(
      update
    )})`
  );
  return result;
}

export async function deleteEncounter(encounterId: string) {
  const result = await query(
    f`Collection('encounter').byId(${encounterId})!.delete()`
  );
  return result;
}
