import { useParams } from "react-router";
import { useSummoner } from "../hooks/use-summoner";
import { useRanked } from "../hooks/use-ranked";
import { useMastery } from "../hooks/use-mastery";
import { useMatches } from "../hooks/use-matches";
import { useChampions } from "../hooks/use-champions";
import { useItems } from "../hooks/use-items";
import { useRunes } from "../hooks/use-runes";
import { useDDragonVersion } from "../hooks/use-ddragon-version";
import { championIdToName } from "../lib/converters";
import { championSplashUrl } from "../lib/ddragon";
import { RankedCard } from "../components/summoner/ranked-card";
import { MasteryList } from "../components/summoner/mastery-list";
import { MatchList } from "../components/match/match-list";
import { TooltipProvider } from "../components/ui/tooltip";
import { LoadingScreen } from "../components/ui/loading";
import type { RankedEntry } from "../lib/riot-types";
import styles from "./summoner.module.css";

export default function Summoner() {
  const { gameName = "", tagLine = "NA1" } = useParams();
  const { data: version } = useDDragonVersion();

  const { data: summoner, isLoading: summonerLoading, error: summonerError } =
    useSummoner(gameName, tagLine);

  const puuid = summoner?.account.puuid;

  // These fire in parallel once we have the puuid
  const { data: rankedData } = useRanked(puuid);
  const { data: masteries } = useMastery(puuid);
  const { matches, isLoading: matchesLoading } = useMatches(puuid);
  const { data: champMap } = useChampions();
  const { data: itemMap } = useItems();
  const { data: runeData } = useRunes();

  if (summonerLoading) return <LoadingScreen />;

  if (summonerError) {
    return (
      <div className={styles.error}>
        <h4>
          This username is not registered in League of Legends. Please try
          another name.
        </h4>
      </div>
    );
  }

  if (!summoner || !version || !champMap || !itemMap || !runeData) {
    return <LoadingScreen />;
  }

  const ranked: RankedEntry | null = Array.isArray(rankedData)
    ? rankedData[0] ?? null
    : rankedData ?? null;

  // Background splash from top mastery champion
  const topChampName =
    masteries?.[0]
      ? championIdToName(masteries[0].championId, champMap)
      : null;
  const bgStyle = topChampName
    ? {
        backgroundImage: `linear-gradient(rgba(11,17,32,0.6) 0%, rgba(11,17,32,0.85) 60%, rgba(11,17,32,0.95) 100%), url("${championSplashUrl(topChampName)}")`,
        backgroundAttachment: "fixed" as const,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : undefined;

  return (
    <TooltipProvider>
      <section className={styles.page} style={bgStyle}>
        <div className={`wrapper ${styles.content}`}>
          <div className={styles.header}>
            <h2 className={styles.title}>
              {summoner.account.gameName}
              <span className={styles.tag}>#{summoner.account.tagLine}</span>
            </h2>
          </div>

          <div className={styles.layout}>
            <aside className={styles.sidebar}>
              <RankedCard ranked={ranked} profile={summoner.profile} />
              {masteries && (
                <MasteryList
                  masteries={masteries}
                  champMap={champMap}
                  version={version}
                />
              )}
            </aside>

            <main className={styles.main}>
              <h3 className={styles.sectionTitle}>Match History</h3>
              {matchesLoading ? (
                <LoadingScreen />
              ) : (
                <MatchList
                  matches={matches}
                  puuid={summoner.account.puuid}
                  champMap={champMap}
                  itemMap={itemMap}
                  runeData={runeData}
                  version={version}
                />
              )}
            </main>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}
