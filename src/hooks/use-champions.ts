import { useQuery } from "@tanstack/react-query";
import { fetchChampions, fetchChampionDetail } from "../lib/ddragon";
import { useDDragonVersion } from "./use-ddragon-version";

export function useChampions() {
  const { data: version } = useDDragonVersion();

  return useQuery({
    queryKey: ["champions", version],
    queryFn: () => fetchChampions(version!),
    enabled: !!version,
    staleTime: Infinity,
  });
}

export function useChampionDetail(champId: string | undefined) {
  const { data: version } = useDDragonVersion();

  return useQuery({
    queryKey: ["champion-detail", version, champId],
    queryFn: () => fetchChampionDetail(version!, champId!),
    enabled: !!version && !!champId,
    staleTime: Infinity,
  });
}
