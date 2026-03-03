import type { ChampionMastery, DDragonChampion } from "../../lib/riot-types";
import { championIdToName } from "../../lib/converters";
import { championImageUrl } from "../../lib/ddragon";
import { Card } from "../ui/card";
import styles from "./mastery-list.module.css";

interface MasteryListProps {
  masteries: ChampionMastery[];
  champMap: Record<string, DDragonChampion>;
  version: string;
}

export function MasteryList({ masteries, champMap, version }: MasteryListProps) {
  return (
    <Card className={styles.card}>
      <h3 className={styles.title}>Champion Mastery</h3>
      <div className={styles.list}>
        {masteries.map((m) => {
          const name = championIdToName(m.championId, champMap);
          return (
            <div className={styles.item} key={m.championId}>
              <img
                src={championImageUrl(version, name)}
                alt={name}
                className={styles.icon}
              />
              <div className={styles.info}>
                <span className={styles.name}>{name}</span>
                <span className={styles.detail}>
                  Lv {m.championLevel} &middot;{" "}
                  {m.championPoints.toLocaleString()} pts
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
