/** Format a unix timestamp to relative time (e.g. "3 hours ago") */
export function relativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 2) return "just now";
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  return `${days} days ago`;
}

/** Format game duration in seconds to "MM:SS" */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

/** Calculate KDA ratio, returns "Perfect" if 0 deaths */
export function formatKda(
  kills: number,
  deaths: number,
  assists: number,
): string {
  if (deaths === 0) return "Perfect";
  return ((kills + assists) / deaths).toFixed(1);
}

/** Convert game mode string to display name */
export function formatGameMode(mode: string): string {
  switch (mode) {
    case "CLASSIC":
      return "Ranked Solo";
    case "ARAM":
      return "ARAM";
    default:
      return mode;
  }
}

/** Capitalize first letter, lowercase rest (for tier names) */
export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/** Strip HTML tags from a string (for DDragon descriptions) */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}
