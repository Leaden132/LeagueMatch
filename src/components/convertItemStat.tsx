const convertItemStat = (statName:string) => {

    const statObj:any = {
        FlatPhysicalDamageMod: 'Attack Damage',
        FlatHPPoolMod: 'Health',
        FlatSpellBlockMod: 'Magic Resist',
        FlatMovementSpeedMod: 'Movement Speed',
        FlatMPPoolMod: 'Mana',
        FlatArmorMod: 'Armor',
        PercentAttackSpeedMod: 'Attack Speed',
        PercentLifeStealMod: 'Life Steal',
        AbilityHasteMod: 'Ability Haste',
        FlatCritChanceMod: 'Critical Strike',
        PercentMovementSpeedMod: 'Movement Speed %',
        PercentBaseMPRegenMod: 'Mana Regen %',
        PercentSlowResistMod: 'Slow Resist %',
        FlatMagicDamageMod: 'Attack Power',
        PercentBaseHPRegenMod: 'HP Regen %',
        PercentTenacityItemMod: 'Tenacity %',

    }
  
    for (const stat in statObj) {
      if (stat === statName) {
        return statObj[stat];
      }
    }
  };
  
  export default convertItemStat;
  