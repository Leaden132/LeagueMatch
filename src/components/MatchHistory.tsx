import convertChampions from "./convertChampions";
import convertSummoners from "./convertSummoners";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import RankedInfo from "./RankedInfo";
import PulseLoader from 'react-spinners/PulseLoader';
import { css } from "@emotion/react";
import convertRunes from './convertRunes';


const MatchHistory = ({champArray}:{champArray:any}) => {
  const apiKey = process.env.REACT_APP_apiKey;
  const [accountInfo, setAccountInfo] = useState<any>({});
  const [rankedInfo, setRankedInfo] = useState<object>({});
  const [matchInfo, setMatchInfo] = useState<Array<object>>([]);
  const [matchLoading, setMatchLoading] = useState<boolean>(false);
  const [proficiencyArray, setProficiencyArray] = useState<any>([1,2,3]);
  const [champObj, setChampObj] = useState<any>({});
  const [itemObj, setItemObj] = useState<any>({});
  const [runeArray, setRuneArray] = useState<Array<object>>([]);
  // const [mainChamp, setMainChamp] = useState<string>('Gwen');
  const [error, setError] = useState<boolean>(false);
  const matchDetailArray: Array<object>= [];
  const {userName} = useParams<{userName: string}>();
  const history = useHistory();
  let sumName = '';
  const [headerStyle, setHeaderStyle] = useState<any>({});
  const [loadCount, setloadCount] = useState<number>(10);

  console.log(champObj);
  
  const override = css`
    display: block;
    margin: 0 auto;
    margin-top:300px;
    border-color: red;
    `
  


  console.log(process.env);

  useEffect(() => {
    setMatchLoading(true);
// eslint-disable-next-line react-hooks/exhaustive-deps
    sumName = encodeURI(userName);
    console.log(sumName);
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
          method:'GET',
          url: 'https://ddragon.leagueoflegends.com/cdn/11.4.1/data/en_US/champion.json',
          responseType: 'json',
        })
        .then((res)=> {
          console.log(res);
          setChampObj(res.data.data);
        }).catch((error)=>{
          setError(error);
        })

        axios({
          method: "GET",
          url: "https://proxy.hackeryou.com",
          responseType: "json",
          params: {
            reqUrl: `https://ddragon.leagueoflegends.com/cdn/11.12.1/data/en_US/item.json`,
          },
        }).then((res) => {
          console.log(res);
          setItemObj(res.data.data);
        })

        axios({
          method: "GET",
          url: "https://proxy.hackeryou.com",
          responseType: "json",
          params: {
            reqUrl: `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${accountInfoObj.id}?api_key=${apiKey}&method=GET&dataType=json`,
          },
        }).then((res) => {
          let newArray = res.data.slice(0, 10);
          setProficiencyArray(newArray);
          setHeaderStyle({
            background:`linear-gradient(rgba(33, 26, 56, 0.5), rgba(18, 11, 39, 0.8)), url("https://fastcdn.mobalytics.gg/assets/lol/images/champions-backgrounds/landscape/${convertChampions(res.data[0].championId, champArray).toLowerCase()}.jpg")`,
            backgroundSize:'cover',
            backgroundRepeat:'no-repeat',
            backgroundPosition:'center, top'
          })

        }).catch((error)=>{
          console.log(error);
        })

        // axios({
        //   method: "GET",
        //   url: "https://proxy.hackeryou.com",
        //   responseType: "json",
        //   params: {
        //     reqUrl: `https://ddragon.leagueoflegends.com/cdn/11.12.1/data/en_US/runesReforged.json`,
        //   },
        // }).then((res) => {
        //   console.log(res);
        //   setItemObj(res.data.data);
        // })

        axios({
          method:'GET',
          url: 'https://ddragon.leagueoflegends.com/cdn/11.4.1/data/en_US/runesReforged.json',
          responseType: 'json',
        })
        .then((res)=> {
          setRuneArray(res.data);
        })


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

            let initMatchArray: Array<any> = matchArray.slice(0, loadCount);
            initMatchArray.forEach((match:any) => {
              getMatchDetail(match.gameId);
            });

            console.log(matchDetailArray);
            setMatchInfo(matchDetailArray);
            setTimeout(() => {
              setMatchLoading(false);
            }, 1500);
          }).catch(error => {
            setError(true);
          });
        });

        
      }).catch(error => {
        setError(true);
      });
    }
  }, [userName, loadCount]);

  const getMatchDetail = (gameId:number) => {
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

  const getDate = (playedTime:number) => {
    let date = new Date();
    let nowDate = date.getTime();
    let playedTimeStamp = nowDate - playedTime;
    let playedDate = 0;
    if (playedTimeStamp <60000) {
        playedDate = 1;
        return "2 minutes ago";
    }
    else if (playedTimeStamp < 3600000) {
        playedDate = playedTimeStamp / 60000;
        return `${Math.floor(playedDate)} minutes ago`;
    }
    else if (playedTimeStamp < 86400000) {
        playedDate = playedTimeStamp / 3600000;
        return `${Math.floor(playedDate)} hours ago`;
    }
    else {
        playedDate = playedTimeStamp /86400000;
        return `${Math.floor(playedDate)} days ago`;
    }
}

  const metaConvert = (info:string) => {
    if (info === "CLASSIC"){
      return "Ranked Solo";
    }
    else {
      return info;
    }

    
  }

  const convertDuration = (info: number) => {
    const durationRemainder = info%60
    return `${Math.floor(info/60)} : ${durationRemainder}`
  }


  console.log(matchInfo);
  // console.log(matchDetailArray);

  matchInfo.sort((a:any, b:any) => b.gameCreation - a.gameCreation);
  const metaDataArray = matchInfo.map((game:any)=>{
    return {
      date: game.gameCreation,
      duration: game.gameDuration,
      gameMode: game.gameMode,
      gameType: game.gameType,
      mapId: game.mapId,
      platform: game.platformId,
      seasonId: game.seasonId
    
    };
  })

  console.log(matchInfo);

  let participants = matchInfo.map((match:any) => {
    return match.participantIdentities;
  });


  let playerInfo = participants.map((participant, index) => {
    let playerArray = participant.map((player:any) => {
      return player.player;
    });
    return playerArray;
  });


  let participantChampions = matchInfo.map((match:any) => {
    return match.participants;
  });
  console.log(participants);
  console.log(participantChampions);

  let championInfo = participantChampions.map((participant, index) => {
    let championArray = participant.map((champion:object) => {
      // console.log(champion);
      return champion;
    });
    return championArray;
  });

  const kdaCalc = (k:number, d:number, a:number) => {
    if ((k + a) / d === Infinity) {
      return "perfect KDA";
    }
    return ((k + a) / d).toFixed(1);
  };

  const loadMore = ()=>{
    setloadCount(loadCount+10);
  }


  if (error) {
    return <div className="error">This username is not registered at League of Legends, Please check spelling</div>
  }
  else {
  return (
    <>

    {
      matchLoading ? 

      <PulseLoader
      css={override}
      size={50}
      color={"#160d33"}
      loading={matchLoading}
      /> 
      
      :
      <section className="result">
        <div className="headerImageContainer">
          <div className="headerBackground" style={headerStyle}></div>
        </div>
        <div className="searchResult">
          <div className="rankedResult">
      <RankedInfo accountInfo={accountInfo} rankedInfo={rankedInfo} />
      <div className="proficiency">
        <span className="mastery">Champion mastery</span>
      {
        proficiencyArray.map((champ:any)=>{
          console.log(champ);
          return (
            <div className="eachProficiency">
            <img
            src={`https://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/${convertChampions(
              champ.championId,
              champObj
            )}.png`}
            className="profImage"
            alt={convertChampions(champ.championId, champObj)}
          ></img>
            <div className="masteryInfo">
            <span>Mastery level: {champ.championLevel}</span>
            <span>Mastery point: {champ.championPoints}</span>
            </div>
            </div>

          )
        })
      }
      </div>


      </div>
      <div className="matchHistory">
        {playerInfo.map((player, index) => {
          let champion = championInfo[index];
          let win=false;
          console.log(champion);
          for(let i=0; i<10 ; i++){
            if (player[i].accountId === accountInfo.accountId) {
              if (champion[i].stats.win) {
                win=true;
              }
              else {
                win=false;
              }
            }
          }

          return (
            <div className={`match ${win ? 'win' : 'loss'}`} key={`player${index}`}>
              <div className={`game`}>
                <div className="metaInfo">
                  <span title="match mode">{metaConvert(metaDataArray[index].gameMode)}</span>
                  <span className="matchOutcome" title="match outcome">{`${win ? 'Victory' : 'Defeat'}`}</span>
                  <span title="match played date">{getDate(metaDataArray[index].date)}</span>
                  <span className="gameDuration" title="match duration">{convertDuration(metaDataArray[index].duration)}</span>
                  </div>
                {champion.map((champ:any, i:number) => {
                  let itemArray = [];
                  for (let i = 0; i < 7; i++) {
                    let itemNum = champ.stats[`item${i}`];
                    const imgSrc =
                      champ.stats[`item${i}`] !== 0
                        ? `https://ddragon.leagueoflegends.com/cdn/11.12.1/img/item/${itemNum}.png`
                        : "https://opgg-static.akamaized.net/images/pattern/opacity.1.png";
                    if (i < 3) {
                      if (itemObj[itemNum]){
                      itemArray.push(
                        <div className="item-upper" key={`index-${i}`}>
                          <img src={imgSrc} alt="items" />
                          <span className="toolTip">price: {itemObj[itemNum].gold.base}G <br></br> {itemObj[itemNum].plaintext}</span>
                        </div>
                      );
                    }
                    else {itemArray.push(<div className="item-upper" key={`index-${i}`}><img src={imgSrc} alt="items"></img></div>)}
                    } else if (i >= 3 && i < 6) {
                      if (itemObj[itemNum]){
                      itemArray.push(
                        <div className="item-lower" key={`index${i}`}>
                          <img src={imgSrc} alt="items" />
                          <span className="toolTip">price: {itemObj[itemNum].gold.base}G <br></br> {itemObj[itemNum].plaintext}</span>
                        </div>
                      );
                      }
                      else {itemArray.push(<div className="item-lower" key={`index-${i}`}><img src={imgSrc} alt="items"></img></div>)}
                    } else {
                      if (itemObj[itemNum]){
                      itemArray.push(
                        <div className="trinket" key={`inde${i}`}>
                          <img src={imgSrc} alt="items" />
                          <span className="toolTip">price: {itemObj[itemNum].gold.base}G <br></br> {itemObj[itemNum].plaintext}</span>
                        </div>
                      );
                      }
                      else {itemArray.push(<div className="trinket" key={`index-${i}`}><img src={imgSrc} alt="items"></img></div>)}
                    }
                  }
                  return (
                    <div key={`blue${i}`} className="gameInfo">
                      {player[i].accountId === accountInfo.accountId && (

                        
                        <div className={`userPlayInfo`}>
                          <div className="champNameContainer">
                          <div className="champContainer">
                          <img
                            
                            src={`https://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/${convertChampions(
                              champ.championId,
                              champObj
                            )}.png`}
                            className="championImage"
                            alt={convertChampions(champ.championId, champObj)}
                          ></img>

                          </div>
                          <p>{convertChampions(champ.championId, champObj)}</p>
                          </div>
                          <div className="summonerSpell">
                            <div className="spell spell1">
                              <img
                                src={`https://ddragon.leagueoflegends.com/cdn/11.12.1/img/spell/${convertSummoners(
                                  champ.spell1Id
                                )}.png`}
                                alt="summoner spells"
                              ></img>
                              <span className="toolTip">This is SPELL!</span>
                            </div>
                            <div className="spell spell2">
                              <img
                                src={`https://ddragon.leagueoflegends.com/cdn/11.12.1/img/spell/${convertSummoners(
                                  champ.spell2Id
                                )}.png`}
                                alt="summoner spells"
                              ></img>
                              <span className="toolTip">This is SPELL!</span>
                            </div>
                          </div>
                          <div className="runes">
                            <div className="rune">
                              <img src={`https://ddragon.canisback.com/img/${convertRunes(champ.stats.perk0, runeArray)}`} alt={`${convertRunes(champ.stats.perk0, runeArray)}`} className="runeImage" title="Main Rune"></img>
                            </div>
                            <div className="rune">
                              <img src={`https://ddragon.canisback.com/img/${convertRunes(champ.stats.perkSubStyle, runeArray)}`} alt={`${champ.stats.perkSubStyle}`} className="subRuneImage" title="Sub Rune"></img>
                            </div>
                          </div>
                          <div className="kda">
                            <span className="kdaTitle" title="Kills / Deaths / Assists">K/D/A</span>
                            <span>{champ.stats.kills} / {champ.stats.deaths} / {champ.stats.assists}</span>
                            <div className="kdaValue">
                            <span>{kdaCalc(
                              champ.stats.kills,
                              champ.stats.deaths,
                              champ.stats.assists
                            )}
                            </span>
                            </div>
                            
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
                          src={`https://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/${convertChampions(
                            champ.championId,
                            champObj
                          )}.png`}
                          alt={convertChampions(champ.championId, champObj)}
                        ></img>
                        {/* <Link to={`/profile/${player[i].summonerName}`}> */}
                        <button
                          className="otherUsers"
                          onClick={() => {
                            history.push(`/profile/${encodeURI(player[i].summonerName)}`);
                            
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
        <button onClick={loadMore}>Load More</button>
        
      </div>
      </div>
      </section>
  }
    </>
  );
}
};

export default MatchHistory;