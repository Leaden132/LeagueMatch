import convertChampions from "./covertChampions.js";
import convertSummoners from "./convertSummoners.js";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import RankedInfo from "./RankedInfo";

const MatchHistory = ({
  champArray,
  searchNew,
  updateFunction,
  handleUpdate
}) => {
  const apiKey = process.env.REACT_APP_apiKey;
  const [accountInfo, setAccountInfo] = useState({});
  const [rankedInfo, setRankedInfo] = useState({});
  const [matchInfo, setMatchInfo] = useState([]);
  // const [newSearch, setNewSearch] = useState(false);
  const [trigger, setTrigger] = useState(false);
  // const [userName, setUserName] = useState("");
  const [error, setError] = useState(false);
  const matchDetailArray = [];
  const name = useParams();
  const history = useHistory();
  let sumName = '';

  console.log(process.env);

  useEffect(() => {
// eslint-disable-next-line react-hooks/exhaustive-deps
    sumName = name.userName.replace(/\s+/g, '');

    console.log(sumName);
    // setUserName(name.userName.replace(/\s+/g, ''));

    if (sumName !== '') {
      axios({
        method: "GET",
        url: "https://proxy.hackeryou.com",
        responseType: "json",
        params: {
          reqUrl: `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${sumName}?api_key=${apiKey}&method=GET&dataType=json`,
        },
      }).then( (res) => {
        console.log(res);
        let accountInfoObj = {
          accountId: res.data.accountId,
          id: res.data.id,
          name: res.data.name,
          profileIconId: res.data.profileIconId,
          puuid: res.data.puuid,
          summonerLevel: res.data.summonerLevel,
        };

        setAccountInfo(accountInfoObj);
        console.log(accountInfoObj.accountId);

        axios({
          method: "GET",
          url: "https://proxy.hackeryou.com",
          responseType: "json",
          params: {
            reqUrl: `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${accountInfoObj.id}?api_key=${apiKey}&method=GET&dataType=json`,
          },
        }).then((res) => {
          console.log(res);
          let rankedInfoObj = res.data[0];
          if (rankedInfoObj === undefined){
            rankedInfoObj = {rank:4};
          }
          let rankNum = 0;
          switch (rankedInfoObj.rank) {
            case "I":
              rankNum = 1;
              break;
            case "II":
              rankNum = 2;
              break;
            case "III":
              rankNum = 3;
              break;
            case "IV":
              rankNum = 4;
              break;
            default:
              break;
          }
          rankedInfoObj.rank = rankNum;
          console.log(rankedInfoObj);
          setRankedInfo(rankedInfoObj);

          axios({
            method: "GET",
            url: "https://proxy.hackeryou.com",
            responseType: "json",
            params: {
              reqUrl: `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountInfoObj.accountId}?api_key=${apiKey}&method=GET&dataType=json`,
            },
          }).then((res) => {
            console.log(res);
            let matchArray = res.data.matches;

            let initMatchArray = matchArray.slice(0, 10);

            initMatchArray.map((match) => {
              return getMatchDetail(match.gameId);
            });

            console.log(matchDetailArray);
            setMatchInfo(matchDetailArray);
            setTimeout(() => {
              setTrigger(!trigger);
            }, 1500);
          });
        });
      }).catch(error => {
        setError(true);
      });
    }
  }, [name]);

  const getMatchDetail = (gameId) => {
    axios({
      method: "GET",
      url: "https://proxy.hackeryou.com",
      responseType: "json",
      params: {
        reqUrl: `https://na1.api.riotgames.com/lol/match/v4/matches/${gameId}?api_key=${apiKey}&method=GET&dataType=json`,
      },
    }).then((res) => {
      matchDetailArray.push(res.data);
    }).catch((error)=>{
      setError(true);
    });
  };

  const getDate = (playedTime) => {
    let date = new Date();
    let nowDate = date.getTime();
    let playedTimeStamp = nowDate - playedTime;
    let playedDate = 0;
    if (playedTimeStamp <60000) {
        playedDate = 1;
        return "Match played less than a minute ago";
    }
    else if (playedTimeStamp < 3600000) {
        playedDate = playedTimeStamp / 60000;
        return `Match played ${Math.floor(playedDate)} minutes ago`;
    }
    else if (playedTimeStamp < 86400000) {
        playedDate = playedTimeStamp / 3600000;
        return `Match played ${Math.floor(playedDate)} hours ago`;
    }
    else {
        playedDate = playedTimeStamp /86400000;
        return `Match played ${Math.floor(playedDate)} days ago`;
    }
}

  console.log(matchInfo);
  // console.log(matchDetailArray);

  matchInfo.sort((a, b) => b.gameCreation - a.gameCreation);
  const dateArray = matchInfo.map((game)=>{
    return game.gameCreation;
  })

  console.log(matchInfo);

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
  //     <RankedInfo accountInfo = {accountInfo} rankedInfo = {rankedInfo}/>


  if (error) {
    return <div className="error">This username is not registered at League of Legends, Please check spelling</div>
  }
  else {
  return (
    <>
      <RankedInfo accountInfo={accountInfo} rankedInfo={rankedInfo} />
      <div className="matchHistory">
        {playerInfo.map((player, index) => {
          let champion = championInfo[index];
          return (
            <div className="match" key={`player${index}`}>
              <div className={`game`}>
                <div className="date">{getDate(dateArray[index])}</div>
                {champion.map((champ, i) => {
                  let itemArray = [];
                  for (let i = 0; i < 7; i++) {
                    // if (champ.stats.item!==0)
                    const imgSrc =
                      champ.stats[`item${i}`] !== 0
                        ? `https://opgg-static.akamaized.net/images/lol/item/${
                            champ.stats[`item${i}`]
                          }.png?image=q_auto:best&amp;v=1621997707`
                        : "https://opgg-static.akamaized.net/images/pattern/opacity.1.png";
                    if (i < 3) {
                      itemArray.push(
                        <div className="item-upper" key={`index-${i}`}>
                          <img src={imgSrc} alt="items" />
                        </div>
                      );
                    } else if (i >= 3 && i < 6) {
                      itemArray.push(
                        <div className="item-lower" key={`index${i}`}>
                          <img src={imgSrc} alt="items" />
                        </div>
                      );
                    } else {
                      itemArray.push(
                        <div className="trinket" key={`inde${i}`}>
                          <img src={imgSrc} alt="items" />
                        </div>
                      );
                    }
                  }
                  return (
                    <div key={`blue${i}`} className="gameInfo">
                      {player[i].accountId === accountInfo.accountId && (
                        <div className="userPlayInfo">
                          <img
                            src={`https://opgg-static.akamaized.net/images/lol/champion/${convertChampions(
                              champ.championId,
                              champArray
                            )}.png?image=c_scale,q_auto,w_46&amp;v=1612855207`}
                            className="championImage"
                            alt={convertChampions(champ.championId, champArray)}
                          ></img>
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

                          <div className="items">{itemArray}</div>
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
                        {/* <Link to={`/profile/${player[i].summonerName}`}> */}
                        <button
                          className="otherUsers"
                          onClick={() => {
                            history.push(`/profile/${player[i].summonerName.replace(/\s+/g, '')}`);
                            
                            // setTimeout(() => {
                            //   setNewSearch(!newSearch);
                            // }, 1000);
                          }}
                        >
                          {player[i].summonerName}
                        </button>
                        {/* </Link> */}
                      </li>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }
        )}
      </div>
    </>
  );
}
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
