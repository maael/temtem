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

export default function useFetch<T>(
  path: string,
  options: RequestInit = {},
  customOptions: Options<T> = { source: "local" },
  dependencies: any[] = []
): [T, boolean, string | undefined, () => Promise<void>] {
  const [data, setData] = useState(customOptions.defaultValue as T);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  async function refetch() {
    setLoading(true);
    setError(undefined);
    try {
      const res = await fetch(
        `${sourcePrefixMap[customOptions.source]}${path}`,
        {
          credentials:
            customOptions.source === "local" ? "include" : options.credentials,
          ...options,
          headers: {
            "Content-Type": "application/json",
            ...options.headers
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
  useEffect(() => {
    refetch().catch(e => console.error(e));
  }, dependencies);
  return [data, loading, error, refetch];
}
