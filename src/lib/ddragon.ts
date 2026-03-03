import { DDRAGON_BASE, DDRAGON_ITEM_BASE } from "./constants";

let cachedVersion: string | null = null;

export async function getLatestVersion(): Promise<string> {
  if (cachedVersion) return cachedVersion;

  const res = await fetch(`${DDRAGON_BASE}/api/versions.json`);
  const versions: string[] = await res.json();
  cachedVersion = versions[0]!;
  return cachedVersion;
}

export function championImageUrl(version: string, champId: string): string {
  return `${DDRAGON_BASE}/cdn/${version}/img/champion/${champId}.png`;
}

export function championSplashUrl(champId: string, skin = 0): string {
  return `${DDRAGON_BASE}/cdn/img/champion/splash/${champId}_${skin}.jpg`;
}

export function itemImageUrl(version: string, itemId: number): string {
  return `${DDRAGON_ITEM_BASE}/cdn/${version}/img/item/${itemId}.png`;
}

export function spellImageUrl(version: string, spellName: string): string {
  return `${DDRAGON_BASE}/cdn/${version}/img/spell/${spellName}.png`;
}

export function passiveImageUrl(version: string, imageFull: string): string {
  return `${DDRAGON_BASE}/cdn/${version}/img/passive/${imageFull}`;
}

export function runeIconUrl(iconPath: string): string {
  return `https://ddragon.canisback.com/img/${iconPath}`;
}

export async function fetchChampions(
  version: string,
): Promise<Record<string, import("./riot-types").DDragonChampion>> {
  const res = await fetch(
    `${DDRAGON_BASE}/cdn/${version}/data/en_US/champion.json`,
  );
  const data = await res.json();
  return data.data;
}

export async function fetchChampionDetail(
  version: string,
  champId: string,
): Promise<import("./riot-types").DDragonChampionFull> {
  const res = await fetch(
    `${DDRAGON_BASE}/cdn/${version}/data/en_US/champion/${champId}.json`,
  );
  const data = await res.json();
  return data.data[champId];
}

export async function fetchItems(
  version: string,
): Promise<Record<string, import("./riot-types").DDragonItem>> {
  const res = await fetch(
    `${DDRAGON_ITEM_BASE}/cdn/${version}/data/en_US/item.json`,
  );
  const data = await res.json();
  return data.data;
}

export async function fetchRunes(
  version: string,
): Promise<import("./riot-types").DDragonRune[]> {
  const res = await fetch(
    `${DDRAGON_BASE}/cdn/${version}/data/en_US/runesReforged.json`,
  );
  return res.json();
}
