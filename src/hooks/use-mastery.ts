import { useQuery } from "@tanstack/react-query";
import { lambdaFetch } from "../lib/api";
import type { ChampionMastery } from "../lib/riot-types";

export function useMastery(puuid: string | undefined) {
  return useQuery({
    queryKey: ["mastery", puuid],
    queryFn: () =>
      lambdaFetch<ChampionMastery[]>({
        apiName: "championMastery",
        apiParam: puuid!,
      }),
    enabled: !!puuid,
    select: (data) => data.slice(0, 10),
  });
}
