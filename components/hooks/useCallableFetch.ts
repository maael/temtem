import { useEffect, useState } from "react";

export type FetchSource = "temtem-api" | "local" | "custom";

export interface Options<T> {
  source: FetchSource;
  defaultValue?: T;
  mapper?: (v: any) => T;
}

const sourcePrefixMap: Record<FetchSource, string> = {
  "temtem-api": "https://temtem-api.mael.tech/api",
  local: "/api",
  custom: ""
};

export default function useCallableFetch<T>(
  path: string,
  options: RequestInit = {},
  customOptions: Options<T> = { source: "local" }
): [
  (requestInit: RequestInit) => Promise<void>,
  T,
  boolean,
  string | undefined
] {
  const [data, setData] = useState(customOptions.defaultValue as T);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  async function callFetch(requestInit: RequestInit) {
    try {
      const res = await fetch(
        `${sourcePrefixMap[customOptions.source]}${path}`,
        {
          credentials:
            customOptions.source === "local" ? "include" : options.credentials,
          ...options,
          ...requestInit,
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
            ...requestInit.headers
          }
        }
      );
      if (res.ok) {
        const json = await res.json();
        setData(customOptions.mapper ? customOptions.mapper(json) : json);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }
  return [callFetch, data, loading, error];
}
