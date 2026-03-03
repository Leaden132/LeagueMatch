import { useQuery } from "@tanstack/react-query";
import { getLatestVersion } from "../lib/ddragon";

export function useDDragonVersion() {
  return useQuery({
    queryKey: ["ddragon-version"],
    queryFn: getLatestVersion,
    staleTime: Infinity,
  });
}
