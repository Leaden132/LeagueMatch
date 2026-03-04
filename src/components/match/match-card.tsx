import { Link } from "react-router";
import type {
  MatchInfo,
  MatchParticipant,
  DDragonChampion,
  DDragonItem,
  DDragonRune,
} from "../../lib/riot-types";
import { championIdToName, runeIdToIcon, spellIdToName } from "../../lib/converters";
import {
  championImageUrl,
  spellImageUrl,
  runeIconUrl,
} from "../../lib/ddragon";
import { relativeTime, formatDuration, formatKda, formatGameMode } from "../../lib/utils";
import { ItemsGrid } from "./items-grid";
import { Card } from "../ui/card";
import styles from "./match-card.module.css";

interface MatchCardProps {
  match: MatchInfo & { matchId: string };
  puuid: string;
  champMap: Record<string, DDragonChampion>;
  itemMap: Record<string, DDragonItem>;
  runeData: DDragonRune[];
  version: string;
}

export function MatchCard({
  match,
  puuid,
  champMap,
  itemMap,
  runeData,
  version,
}: MatchCardProps) {
  const player = match.participants.find((p) => p.puuid === puuid);
  if (!player) return null;

  const win = player.win;
  const champName = championIdToName(player.championId, champMap);
  const kda = formatKda(player.kills, player.deaths, player.assists);
  const mainRuneIcon = runeIdToIcon(
    player.perks?.styles?.[0]?.selections?.[0]?.perk ?? 0,
    runeData,
  );
  const subRuneIcon = runeIdToIcon(
    player.perks?.styles?.[1]?.style ?? 0,
    runeData,
  );

  const team1 = match.participants.slice(0, 5);
  const team2 = match.participants.slice(5, 10);

  return (
    <Card variant={win ? "win" : "loss"} className={styles.card}>
      {/* Meta info */}
      <div className={styles.meta}>
        <span className={styles.mode}>{formatGameMode(match.gameMode)}</span>
        <span className={win ? styles.win : styles.loss}>
          {win ? "Victory" : "Defeat"}
        </span>
        <span className={styles.time}>{relativeTime(match.gameCreation)}</span>
        <span className={styles.duration}>
          {formatDuration(match.gameDuration)}
        </span>
      </div>

      <div className={styles.body}>
        {/* Player info */}
        <div className={styles.playerSection}>
          <div className={styles.champArea}>
            <Link to={`/champions/${champName}`}>
              <img
                src={championImageUrl(version, champName)}
                alt={champName}
                className={styles.champImg}
              />
            </Link>
            <span className={styles.champName}>{champName}</span>
          </div>

          <div className={styles.spells}>
            <img
              src={spellImageUrl(version, spellIdToName(player.summoner1Id))}
              alt="spell 1"
              className={styles.spellImg}
            />
            <img
              src={spellImageUrl(version, spellIdToName(player.summoner2Id))}
              alt="spell 2"
              className={styles.spellImg}
            />
          </div>

          <div className={styles.runes}>
            <img
              src={runeIconUrl(mainRuneIcon)}
              alt="main rune"
              className={styles.runeImg}
            />
            <img
              src={runeIconUrl(subRuneIcon)}
              alt="sub rune"
              className={styles.subRuneImg}
            />
          </div>

          <div className={styles.kdaBlock}>
            <span className={styles.kdaLabel}>K/D/A</span>
            <span className={styles.kdaScore}>
              {player.kills} / {player.deaths} / {player.assists}
            </span>
            <span className={styles.kdaRatio}>{kda}</span>
          </div>

          <div className={styles.stats}>
            <span>Lv {player.champLevel}</span>
            <span>{player.totalMinionsKilled} CS</span>
          </div>

          <ItemsGrid player={player} itemMap={itemMap} version={version} />
        </div>

        {/* All players */}
        <div className={styles.teams}>
          <TeamColumn
            players={team1}
            champMap={champMap}
            version={version}
            puuid={puuid}
          />
          <TeamColumn
            players={team2}
            champMap={champMap}
            version={version}
            puuid={puuid}
          />
        </div>
      </div>
    </Card>
  );
}

function TeamColumn({
  players,
  champMap,
  version,
  puuid,
}: {
  players: MatchParticipant[];
  champMap: Record<string, DDragonChampion>;
  version: string;
  puuid: string;
}) {
  return (
    <div className={styles.team}>
      {players.map((p) => {
        const name = championIdToName(p.championId, champMap);
        const displayName = p.riotIdGameName || p.summonerName;
        const isCurrentPlayer = p.puuid === puuid;
        return (
          <div
            key={p.puuid}
            className={`${styles.teamPlayer} ${isCurrentPlayer ? styles.currentPlayer : ""}`}
          >
            <Link to={`/champions/${name}`}>
              <img
                src={championImageUrl(version, name)}
                alt={name}
                className={styles.teamChampImg}
              />
            </Link>
            <Link
              to={`/summoner/${encodeURIComponent(displayName)}/${encodeURIComponent(p.riotIdTagline || "NA1")}`}
              className={styles.teamPlayerName}
            >
              {displayName}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
