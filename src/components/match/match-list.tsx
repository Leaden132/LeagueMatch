import type {
  MatchInfo,
  DDragonChampion,
  DDragonItem,
  DDragonRune,
} from "../../lib/riot-types";
import { MatchCard } from "./match-card";
import styles from "./match-list.module.css";

interface MatchListProps {
  matches: (MatchInfo & { matchId: string })[];
  puuid: string;
  champMap: Record<string, DDragonChampion>;
  itemMap: Record<string, DDragonItem>;
  runeData: DDragonRune[];
  version: string;
}

export function MatchList({
  matches,
  puuid,
  champMap,
  itemMap,
  runeData,
  version,
}: MatchListProps) {
  if (matches.length === 0) {
    return <p className={styles.empty}>No matches found.</p>;
  }

  return (
    <div className={styles.list}>
      {matches.map((match) => (
        <MatchCard
          key={match.matchId}
          match={match}
          puuid={puuid}
          champMap={champMap}
          itemMap={itemMap}
          runeData={runeData}
          version={version}
        />
      ))}
    </div>
  );
}
