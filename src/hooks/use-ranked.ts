import { useQuery } from "@tanstack/react-query";
import { lambdaFetch } from "../lib/api";
import type { RankedEntry } from "../lib/riot-types";

export function useRanked(puuid: string | undefined) {
  return useQuery({
    queryKey: ["ranked", puuid],
    queryFn: () =>
      lambdaFetch<RankedEntry[]>({
        apiName: "entriesBySummoner",
        apiParam: puuid!,
      }),
    enabled: !!puuid,
  });
}
