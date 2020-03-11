export function getIsoString() {
  return new Date().toISOString();
}

export function embellishCreate<T>(data: T) {
  return {
    ...data,
    isActive: true,
    createdAt: getIsoString(),
    updatedAt: getIsoString()
  };
}

export function embellishUpdate<T extends { _id?: any }>(data: T) {
  delete data._id;
  return {
    ...data,
    updatedAt: getIsoString()
  };
}

export function embellishDelete<T>(data: T) {
  return {
    ...data,
    isActive: false,
    deletedAt: getIsoString()
  };
}
