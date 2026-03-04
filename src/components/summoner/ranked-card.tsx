import type { RankedEntry, SummonerProfile } from "../../lib/riot-types";
import { capitalize } from "../../lib/utils";
import { RANK_NUMERALS } from "../../lib/constants";
import { Card } from "../ui/card";
import styles from "./ranked-card.module.css";

interface RankedCardProps {
  ranked: RankedEntry | null;
  profile: SummonerProfile;
}

export function RankedCard({ ranked, profile }: RankedCardProps) {
  const tierImg = ranked?.tier
    ? `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/${ranked.tier.toLowerCase()}.png`
    : "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/unranked.png";

  const rankNum = ranked?.rank ? RANK_NUMERALS[ranked.rank] ?? ranked.rank : null;

  return (
    <Card className={styles.card}>
      <img
        className={styles.emblem}
        src={tierImg}
        alt={ranked?.tier ? `${ranked.tier} tier` : "Unranked"}
      />
      <div className={styles.info}>
        {ranked?.tier ? (
          <>
            <span className={styles.queue}>Ranked Solo</span>
            <span className={styles.tier}>
              {capitalize(ranked.tier)} {rankNum}
            </span>
            <span className={styles.lp}>
              {ranked.leaguePoints} LP / {ranked.wins}W {ranked.losses}L
            </span>
            <span className={styles.winrate}>
              Win Rate:{" "}
              {Math.floor(
                (ranked.wins / (ranked.wins + ranked.losses)) * 100,
              )}
              %
            </span>
          </>
        ) : (
          <>
            <span className={styles.queue}>Unranked</span>
            <span className={styles.lp}>No ranked games played</span>
          </>
        )}
        <span className={styles.level}>
          Summoner level: {profile.summonerLevel}
        </span>
      </div>
    </Card>
  );
}
