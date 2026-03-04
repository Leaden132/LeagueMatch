import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/use-auth";
import { useAddSearch } from "../hooks/use-search-history";
import styles from "./home.module.css";

const EXAMPLE_NAMES = ["TFBlade#NA1", "Doublelift#NA1", "Trick2G#NA1"];

const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Match History",
    description: "Review recent games with detailed stats, builds, and performance breakdowns.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "Champion Mastery",
    description: "See mastery levels, points, and top champions at a glance.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: "Ranked Stats",
    description: "Track solo/duo and flex rankings, win rates, and LP gains.",
  },
];

export default function Home() {
  const [input, setInput] = useState("");
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

  const searchExample = (name: string) => {
    setInput(name);
  };

  return (
    <section className={styles.hero}>
      <div className={styles.background} />

      <div className={styles.content}>
        <h1 className={styles.title}>LeagueMatch</h1>
        <p className={styles.subtitle}>
          Search any summoner. Track stats, matches, and more.
        </p>

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

        <div className={styles.examples}>
          <span className={styles.examplesLabel}>Try:</span>
          {EXAMPLE_NAMES.map((name) => (
            <button
              key={name}
              className={styles.exampleBtn}
              onClick={() => searchExample(name)}
              type="button"
            >
              {name}
            </button>
          ))}
        </div>

        <div className={styles.features}>
          {FEATURES.map((feature) => (
            <div key={feature.title} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDesc}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
