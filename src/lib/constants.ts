export const LAMBDA_URL = import.meta.env.VITE_LAMBDA_URL;

export const DDRAGON_BASE = "https://ddragon.leagueoflegends.com";

export const DEFAULT_REGION = "NA1";

export const CHAMPION_CLASSES = [
  "Fighter",
  "Mage",
  "Assassin",
  "Tank",
  "Marksman",
  "Support",
] as const;

export const CLASS_ICON_URLS: Record<string, string> = {
  Fighter: "https://universe.leagueoflegends.com/images/role_icon_fighter.png",
  Mage: "https://universe.leagueoflegends.com/images/role_icon_mage.png",
  Assassin:
    "https://universe.leagueoflegends.com/images/role_icon_assassin.png",
  Tank: "https://universe.leagueoflegends.com/images/role_icon_tank.png",
  Marksman:
    "https://universe.leagueoflegends.com/images/role_icon_marksman.png",
  Support: "https://universe.leagueoflegends.com/images/role_icon_support.png",
};

export const RANK_NUMERALS: Record<string, number> = {
  I: 1,
  II: 2,
  III: 3,
  IV: 4,
};

export const SPELL_MAP: Record<number, string> = {
  21: "SummonerBarrier",
  1: "SummonerBoost",
  14: "SummonerDot",
  4: "SummonerFlash",
  3: "SummonerExhaust",
  6: "SummonerHaste",
  7: "SummonerHeal",
  13: "SummonerMana",
  30: "SummonerPoroRecall",
  31: "SummonerPoroThrow",
  11: "SummonerSmite",
  39: "SummonerSnowURFSnowball_Mark",
  32: "SummonerSnowball",
  12: "SummonerTeleport",
};

export const STAT_LABELS: Record<string, string> = {
  FlatPhysicalDamageMod: "Attack Damage",
  FlatHPPoolMod: "Health",
  FlatSpellBlockMod: "Magic Resist",
  FlatMovementSpeedMod: "Movement Speed",
  FlatMPPoolMod: "Mana",
  FlatArmorMod: "Armor",
  PercentAttackSpeedMod: "Attack Speed",
  PercentLifeStealMod: "Life Steal",
  AbilityHasteMod: "Ability Haste",
  FlatCritChanceMod: "Critical Strike",
  PercentMovementSpeedMod: "Movement Speed %",
  PercentBaseMPRegenMod: "Mana Regen %",
  PercentSlowResistMod: "Slow Resist %",
  FlatMagicDamageMod: "Attack Power",
  PercentBaseHPRegenMod: "HP Regen %",
  PercentTenacityItemMod: "Tenacity %",
};
