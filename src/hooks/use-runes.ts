import { useQuery } from "@tanstack/react-query";
import { fetchRunes } from "../lib/ddragon";
import { useDDragonVersion } from "./use-ddragon-version";

export function useRunes() {
  const { data: version } = useDDragonVersion();

  return useQuery({
    queryKey: ["runes", version],
    queryFn: () => fetchRunes(version!),
    enabled: !!version,
    staleTime: Infinity,
  });
}
