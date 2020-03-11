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

export function embellishUpdate<T>(data: T) {
  delete (data as any)._id;
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
