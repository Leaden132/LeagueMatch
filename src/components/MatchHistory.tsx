import convertChampions from "./convertChampions";
// import convertSummoners from "./convertSummoners";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import RankedInfo from "./RankedInfo";
import PulseLoader from 'react-spinners/PulseLoader';
import { css } from "@emotion/react";
// import convertRunes from './convertRunes';
// import { render } from "@testing-library/react";
import MatchDetails from './MatchDetails';
// import { throttle } from lodash

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
  // const history = useHistory();
  let sumName = '';
  const [headerStyle, setHeaderStyle] = useState<any>({});
  const [loadCount, setLoadCount] = useState<number>(10);
  const [timeWait, setTimeWait] = useState<any>(false);
  // const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>();

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




  console.log(matchInfo);
  // console.log(matchDetailArray);

  matchInfo.sort((a:any, b:any) => b.gameCreation - a.gameCreation);


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

  const throttle = (callback:any, limit:any) => {
    let timeoutId:ReturnType<typeof setTimeout>;
    return function(){
      if (!timeWait) {
        callback();
        setTimeWait(true);

        timeoutId = setTimeout(()=>{
          setTimeWait(false);
        }, limit)

      }
      else{
        alert(`you need to wait ${timeoutId ? timeoutId : limit} seconds before loading more match history`)
      }
    }
  }



  const loadMore = () => {

    setLoadCount(loadCount + 10)

    

    // setloadCount(loadCount + 10);
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
        proficiencyArray.map((champ:any, index:number)=>{
          console.log(champ);
          return (
            <div className="eachProficiency" key={`prof-${index}`}>
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
      <div className="matchHistoryContainer">
      <MatchDetails playerInfo={playerInfo} championInfo={championInfo} accountInfo={accountInfo} matchInfo={matchInfo} itemObj={itemObj} champObj={champObj} runeArray={runeArray}/>
      
      <button className="loadButton" onClick={throttle(loadMore, 30000)}>Load More</button>
      </div>
      </div>
      </section>
  }
    </>
  );
}
};

export default MatchHistory;