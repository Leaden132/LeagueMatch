import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { useAuth } from "./use-auth";

interface SearchEntry {
  id: string;
  summoner_name: string;
  created_at: string;
}

export function useSearchHistory() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["search-history", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("search_history")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false })
        .limit(20);
      if (error) throw error;
      return data as SearchEntry[];
    },
    enabled: !!user,
  });
}

export function useAddSearch() {
  const { user } = useAuth();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (summonerName: string) => {
      if (!user) return;
      const { error } = await supabase.from("search_history").upsert(
        { user_id: user.id, summoner_name: summonerName },
        { onConflict: "user_id,summoner_name" },
      );
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["search-history"] }),
  });
}
