/* ─── Account / Summoner ─── */
export interface RiotAccount {
  puuid: string;
  gameName: string;
  tagLine: string;
}

export interface SummonerProfile {
  id: string;
  accountId: string;
  puuid: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}

/* ─── Ranked ─── */
export interface RankedEntry {
  leagueId: string;
  queueType: string;
  tier: string;
  rank: string;
  summonerId: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
}

/* ─── Champion Mastery ─── */
export interface ChampionMastery {
  championId: number;
  championLevel: number;
  championPoints: number;
  lastPlayTime: number;
  championPointsSinceLastLevel: number;
  championPointsUntilNextLevel: number;
}

/* ─── Match ─── */
export interface MatchInfo {
  gameCreation: number;
  gameDuration: number;
  gameMode: string;
  gameType: string;
  mapId: number;
  platformId: string;
  participants: MatchParticipant[];
}

export interface MatchParticipant {
  puuid: string;
  summonerName: string;
  riotIdGameName: string;
  riotIdTagline: string;
  championId: number;
  championName: string;
  champLevel: number;
  kills: number;
  deaths: number;
  assists: number;
  totalMinionsKilled: number;
  neutralMinionsKilled: number;
  win: boolean;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  summoner1Id: number;
  summoner2Id: number;
  perks: {
    styles: PerkStyle[];
  };
}

export interface PerkStyle {
  description: string;
  style: number;
  selections: PerkSelection[];
}

export interface PerkSelection {
  perk: number;
  var1: number;
  var2: number;
  var3: number;
}

export interface MatchDetail {
  metadata: { matchId: string; participants: string[] };
  info: MatchInfo;
}

/* ─── DDragon ─── */
export interface DDragonChampion {
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  tags: string[];
  info: { attack: number; defense: number; magic: number; difficulty: number };
  image: { full: string };
}

export interface DDragonChampionFull extends DDragonChampion {
  lore: string;
  spells: DDragonSpell[];
  passive: {
    name: string;
    description: string;
    image: { full: string };
  };
}

export interface DDragonSpell {
  id: string;
  name: string;
  description: string;
  cooldownBurn: string;
  image: { full: string };
}

export interface DDragonItem {
  name: string;
  description: string;
  plaintext: string;
  image: { full: string };
  gold: { total: number; sell: number; base: number; purchasable: boolean };
  stats: Record<string, number>;
  tags: string[];
}

export interface DDragonRune {
  id: number;
  key: string;
  icon: string;
  name: string;
  slots: {
    runes: {
      id: number;
      key: string;
      icon: string;
      name: string;
    }[];
  }[];
}
