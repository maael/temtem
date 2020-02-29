export function getIsoString() {
  return new Date().toISOString();
}

export function embellishCreate(data: any) {
  return {
    ...data,
    isActive: true,
    createdAt: getIsoString(),
    updatedAt: getIsoString()
  };
}

export function embellishUpdate(data: any) {
  delete data._id;
  return {
    ...data,
    updatedAt: getIsoString()
  };
}

export function embellishDelete(data: any) {
  return {
    ...data,
    isActive: false,
    deletedAt: getIsoString()
  };
}
