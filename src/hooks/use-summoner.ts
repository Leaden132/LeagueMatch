import { useQuery } from "@tanstack/react-query";
import { lambdaFetch } from "../lib/api";
import type { RiotAccount, SummonerProfile } from "../lib/riot-types";
import { DEFAULT_REGION } from "../lib/constants";

interface AccountResponse {
  puuid: string;
  gameName: string;
  tagName: string;
}

interface SummonerIdResponse {
  id: string;
  accountId: string;
  puuid: string;
  profileIconId: number;
  summonerLevel: number;
}

async function fetchSummoner(
  gameName: string,
  tagLine: string,
): Promise<{ account: RiotAccount; profile: SummonerProfile }> {
  // Step 1: Get PUUID from gameName#tagLine
  const accountData = await lambdaFetch<AccountResponse>({
    apiName: "summonersByName",
    apiParam: encodeURI(gameName),
    tagName: tagLine || DEFAULT_REGION,
  });

  const puuid = accountData.puuid;

  // Step 2: Get summoner profile from PUUID
  const summonerData = await lambdaFetch<SummonerIdResponse>({
    apiName: "getSummonerId",
    apiParam: puuid,
  });

  return {
    account: {
      puuid,
      gameName: accountData.gameName,
      tagLine: accountData.tagName,
    },
    profile: {
      id: summonerData.id,
      accountId: summonerData.accountId,
      puuid,
      profileIconId: summonerData.profileIconId,
      revisionDate: 0,
      summonerLevel: summonerData.summonerLevel,
    },
  };
}

export function useSummoner(gameName: string, tagLine: string) {
  return useQuery({
    queryKey: ["summoner", gameName, tagLine],
    queryFn: () => fetchSummoner(gameName, tagLine),
    enabled: !!gameName,
  });
}
