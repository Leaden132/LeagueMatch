import type { DDragonChampion, DDragonRune } from "./riot-types";
import { SPELL_MAP, STAT_LABELS } from "./constants";

/** Map champion numeric key → champion string ID (e.g. 86 → "Garen") */
export function championIdToName(
  championId: number,
  champMap: Record<string, DDragonChampion>,
): string {
  for (const key of Object.keys(champMap)) {
    const champ = champMap[key];
    if (champ && parseInt(champ.key, 10) === championId) {
      return key;
    }
  }
  return "Riven"; // fallback
}

/** Map rune ID → icon path */
export function runeIdToIcon(
  runeId: number,
  runeArray: DDragonRune[],
): string {
  for (const tree of runeArray) {
    // Check if it's a tree-level match (sub-style)
    if (tree.id === runeId) {
      return tree.icon;
    }
    // Check keystone runes (slot 0)
    for (const rune of tree.slots[0]?.runes ?? []) {
      if (rune.id === runeId) {
        return rune.icon;
      }
    }
  }
  return "perk-images/Styles/7200_Domination.png";
}

/** Map summoner spell ID → spell name for DDragon URL */
export function spellIdToName(spellId: number): string {
  return SPELL_MAP[spellId] ?? "SummonerFlash";
}

/** Map item stat key → human-readable label */
export function statKeyToLabel(statKey: string): string | undefined {
  return STAT_LABELS[statKey];
}
