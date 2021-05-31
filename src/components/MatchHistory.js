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

        // for (let i =0; i<10;i++){
            
        //     return(
        //         <div>
        //         <img src={`https://opgg-static.akamaized.net/images/lol/champion/${convertChampions(champion[0].championId, champArray)}.png?image=c_scale,q_auto,w_46&amp;v=1612855207`} alt={convertChampions(champion[i].championId, champArray)}></img>
        //           <a href="#" onClick={()=>{getAccountId(player[i].summonerName)}}>{player[i].summonerName} </a> - {convertChampions(champion[i].championId, champArray)}
        //         </div>
        //     )
        // }

        return (
          <div className="matchHistory" key ={`player${index}`}>
            <div className={`game game`}>
              <div className={`blueTeam blue`}>
                {
                    champion.map((champ, i)=>{
                        if (i<5){
                            return(
                                <div key = {`blue${i}`}>
                    <img src={`https://opgg-static.akamaized.net/images/lol/champion/${convertChampions(champ.championId, champArray)}.png?image=c_scale,q_auto,w_46&amp;v=1612855207`} alt={convertChampions(champ.championId, champArray)}></img>
                      <a href="#" onClick={()=>{getAccountId(player[i].summonerName)}}>{player[i].summonerName} </a> - {convertChampions(champ.championId, champArray)}
                    </div>
                            )
                        }
                        else {
                            return;
                        }
                    })

                } </div>
              <div className={`redTeam red`}>
                {
                    champion.map((champ, i)=>{
                        if (i>=5){
                            return(
                                <div key={`red${i}`}>
                    <img src={`https://opgg-static.akamaized.net/images/lol/champion/${convertChampions(champ.championId, champArray)}.png?image=c_scale,q_auto,w_46&amp;v=1612855207`} alt={convertChampions(champ.championId, champArray)}></img>
                      <a href="#" onClick={()=>{getAccountId(player[i].summonerName)}}>{player[i].summonerName} </a> - {convertChampions(champ.championId, champArray)}
                    </div>
                            )
                        }
                        else {
                            return;
                        }
                    })

                } </div>
              </div>
            </div>
        );
      })}

    </>
  );
};

export default MatchHistory;
