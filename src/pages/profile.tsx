import { Link } from "react-router";
import { useAuth } from "../hooks/use-auth";
import { useFavorites, useRemoveFavorite } from "../hooks/use-favorites";
import { useSearchHistory } from "../hooks/use-search-history";
import { useDDragonVersion } from "../hooks/use-ddragon-version";
import { championImageUrl } from "../lib/ddragon";
import { relativeTime } from "../lib/utils";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import styles from "./profile.module.css";

export default function Profile() {
  const { user } = useAuth();
  const { data: version } = useDDragonVersion();
  const { data: favorites } = useFavorites();
  const { data: searches } = useSearchHistory();
  const removeFavorite = useRemoveFavorite();

  if (!user) {
    return (
      <section className={styles.page}>
        <p className={styles.empty}>Please log in to view your profile.</p>
      </section>
    );
  }

  const displayName =
    user.user_metadata?.display_name || user.email || "Summoner";

  return (
    <section className={styles.page}>
      <div className="wrapper">
        <h2 className={styles.title}>
          {displayName}
        </h2>

        {/* Recent Searches */}
        <Card className={styles.section}>
          <h3 className={styles.sectionTitle}>Recent Searches</h3>
          {searches?.length ? (
            <ul className={styles.searchList}>
              {searches.map((s) => (
                <li key={s.id} className={styles.searchItem}>
                  <Link to={`/summoner/${encodeURIComponent(s.summoner_name)}/NA1`}>
                    {s.summoner_name}
                  </Link>
                  <span className={styles.time}>
                    {relativeTime(new Date(s.created_at).getTime())}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.empty}>No search history</p>
          )}
        </Card>

        {/* Favorite Champions */}
        <Card className={styles.section}>
          <h3 className={styles.sectionTitle}>Favourite Champions</h3>
          {favorites?.length ? (
            <div className={styles.favGrid}>
              {favorites.map((f) => (
                <div key={f.id} className={styles.favCard}>
                  <Link to={`/champions/${f.champ_name}`}>
                    <img
                      src={
                        version
                          ? championImageUrl(version, f.champ_name)
                          : ""
                      }
                      alt={f.champ_name}
                      className={styles.favImg}
                    />
                  </Link>
                  <span className={styles.favName}>{f.champ_name}</span>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeFavorite.mutate(f.id)}
                    disabled={removeFavorite.isPending}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.empty}>No champions added yet</p>
          )}
        </Card>
      </div>
    </section>
  );
}
