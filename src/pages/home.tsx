import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/use-auth";
import { useAddSearch } from "../hooks/use-search-history";
import styles from "./home.module.css";

export default function Home() {
  const [input, setInput] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const addSearch = useAddSearch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const [gameName, tagLine] = trimmed.includes("#")
      ? (trimmed.split("#", 2) as [string, string])
      : [trimmed, "NA1"];

    if (user) {
      addSearch.mutate(trimmed);
    }

    navigate(
      `/summoner/${encodeURIComponent(gameName!)}/` +
        `${encodeURIComponent(tagLine ?? "NA1")}`,
    );
  };

  return (
    <section className={styles.hero}>
      <div className={styles.background} />
      <div className={styles.content}>
        <h1 className={styles.title}>League Match</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Summoner Name#TAG"
            className={styles.input}
            required
            aria-label="Search summoner"
          />
          <button type="submit" className={styles.button} aria-label="Search">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </form>

        <div className={styles.infoArea}>
          <button
            className={styles.infoToggle}
            onClick={() => setShowInfo(!showInfo)}
          >
            New to League of Legends?
          </button>
          {showInfo && (
            <div className={styles.infoBox}>
              <p>
                Here are some summoner names to try:
              </p>
              <p className={styles.examples}>
                TFBlade#NA1, Doublelift#NA1, Trick2G#NA1
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
