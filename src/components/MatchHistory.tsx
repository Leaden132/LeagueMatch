import convertChampions from "./convertChampions";
// import convertSummoners from "./convertSummoners";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import RankedInfo from "./RankedInfo";
import PulseLoader from 'react-spinners/PulseLoader';
import { css } from "@emotion/react";
// import convertRunes from './convertRunes';
import MatchDetails from './MatchDetails';

const MatchHistory = () => {
  // const apiKey = process.env.REACT_APP_apiKey; -> moved API key to back-end.
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
  const [APIError, setAPIError] = useState<boolean>(false);
  // const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>();

  console.log(champObj);
  
  const override = css`
    display: block;
    margin: 0 auto;
    margin-top:300px;
    border-color: red;
    `
  

  useEffect(() => {
    setMatchLoading(true);
// eslint-disable-next-line react-hooks/exhaustive-deps
    sumName = encodeURI(userName);
    console.log(sumName);

    const loadData = async () => {
    if (sumName !== '') {
      const summonersByNameAxios = await axios({
        method:'GET',
        url: 'https://4eik2iqhfj.execute-api.us-east-1.amazonaws.com/dev',
        responseType: 'json',
        params: {
          apiName:'summonersByName',
          apiParam: sumName
        },
      })

      console.log(summonersByNameAxios);

      let accountInfoObj = {
        accountId: summonersByNameAxios.data.message.accountId,
        id: summonersByNameAxios.data.message.id,
        name: summonersByNameAxios.data.message.name,
        profileIconId: summonersByNameAxios.data.message.profileIconId,
        puuid: summonersByNameAxios.data.message.puuid,
        summonerLevel: summonersByNameAxios.data.message.summonerLevel,
      };
      setAccountInfo(accountInfoObj);

        const championAxios = await axios({
          method:'GET',
          url: 'https://ddragon.leagueoflegends.com/cdn/11.4.1/data/en_US/champion.json',
          responseType: 'json',
        })
        setChampObj(championAxios.data.data)


        const itemAxios = await axios({
          method:'GET',
          url: 'https://4eik2iqhfj.execute-api.us-east-1.amazonaws.com/dev',
          responseType: 'json',
          params: {
            apiName:'item'
          },
        })
        setItemObj(itemAxios.data.message);

        const championMasteryAxios = await axios({
          method:'GET',
          url: 'https://4eik2iqhfj.execute-api.us-east-1.amazonaws.com/dev',
          responseType: 'json',
          params: {
            apiName:'championMastery',
            apiParam:accountInfoObj.id
          }
        })

        console.log(championMasteryAxios);
        let newArray = championMasteryAxios.data.message.slice(0, 10);
        setProficiencyArray(newArray);
        setHeaderStyle({
          backgroundImage:`url("https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${convertChampions(championMasteryAxios.data.message[0].championId, championAxios.data.data)}_0.jpg")`,
          backgroundAttachment: 'fixed',
          // background-image: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1));
          // backgroundAttachment: 'fixed',
          // background:linear-gradient(rgba(0, 9, 61, 0.2), rgba(3, 0, 43, 0.5)), url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gwen_0.jpg);
          // http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg
          // background:`url("https://fastcdn.mobalytics.gg/assets/lol/images/champions-backgrounds/landscape/${convertChampions(championMasteryAxios.data.message[0].championId, championAxios.data.data).toLowerCase()}.jpg")`,
          backgroundSize:'cover',
          backgroundRepeat:'no-repeat',
          backgroundPosition:'0 200px'
        })
        // linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.6)),


        const runeAxios = await axios({
          method:'GET',
          url: 'https://ddragon.leagueoflegends.com/cdn/11.4.1/data/en_US/runesReforged.json',
          responseType: 'json',
        })
        setRuneArray(runeAxios.data)


        const entriesBySummonerAxios = await axios({
          method:'GET',
          url: 'https://4eik2iqhfj.execute-api.us-east-1.amazonaws.com/dev',
          responseType: 'json',
          params: {
            apiName:'entriesBySummoner',
            apiParam: accountInfoObj.id
          }
        })

        let rankedInfoObj = entriesBySummonerAxios.data.message;
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


          const matchByAccountsAxios = await axios({
            method:'GET',
            url: 'https://4eik2iqhfj.execute-api.us-east-1.amazonaws.com/dev',
            responseType: 'json',
            params: {
              apiName:'matchByAccounts',
              apiParam: accountInfoObj.accountId
            }
          })
          let matchArray = matchByAccountsAxios.data.message;
            let initMatchArray: Array<any> = matchArray.slice(0, loadCount);
            initMatchArray.forEach((match:any) => {
              getMatchDetail(match.gameId);
            });


            
            setMatchInfo(matchDetailArray);
            setTimeout(() => {
              setMatchLoading(false);
            }, 1000);
    }
  }


  loadData().catch(e => {
    console.log('There has been a problem with API call: ' + e.message);

    setError(true);
    setAPIError(true);
    setTimeout(() => {
      setMatchLoading(false);
    }, 1000);

  });
  }, [userName, loadCount]);

  const getMatchDetail = async (gameId:number) => {


          const matchDetailAxios = await axios({
            method:'GET',
            url: 'https://4eik2iqhfj.execute-api.us-east-1.amazonaws.com/dev',
            responseType: 'json',
            params: {
              apiName:'matches',
              apiParam: gameId
            }
          })

          matchDetailArray.push(matchDetailAxios.data.message)

  };

  matchInfo.sort((a:any, b:any) => b.gameCreation - a.gameCreation);

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


  let championInfo = participantChampions.map((participant, index) => {
    let championArray = participant.map((champion:object) => {
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
        alert(`you need to wait ${timeoutId ? timeoutId : (limit/1000)} seconds before loading more match history`)
      }
    }
  }



  const loadMore = () => {

    setLoadCount(loadCount + 10)

    

    // setloadCount(loadCount + 10);
  }


  if (error) {
    return APIError ? <div className='error'>There has been an error with API call, please try again with different name/parameters</div> :<div className="error">This username is not registered at League of Legends, Please check spelling</div>
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

        <div className="matchHistoryTitle"><h2>Match History</h2></div>

        {/* <div className="item">
      <div className="img-wrap">
            <img src="https://i.imgur.com/crOw6MT.jpg"></img>
      </div>
</div> */}
        
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