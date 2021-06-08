const convertSummoners = (spellId) => {
  const spellIdObj = {
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

//   const spellArray = Object.keys(spellIdObj);
  for (const spell in spellIdObj) {
    if (parseInt(spell, 10) === spellId) {
      return spellIdObj[spell];
    }
  }
};

export default convertSummoners;
