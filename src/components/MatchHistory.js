import convertChampions from "./covertChampions.js";
import convertSummoners from "./convertSummoners.js";

const MatchHistory = ({
  matchInfo,
  accountInfo,
  matchDetailArray,
  champArray,
  getAccountId,
  getDate,
  searchNew,
}) => {
  console.log(matchInfo);

  matchInfo.sort((a, b) => b.gameCreation-a.gameCreation);

  let participants = matchInfo.map((match) => {
    return match.participantIdentities;
  });

  let playerInfo = participants.map((participant, index) => {
    let playerArray = participant.map((player) => {
      return player.player;
    });
    return playerArray;
  });

  // let playedTime = matchInfo.map((match) => {
  //   return match.gameCreation;
  // });

  let participantChampions = matchInfo.map((match) => {
    return match.participants;
  });
  console.log(participants);
  console.log(participantChampions);

  let championInfo = participantChampions.map((participant, index) => {
    let championArray = participant.map((champion) => {
      // console.log(champion);
      return champion;
    });
    return championArray;
  });

  const kdaCalc = (k, d, a) => {
    if ((k + a) / d === Infinity) {
      return "perfect KDA";
    }
    return ((k + a) / d).toFixed(1);
  };

  // const kpCalc = (a) => {
  //   return a;
  // }

  return (
    <>
      {playerInfo.map((player, index) => {
        let champion = championInfo[index];
        return (
          <div className="match" key={`player${index}`}>
            <div className={`game`}>
              {champion.map((champ, i) => {
                let itemArray =[];
                for (let i = 0; i < 7; i++) {
                    // if (champ.stats.item!==0)
                    const imgSrc = champ.stats[`item${i}`] !== 0 ? 
                      `https://opgg-static.akamaized.net/images/lol/item/${champ.stats[`item${i}`]}.png?image=q_auto:best&amp;v=1621997707` : 
                      "https://opgg-static.akamaized.net/images/pattern/opacity.1.png";
                    if (i < 3) {
                      itemArray.push(
                        <div className='item-upper' key={`index-${i}`}>
                          <img
                            src={imgSrc}
                            alt="items" />
                        </div>
                      )
                    } else if (i >= 3 && i < 6) {
                      itemArray.push(
                        <div className='item-lower' key={`index${i}`}>
                          <img
                            src={imgSrc}
                            alt="items" />
                        </div>
                      )
                    } else {
                      itemArray.push(
                        <div className='trinket'key={`inde${i}`}>
                            <img
                            src={imgSrc}
                            alt="items" />
                        </div>
                      )
                    }
                } 
                return (
                  <div key={`blue${i}`} className="gameInfo">
                    
                    {player[i].accountId === accountInfo.accountId && (
                      <div className="userPlayInfo">
                        
                        {/* <a> */}
                          <img
                            src={`https://opgg-static.akamaized.net/images/lol/champion/${convertChampions(
                              champ.championId,
                              champArray
                            )}.png?image=c_scale,q_auto,w_46&amp;v=1612855207`}
                            className="championImage"
                            alt={convertChampions(champ.championId, champArray)}
                          ></img>
                        {/* </a> */}
                        {convertChampions(champ.championId, champArray)}
                        <div className="summonerSpell">
                          <div className="spell spell1">
                            <img
                              src={`//opgg-static.akamaized.net/images/lol/spell/${convertSummoners(
                                champ.spell1Id
                              )}.png?image=c_scale,q_auto,w_22&amp;v=1621997707`}
                              alt="summoner spells"
                            ></img>
                          </div>
                          <div className="spell spell2">
                            <img
                              src={`//opgg-static.akamaized.net/images/lol/spell/${convertSummoners(
                                champ.spell2Id
                              )}.png?image=c_scale,q_auto,w_22&amp;v=1621997707`}
                              alt="summoner spells"
                            ></img>
                          </div>
                        </div>
                        <div className="runes">
                          <div className="rune">
                            {" "}
                            <img
                              src={`//opgg-static.akamaized.net/images/lol/perk/8128.png?image=c_scale,q_auto,w_22&amp;v=1621997707`}
                              alt="runes"
                            ></img>
                          </div>
                        </div>
                        <div className="kda">
                          {champ.stats.kills} /{champ.stats.deaths} /
                          {champ.stats.assists} -{" "}
                          {kdaCalc(
                            champ.stats.kills,
                            champ.stats.deaths,
                            champ.stats.assists
                          )}
                        </div>
                        <ul className="levelDetail">
                          <li>level: {champ.stats.champLevel}</li>
                          <li>{champ.stats.totalMinionsKilled} CS</li>
                          <li></li>
                        </ul>

                        <div className="items">
                          {itemArray}
                          
                        </div>
                      </div>
                    )}

                    <li className="otherPlayerInfo">
                      <img
                        src={`https://opgg-static.akamaized.net/images/lol/champion/${convertChampions(
                          champ.championId,
                          champArray
                        )}.png?image=c_scale,q_auto,w_46&amp;v=1612855207`}
                        alt={convertChampions(champ.championId, champArray)}
                      ></img>
                      <button 
                      className="otherUsers"
                        onClick={() => {
                          searchNew(player[i].summonerName);
                        }}
                      >
                        {player[i].summonerName}
                      </button>
                    </li>

                    {/* <div class="GameStats">
				<div class="GameType" title="ARAM">
					ARAM
				</div>
				<div class="TimeStamp"><span class="_timeago _timeCountAssigned tip" data-datetime="1622960472" data-type="" data-interval="60" title="Jun 6 2021 2:21 AM">18 hours ago</span></div>
				<div class="Bar"></div>
				<div class="GameResult">
											Defeat									</div>
									<div class="GameLength">21m 3s</div>
				
							</div> */}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MatchHistory;

// for (let i =0; i<10;i++){

//     return(
//         <div>
//         <img src={`https://opgg-static.akamaized.net/images/lol/champion/${convertChampions(champion[0].championId, champArray)}.png?image=c_scale,q_auto,w_46&amp;v=1612855207`} alt={convertChampions(champion[i].championId, champArray)}></img>
//           <a href="#" onClick={()=>{getAccountId(player[i].summonerName)}}>{player[i].summonerName} </a> - {convertChampions(champion[i].championId, champArray)}
//         </div>
//     )
// }


                      // 					<div class="Runes">
                      // 															<div class="Rune">
                      // 				<img src="//opgg-static.akamaized.net/images/lol/perk/8128.png?image=c_scale,q_auto,w_22&amp;v=1621997707" class="Image tip" title="<b style='color: #ffc659'>Dark Harvest</b><br><span>Damaging a Champion below 50% health deals <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_AdaptiveDmg'>adaptive damage</lol-uikit-tooltipped-keyword> and harvests their soul, permanently increasing Dark Harvest's damage by 5.<br><br>Dark Harvest damage: 20-60 (based on level) (+5 damage per soul) (+0.25 bonus AD) (+0.15 AP)<br>Cooldown: 45s (resets to 1.5s on takedown)</span>" alt="Dark Harvest">
                      // 			</div>
                      // 																					<div class="Rune">
                      // 				<img src="//opgg-static.akamaized.net/images/lol/perkStyle/8000.png?image=c_scale,q_auto,w_22&amp;v=1621997707" class="Image tip" title="<b style='color: #ffc659'>Precision</b><br><span>Improved attacks and sustained damage</span>" alt="Precision">
                      // 			</div>
                      // 							</div>
                      // 				<div class="ChampionName">
                      // 	<a href="/champion/velkoz/statistics" target="_blank">Vel'Koz</a>
                      // </div>