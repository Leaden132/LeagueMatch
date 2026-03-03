import { useParams } from "react-router";
import { useChampionDetail } from "../hooks/use-champions";
import { useDDragonVersion } from "../hooks/use-ddragon-version";
import { ChampionDetail } from "../components/champion/champion-detail";
import { TooltipProvider } from "../components/ui/tooltip";
import { LoadingScreen } from "../components/ui/loading";

export default function Champion() {
  const { champName } = useParams();
  const { data: champion, isLoading } = useChampionDetail(champName);
  const { data: version } = useDDragonVersion();

  if (isLoading || !champion || !version) return <LoadingScreen />;

  return (
    <TooltipProvider>
      <ChampionDetail champion={champion} version={version} />
    </TooltipProvider>
  );
}
