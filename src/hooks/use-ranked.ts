import { useQuery } from "@tanstack/react-query";
import { lambdaFetch } from "../lib/api";
import type { RankedEntry } from "../lib/riot-types";

export function useRanked(summonerId: string | undefined) {
  return useQuery({
    queryKey: ["ranked", summonerId],
    queryFn: () =>
      lambdaFetch<RankedEntry | RankedEntry[]>({
        apiName: "entriesBySummoner",
        apiParam: summonerId!,
      }),
    enabled: !!summonerId,
  });
}
