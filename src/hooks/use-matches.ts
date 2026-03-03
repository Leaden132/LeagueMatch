import { useQuery, useQueries } from "@tanstack/react-query";
import { lambdaFetch } from "../lib/api";
import type { MatchInfo } from "../lib/riot-types";

function useMatchIds(puuid: string | undefined, count: number) {
  return useQuery({
    queryKey: ["match-ids", puuid, count],
    queryFn: () =>
      lambdaFetch<string[]>({
        apiName: "matchByAccounts",
        apiParam: puuid!,
      }),
    enabled: !!puuid,
    select: (ids) => ids.slice(0, count),
  });
}

interface MatchResponse {
  info: MatchInfo;
  metadata: { matchId: string; participants: string[] };
}

export function useMatches(puuid: string | undefined, count = 10) {
  const { data: matchIds, isLoading: idsLoading } = useMatchIds(puuid, count);

  const matchQueries = useQueries({
    queries: (matchIds ?? []).map((matchId) => ({
      queryKey: ["match-detail", matchId],
      queryFn: () =>
        lambdaFetch<MatchResponse>({
          apiName: "matches",
          apiParam: matchId,
        }),
      staleTime: Infinity,
    })),
  });

  const isLoading =
    idsLoading || matchQueries.some((q) => q.isLoading);
  const matches = matchQueries
    .filter((q) => q.data)
    .map((q) => ({
      matchId: q.data!.metadata.matchId,
      ...q.data!.info,
    }))
    .sort((a, b) => b.gameCreation - a.gameCreation);

  return { matches, isLoading };
}
