import { useChampions } from "../hooks/use-champions";
import { useDDragonVersion } from "../hooks/use-ddragon-version";
import { ChampionGrid } from "../components/champion/champion-grid";
import { LoadingScreen } from "../components/ui/loading";
import styles from "./champions.module.css";

export default function Champions() {
  const { data: champions, isLoading } = useChampions();
  const { data: version } = useDDragonVersion();

  if (isLoading || !champions || !version) return <LoadingScreen />;

  return (
    <section className={styles.page}>
      <div className="wrapper">
        <h2 className={styles.title}>Champions</h2>
        <ChampionGrid champions={champions} version={version} />
      </div>
    </section>
  );
}
