    import convertChampions from "./covertChampions.js"

const MatchHistory = ({ matchInfo, accountInfo, matchDetailArray, champArray, getAccountId, getDate}) => {
  console.log(matchInfo);


  let participantIdentities = matchInfo.map((match) => {
    return match.participantIdentities;
  });

  let participants = matchInfo.map((match)=> {
    return match.participants;
  })

  console.log(participants);


  let playerInfo = participantIdentities.map((participant, index) => {
 
    let playerArray = participant.map((player) => {
    // if(player.player.accountId === accountInfo.accountId){
    //   myChamp = 
    // }
      return {...player.player, participantId: player.participantId};
    });

    return playerArray;
  });

  let playerGameInfo = participants.map((participant, index)=>{
    return participant[index].participantId;
  })

  console.log(playerGameInfo);

  let playedTime = matchInfo.map((match)=>{
    return match.gameCreation;
  })

  let participantChampions = matchInfo.map((match) => {
    return match.participants;
  });

//   if (res.participantIdentities[i].player.accountId == account){
//     myChamp = res.participants[i].championId;
// }

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


  // playerInfo.map((player, index)=>{
  //   if (player.accountId === accountInfo.accountId){
  //     myChamp = 
  //   }
  // })





  // let participants = matchInfo.map((match) => {
  //   return match.participantIdentities;
  // });

  // let playerInfo = participants.map((participant, index) => {
 
  //   let playerArray = participant.map((player) => {
  //   // if(player.player.accountId === accountInfo.accountId){
  //   //   myChamp = 
  //   // }

  //     return player.player;
  //   });
  //   return playerArray;
  // });








  playerInfo.map((player, index)=> {
    let champion = championInfo[index];

  })




  return (
    <>
     
      {playerInfo.map((player, index) => {
        let champion = championInfo[index];
        

        return (
          <div className="matchHistory" key ={`player${index}`}>
            <div className={`game`}>
              <div className={`blueTeam blue`}>
                {
                    champion.map((champ, i)=>{
                        if (i<5){
                            return(
                                <div key = {`blue${i}`}>
                    <img src={`https://opgg-static.akamaized.net/images/lol/champion/${convertChampions(champ.championId, champArray)}.png?image=c_scale,q_auto,w_46&amp;v=1612855207`} alt={convertChampions(champ.championId, champArray)}></img>
                      <a href="#" onClick={()=>{getAccountId(player[i].summonerName)}}>{player[i].summonerName} {player[i].accountId}</a> - {convertChampions(champ.championId, champArray)} - {player[i].participantId} - {champ.participantId}
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
                      <a href="#" onClick={()=>{getAccountId(player[i].summonerName)}}>{player[i].summonerName} </a> - {convertChampions(champ.championId, champArray)} - {player[i].participantId}
                    </div>
                            )
                        }
                        else {
                            return;
                        }
                    })
                } </div>

                  <div className="playedTime">{getDate(playedTime[index])}</div>
                  <div className="playedChampion">{
                    
                    accountInfo.accountId


                  }</div>
                  
              </div>
            </div>
        );
      })}

      {
        participants.map((participant)=>{
          
          return <div>{participant[0].participantId}</div>
        })
      }

      {
        playerGameInfo.map((game)=>{
          
          return <div>{game}</div>
        })
      }

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
