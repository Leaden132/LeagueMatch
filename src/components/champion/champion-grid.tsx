import { useState } from "react";
import { Link } from "react-router";
import type { DDragonChampion } from "../../lib/riot-types";
import { championImageUrl } from "../../lib/ddragon";
import { CHAMPION_CLASSES, CLASS_ICON_URLS } from "../../lib/constants";
import { Input } from "../ui/input";
import styles from "./champion-grid.module.css";
import allClassIcon from "../../assets/all_classes.png";

interface ChampionGridProps {
  champions: Record<string, DDragonChampion>;
  version: string;
}

export function ChampionGrid({ champions, version }: ChampionGridProps) {
  const [nameFilter, setNameFilter] = useState("");
  const [classFilter, setClassFilter] = useState<string | null>(null);

  const champArray = Object.values(champions);

  const filtered = champArray
    .filter((c) =>
      c.name.toLowerCase().includes(nameFilter.toLowerCase()),
    )
    .filter(
      (c) => !classFilter || c.tags.includes(classFilter),
    );

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <Input
          placeholder="Search for champion names"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />

        <div className={styles.classFilters}>
          <button
            className={`${styles.classBtn} ${!classFilter ? styles.classActive : ""}`}
            onClick={() => setClassFilter(null)}
          >
            <img src={allClassIcon} alt="All classes" />
          </button>
          {CHAMPION_CLASSES.map((cls) => (
            <button
              key={cls}
              className={`${styles.classBtn} ${classFilter === cls ? styles.classActive : ""}`}
              onClick={() => setClassFilter(cls)}
            >
              <img src={CLASS_ICON_URLS[cls]} alt={`${cls} icon`} />
            </button>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {filtered.map((champ) => (
          <Link
            to={`/champions/${champ.id}`}
            key={champ.id}
            className={styles.card}
          >
            <img
              src={championImageUrl(version, champ.id)}
              alt={champ.name}
              className={styles.champImg}
            />
            <div className={styles.info}>
              <span className={styles.name}>{champ.name}</span>
              <span className={styles.title}>{champ.title}</span>
              <div className={styles.tags}>
                {champ.tags.map((tag) => (
                  <img
                    key={tag}
                    src={CLASS_ICON_URLS[tag] ?? ""}
                    alt={tag}
                    className={styles.tagIcon}
                  />
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
