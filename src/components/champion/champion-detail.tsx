import type { DDragonChampionFull } from "../../lib/riot-types";
import { championImageUrl, championSplashUrl, passiveImageUrl, spellImageUrl } from "../../lib/ddragon";
import { stripHtml } from "../../lib/utils";
import { useAuth } from "../../hooks/use-auth";
import { useFavorites, useAddFavorite, useRemoveFavorite } from "../../hooks/use-favorites";
import { Button } from "../ui/button";
import { Tooltip } from "../ui/tooltip";
import styles from "./champion-detail.module.css";

interface ChampionDetailProps {
  champion: DDragonChampionFull;
  version: string;
}

const ABILITY_KEYS = ["P", "Q", "W", "E", "R"] as const;

export function ChampionDetail({ champion, version }: ChampionDetailProps) {
  const { user } = useAuth();
  const { data: favorites } = useFavorites();
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();

  const matchingFavorite = favorites?.find((f) => f.champ_name === champion.id);
  const isDuplicate = !!matchingFavorite;

  const handleAdd = () => {
    if (isDuplicate) return;
    addFavorite.mutate({ champName: champion.id, champId: champion.key });
  };

  const handleRemove = () => {
    if (!matchingFavorite) return;
    removeFavorite.mutate(matchingFavorite.id);
  };

  const spellSplashStyle = {
    backgroundImage: `linear-gradient(rgba(33,26,56,0.5), rgba(18,11,39,0.85)), url("${championSplashUrl(champion.id, 1)}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className={styles.container}>
      <div className={styles.splash} style={spellSplashStyle}>
        <div className={styles.splashOverlay} />
      </div>

      <div className={`wrapper ${styles.content}`}>
        {/* Header card */}
        <div className={styles.card}>
          <div className={styles.header}>
            <img
              src={championImageUrl(version, champion.id)}
              alt={champion.name}
              className={styles.avatar}
            />
            <div>
              <h2 className={styles.name}>{champion.name}</h2>
              <div className={styles.tags}>
                {champion.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>

            {user && (
              isDuplicate ? (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleRemove}
                  disabled={removeFavorite.isPending}
                  className={styles.addBtn}
                >
                  Remove from List
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleAdd}
                  disabled={addFavorite.isPending}
                  className={styles.addBtn}
                >
                  Add to List
                </Button>
              )
            )}
          </div>
        </div>

        {/* Abilities card */}
        <div className={styles.card}>
          <h3 className={styles.cardHeading}>Abilities</h3>
          <div className={styles.abilities}>
            <Tooltip
              content={
                <div>
                  <strong>{champion.passive.name}</strong>
                  <p>{stripHtml(champion.passive.description)}</p>
                </div>
              }
            >
              <div className={styles.ability}>
                <img
                  src={passiveImageUrl(version, champion.passive.image.full)}
                  alt={champion.passive.name}
                />
                <span className={styles.key}>{ABILITY_KEYS[0]}</span>
              </div>
            </Tooltip>
            {champion.spells.map((spell, i) => (
              <Tooltip
                key={spell.id}
                content={
                  <div>
                    <strong>{spell.name}</strong>
                    <p>{stripHtml(spell.description)}</p>
                    <p>Cooldown: {spell.cooldownBurn}</p>
                  </div>
                }
              >
                <div className={styles.ability}>
                  <img
                    src={spellImageUrl(version, spell.image.full.replace('.png', ''))}
                    alt={spell.name}
                  />
                  <span className={styles.key}>{ABILITY_KEYS[i + 1]}</span>
                </div>
              </Tooltip>
            ))}
          </div>
        </div>

        {/* Lore card */}
        <div className={styles.card}>
          <h3 className={styles.cardHeading}>Lore</h3>
          <p className={styles.lore}>{champion.lore}</p>
        </div>

        {/* Stats card */}
        <div className={styles.card}>
          <h3 className={styles.cardHeading}>Champion Stats</h3>
          <div className={styles.statsGrid}>
            {(["attack", "defense", "magic", "difficulty"] as const).map(
              (stat) => (
                <div className={styles.statRow} key={stat}>
                  <span className={styles.statLabel}>{stat}</span>
                  <div className={styles.statBar}>
                    <div
                      className={`${styles.statFill} ${styles[stat]}`}
                      style={{ width: `${champion.info[stat] * 10}%` }}
                    />
                  </div>
                  <span className={styles.statValue}>{champion.info[stat] * 10}%</span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
