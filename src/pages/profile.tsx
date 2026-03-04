import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/use-auth";
import { useFavorites, useRemoveFavorite } from "../hooks/use-favorites";
import { useSearchHistory } from "../hooks/use-search-history";
import { useDDragonVersion } from "../hooks/use-ddragon-version";
import { championImageUrl } from "../lib/ddragon";
import { relativeTime } from "../lib/utils";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import styles from "./profile.module.css";

export default function Profile() {
  const { user, updateDisplayName } = useAuth();
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

  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState(displayName);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    const trimmed = nameInput.trim();
    if (!trimmed || trimmed === displayName) {
      setEditing(false);
      return;
    }
    setSaving(true);
    setError("");
    try {
      await updateDisplayName(trimmed);
      setEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update name");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setNameInput(displayName);
    setError("");
    setEditing(false);
  };

  return (
    <section className={styles.page}>
      <div className="wrapper">
        {editing ? (
          <div className={styles.nameEdit}>
            <Input
              id="displayName"
              label="Display Name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") handleCancel();
              }}
            />
            {error && <p className={styles.editError}>{error}</p>}
            <div className={styles.nameActions}>
              <Button size="sm" onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
              <Button size="sm" variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <h2 className={styles.title}>
            {displayName}
            <button
              className={styles.editBtn}
              onClick={() => setEditing(true)}
              aria-label="Edit display name"
            >
              Edit
            </button>
          </h2>
        )}

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
