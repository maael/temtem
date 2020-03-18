import useFetch from "./useFetch";
import useCallableFetch from "./useCallableFetch";

export default function useSavedListing() {
  const [saved, savedLoading, _savedError, refetchSaved] = useFetch(
    "/db/exchange/saved",
    {},
    {
      mapper: res => (res && res.data ? res.data : []),
      source: "local",
      defaultValue: []
    }
  );
  const [saveListing] = useCallableFetch(`/db/exchange/saved`, {
    method: "POST"
  });
  function isListingSaved(listing: any) {
    return saved.find(s => s.exchangeListing._id === listing._id);
  }
  const [unsaveListing] = useCallableFetch(
    `/db/exchange/saved`,
    {
      method: "DELETE"
    },
    {
      source: "local"
    }
  );
  return {
    saved,
    savedLoading,
    isListingSaved,
    refetchSaved,
    saveListing,
    unsaveListing
  };
}
