import { useQuery } from "@tanstack/react-query";
import { fetchItems } from "../lib/ddragon";
import { useDDragonVersion } from "./use-ddragon-version";

export function useItems() {
  const { data: version } = useDDragonVersion();

  return useQuery({
    queryKey: ["items", version],
    queryFn: () => fetchItems(version!),
    enabled: !!version,
    staleTime: Infinity,
  });
}
