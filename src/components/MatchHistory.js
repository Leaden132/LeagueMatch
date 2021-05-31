import convertChampions from "./covertChampions.js"

const MatchHistory = ({ matchInfo, matchDetailArray, champArray, getAccountId}) => {
  console.log(matchInfo);

  let participants = matchInfo.map((match) => {
    return match.participantIdentities;
  });

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
    // return {
    //     championId: participant.championId,
    //     participantId: participant.participantId,
    //     spell1Id: participant.spell1Id,
    //     spell2Id: participant.spell2Id,
    //     teamId: participant.teamId,
    //     timeline: participant.timeline,
    //     stats: participant.stats
    // }
  });

  let playerInfo = participants.map((participant, index) => {
    // console.log(participant);
    // console.log(participant.id);
    let playerArray = participant.map((player) => {
      return player.player;
    });
    return playerArray;
  });


  return (
    <>
      {playerInfo.map((player, index) => {
        let champion = championInfo[index];
        // console.log(champion[1].championId)
        // console.log(convertChampions(champion[1].championId, champArray));
        

        return (
          <div className="matchHistory">
            <div className={`game${index} game`}>
              <div className={`blueTeam${index} blue`}>
                <div>
                <img src={`https://opgg-static.akamaized.net/images/lol/champion/${convertChampions(champion[0].championId, champArray)}.png?image=c_scale,q_auto,w_46&amp;v=1612855207`} alt={convertChampions(champion[0].championId, champArray)}></img>
                  <a href="#" onClick={()=>{getAccountId(player[0].summonerName)}}>{player[0].summonerName} </a> - {convertChampions(champion[0].championId, champArray)}
                </div>
                <div>
                <img src={`https://opgg-static.akamaized.net/images/lol/champion/${convertChampions(champion[1].championId, champArray)}.png?image=c_scale,q_auto,w_46&amp;v=1612855207`} alt={convertChampions(champion[1].championId, champArray)}></img>
                  {<a href="#" onClick={()=>{getAccountId(player[0].summonerName)}}>{player[1].summonerName} </a>} - {convertChampions(champion[1].championId, champArray)}
                </div>
                <div>
                <img src={`https://opgg-static.akamaized.net/images/lol/champion/${convertChampions(champion[2].championId, champArray)}.png?image=c_scale,q_auto,w_46&amp;v=1612855207`} alt={convertChampions(champion[2].championId, champArray)}></img>
                  {<a href="#" onClick={()=>{getAccountId(player[0].summonerName)}}>{player[2].summonerName} </a>} - {convertChampions(champion[2].championId, champArray)}
                </div>
                <div>
                <img src={`https://opgg-static.akamaized.net/images/lol/champion/${convertChampions(champion[3].championId, champArray)}.png?image=c_scale,q_auto,w_46&amp;v=1612855207`} alt={convertChampions(champion[3].championId, champArray)}></img>
                  {<a href="#" onClick={()=>{getAccountId(player[0].summonerName)}}>{player[3].summonerName} </a>} - {convertChampions(champion[3].championId, champArray)}
                </div>
                <div>
                <img src={`https://opgg-static.akamaized.net/images/lol/champion/${convertChampions(champion[4].championId, champArray)}.png?image=c_scale,q_auto,w_46&amp;v=1612855207`} alt={convertChampions(champion[4].championId, champArray)}></img>
                  {<a href="#" onClick={()=>{getAccountId(player[0].summonerName)}}>{player[4].summonerName} </a>} - {convertChampions(champion[4].championId, champArray)}
                </div>
              </div>

              <div className={`redTeam${index} red`}>
                <div>
                <img src={`https://opgg-static.akamaized.net/images/lol/champion/${convertChampions(champion[5].championId, champArray)}.png?image=c_scale,q_auto,w_46&amp;v=1612855207`} alt={convertChampions(champion[5].championId, champArray)}></img>
                  {<a href="#" onClick={()=>{getAccountId(player[0].summonerName)}}>{player[5].summonerName} </a>} - {convertChampions(champion[5].championId, champArray)}
                </div>
                <div>
                <img src={`https://opgg-static.akamaized.net/images/lol/champion/${convertChampions(champion[6].championId, champArray)}.png?image=c_scale,q_auto,w_46&amp;v=1612855207`} alt={convertChampions(champion[6].championId, champArray)}></img>
                  {<a href="#" onClick={()=>{getAccountId(player[0].summonerName)}}>{player[6].summonerName} </a>} - {convertChampions(champion[6].championId, champArray)}
                </div>
                <div>
                <img src={`https://opgg-static.akamaized.net/images/lol/champion/${convertChampions(champion[7].championId, champArray)}.png?image=c_scale,q_auto,w_46&amp;v=1612855207`} alt={convertChampions(champion[7].championId, champArray)}></img>
                  {<a href="#" onClick={()=>{getAccountId(player[0].summonerName)}}>{player[7].summonerName} </a>} - {convertChampions(champion[7].championId, champArray)}
                </div>
                <div>
                <img src={`https://opgg-static.akamaized.net/images/lol/champion/${convertChampions(champion[8].championId, champArray)}.png?image=c_scale,q_auto,w_46&amp;v=1612855207`} alt={convertChampions(champion[8].championId, champArray)}></img>
                  {<a href="#" onClick={()=>{getAccountId(player[0].summonerName)}}>{player[8].summonerName} </a>} - {convertChampions(champion[8].championId, champArray)}
                </div>
                <div>
                <img src={`https://opgg-static.akamaized.net/images/lol/champion/${convertChampions(champion[9].championId, champArray)}.png?image=c_scale,q_auto,w_46&amp;v=1612855207`} alt={convertChampions(champion[9].championId, champArray)}></img>
                  {<a href="#" onClick={()=>{getAccountId(player[0].summonerName)}}>{player[9].summonerName} </a>} -{convertChampions(champion[9].championId, champArray)}
                </div>
              </div>
            </div>
          </div>
        );
      })}

    </>
  );
};

export default MatchHistory;
