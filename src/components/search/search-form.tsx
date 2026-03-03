import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/use-auth";
import { useAddSearch } from "../../hooks/use-search-history";
import styles from "./search-form.module.css";

interface SearchFormProps {
  compact?: boolean;
}

export function SearchForm({ compact }: SearchFormProps) {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const addSearch = useAddSearch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    // Parse "gameName#tagLine" format, default tagLine to NA1
    const [gameName, tagLine] = trimmed.includes("#")
      ? trimmed.split("#", 2) as [string, string]
      : [trimmed, "NA1"];

    if (user) {
      addSearch.mutate(trimmed);
    }

    navigate(`/summoner/${encodeURIComponent(gameName!)}/` +
      `${encodeURIComponent(tagLine ?? "NA1")}`);
    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.form} ${compact ? styles.compact : ""}`}
    >
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
          width="18"
          height="18"
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
  );
}
