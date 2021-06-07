import convertChampions from "./covertChampions.js"
import convertSummoners from "./convertSummoners.js"

const MatchHistory = ({ matchInfo, accountInfo, matchDetailArray, champArray, getAccountId, getDate}) => {
  console.log(matchInfo);

  // if (!props.warn) {
  //   return null;
  // }

  let participants = matchInfo.map((match) => {
    return match.participantIdentities;
  });

  let playerInfo = participants.map((participant, index) => {
 
    let playerArray = participant.map((player) => {

      return player.player;
    });
    return playerArray;
  });


  let playedTime = matchInfo.map((match)=>{
    return match.gameCreation;
  })

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
    if ((k+a)/d === Infinity) {
      return "perfect KDA"
    }
    return ((k + a)/d).toFixed(1);
  }


  return (
    <>
      {playerInfo.map((player, index) => {
        let champion = championInfo[index];

        return (
          <div className="matchHistory" key ={`player${index}`}>
            <div className={`game`}>
                {
                    champion.map((champ, i)=>{
                            return(
                                <div key = {`blue${i}`} className="gameInfo">


{player[i].accountId === accountInfo.accountId && (
                      


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

                      
                      
                      <div className="userPlayInfo">
                      level: {champ.stats.champLevel}
                      <a><img src={`https://opgg-static.akamaized.net/images/lol/champion/${convertChampions(champ.championId, champArray)}.png?image=c_scale,q_auto,w_46&amp;v=1612855207`} className="championImage" alt={convertChampions(champ.championId, champArray)}></img></a>{convertChampions(champ.championId, champArray)}
                      <div className="summonerSpell"><div className="spell spell1"><img src={`//opgg-static.akamaized.net/images/lol/spell/${convertSummoners(champ.spell1Id)}.png?image=c_scale,q_auto,w_22&amp;v=1621997707`}></img></div><div className="spell spell2"><img src={`//opgg-static.akamaized.net/images/lol/spell/${convertSummoners(champ.spell2Id)}.png?image=c_scale,q_auto,w_22&amp;v=1621997707`}></img></div></div>

                      <div className="runes">
                        <div className="rune"> <img src={`//opgg-static.akamaized.net/images/lol/perk/8128.png?image=c_scale,q_auto,w_22&amp;v=1621997707`}></img></div>
                      </div>
                      
                      <div className="kda">                      
                      {champ.stats.kills} /
                      {champ.stats.deaths} /
                      {champ.stats.assists} - {kdaCalc(champ.stats.kills,champ.stats.deaths ,champ.stats.assists)}
                      </div>

                      <div className="items">
                        <img src={`https://opgg-static.akamaized.net/images/lol/item/${champ.stats.item0}.png?image=q_auto:best&amp;v=1621997707`}></img>
                        <img src={`https://opgg-static.akamaized.net/images/lol/item/${champ.stats.item1}.png?image=q_auto:best&amp;v=1621997707`}></img>
                        <img src={`https://opgg-static.akamaized.net/images/lol/item/${champ.stats.item2}.png?image=q_auto:best&amp;v=1621997707`}></img>
                        <img src={`https://opgg-static.akamaized.net/images/lol/item/${champ.stats.item3}.png?image=q_auto:best&amp;v=1621997707`}></img>
                        <img src={`https://opgg-static.akamaized.net/images/lol/item/${champ.stats.item4}.png?image=q_auto:best&amp;v=1621997707`}></img>
                        <img src={`https://opgg-static.akamaized.net/images/lol/item/${champ.stats.item5}.png?image=q_auto:best&amp;v=1621997707`}></img>
                        <img src={`https://opgg-static.akamaized.net/images/lol/item/${champ.stats.item6}.png?image=q_auto:best&amp;v=1621997707`}></img>
                      </div>



                      </div>
                      )}


                    <li className="otherPlayerInfo">
                    <img src={`https://opgg-static.akamaized.net/images/lol/champion/${convertChampions(champ.championId, champArray)}.png?image=c_scale,q_auto,w_46&amp;v=1612855207`} alt={convertChampions(champ.championId, champArray)}></img>
                      <a href="#" onClick={()=>{getAccountId(player[i].summonerName)}}>{player[i].summonerName}</a> 
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
                            )
                    })

                } 
                  
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
