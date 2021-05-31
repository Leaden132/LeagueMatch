import convertChampions from "./covertChampions.js"

const MatchHistory = ({ matchInfo, matchDetailArray }) => {
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

  console.log(playerInfo);
  console.log(championInfo);

  return (
    <>
      {playerInfo.map((player, index) => {
        let champion = championInfo[index];
        return (
          <>
            <div className={`game${index} game`}>
              <div className={`blueTeam${index} blue`}>
                <div>
                  {player[0].summonerName} {index} - {convertChampions(champion[0].championId)}
                </div>
                <div>
                  {player[1].summonerName} {index} - {convertChampions(champion[1].championId)}
                </div>
                <div>
                  {player[2].summonerName} {index}
                </div>
                <div>
                  {player[3].summonerName} {index}
                </div>
                <div>
                  {player[4].summonerName} {index}
                </div>
              </div>

              <div className={`redTeam${index} red`}>
                <div>
                  {player[5].summonerName} {index}
                </div>
                <div>
                  {player[6].summonerName} {index}
                </div>
                <div>
                  {player[7].summonerName} {index}
                </div>
                <div>
                  {player[8].summonerName} {index}
                </div>
                <div>
                  {player[9].summonerName} {index}
                </div>
              </div>
            </div>
          </>
        );
      })}

      <div className="accountInfo"> </div>

      <div className="rankedInfo"> </div>

      <div className="matchHistory">
        <div className="game0 game">
          <div className="blueTeam0 blue"></div>
          <div className="redTeam0 red"></div>
        </div>

        <div className="game1 game">
          <div className="blueTeam1 blue"></div>
          <div className="redTeam1 red"></div>
        </div>

        <div className="game2 game">
          <div className="blueTeam2 blue"></div>
          <div className="redTeam2 red"></div>
        </div>

        <div className="game3 game">
          <div className="blueTeam3 blue"></div>
          <div className="redTeam3 red"></div>
        </div>

        <div className="game4 game">
          <div className="blueTeam4 blue"></div>
          <div className="redTeam4 red"></div>
        </div>

        <div className="game5 game">
          <div className="blueTeam5 blue"></div>
          <div className="redTeam5 red"></div>
        </div>

        <div className="game6 game">
          <div className="blueTeam6 blue"></div>
          <div className="redTeam6 red"></div>
        </div>

        <div className="game7 game">
          <div className="blueTeam7 blue"></div>
          <div className="redTeam7 red"></div>
        </div>

        <div className="game8 game">
          <div className="blueTeam8 blue"></div>
          <div className="redTeam8 red"></div>
        </div>

        <div className="game9 game">
          <div className="blueTeam9 blue"></div>
          <div className="redTeam9 red"></div>
        </div>
      </div>
    </>
  );
};

export default MatchHistory;
