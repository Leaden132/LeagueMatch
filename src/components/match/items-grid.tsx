import type { MatchParticipant, DDragonItem } from "../../lib/riot-types";
import { itemImageUrl } from "../../lib/ddragon";
import { statKeyToLabel } from "../../lib/converters";
import { Tooltip } from "../ui/tooltip";
import styles from "./items-grid.module.css";

interface ItemsGridProps {
  player: MatchParticipant;
  itemMap: Record<string, DDragonItem>;
  version: string;
}

export function ItemsGrid({ player, itemMap, version }: ItemsGridProps) {
  const itemSlots = [
    player.item0,
    player.item1,
    player.item2,
    player.item3,
    player.item4,
    player.item5,
    player.item6,
  ];

  return (
    <div className={styles.grid}>
      {itemSlots.map((itemId, i) => {
        if (!itemId) {
          return <div key={i} className={styles.empty} />;
        }

        const item = itemMap[String(itemId)];
        if (!item) {
          return (
            <img
              key={i}
              src={itemImageUrl(version, itemId)}
              alt="item"
              className={`${styles.item} ${i === 6 ? styles.trinket : ""}`}
            />
          );
        }

        return (
          <Tooltip
            key={i}
            content={
              <div className={styles.tooltipContent}>
                <strong>{item.name}</strong>
                {Object.entries(item.stats).map(([key, val]) => (
                  <div key={key} className={styles.stat}>
                    {statKeyToLabel(key)}: {val}
                  </div>
                ))}
                {item.plaintext && <div className={styles.desc}>{item.plaintext}</div>}
                <div className={styles.cost}>Cost: {item.gold.total}</div>
              </div>
            }
          >
            <img
              src={itemImageUrl(version, itemId)}
              alt={item.name}
              className={`${styles.item} ${i === 6 ? styles.trinket : ""}`}
            />
          </Tooltip>
        );
      })}
    </div>
  );
}
