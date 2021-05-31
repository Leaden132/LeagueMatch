import "../styles/App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import MatchHistory from './MatchHistory'
import SearchBar from './SearchBar'
import RankedInfo from './RankedInfo'
import TestField from "./TestField";

function App() {

  const apiKey =`RGAPI-7a7ab972-8c0f-4665-bdb0-b65051695a9f`;
  
  const [userInput, setUserInput] = useState('tfblade');
  const [accountInfo, setAccountInfo] = useState({});
  const [rankedInfo, setRankedInfo] = useState({});
  const [matchInfo, setMatchInfo] = useState([]);
  const [matchDetail, setMatchDetail] = useState([]);
  const [champArray, setChampArray] = useState({});

  
  const [trigger, setTrigger] = useState(false);
  const [displayRankedInfo, setDisplayRankedInfo] = useState(false);
  const [displayMatchHistory, setDisplayMatchHistory] = useState(false);
  const matchDetailArray = [];


  useEffect(()=>{

    axios({
      method:'GET',
      url: 'https://ddragon.leagueoflegends.com/cdn/11.4.1/data/en_US/champion.json',
      responseType: 'json',
    })
    .then((res)=> {
      setChampArray(res.data.data);
    })






  },[])

  const getAccountId = (search) => {
    



    axios({
      method:'GET',
      url: 'https://proxy.hackeryou.com',
      responseType: 'json',
      params: {
        reqUrl: `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${search}?api_key=${apiKey}&method=GET&dataType=json`
      }
    })
    .then(function(res) {
      console.log(res);
      let accountInfoObj = {        
        accountId: res.data.accountId,
        id: res.data.id,
        name: res.data.name,
        profileIconId: res.data.profileIconId,
        puuid:res.data.puuid,
        summonerLevel: res.data.summonerLevel}

      setAccountInfo(accountInfoObj);
      console.log(accountInfoObj.accountId);

      axios({
        method:'GET',
        url: 'https://proxy.hackeryou.com',
        responseType: 'json',
        params: {
          reqUrl: `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${accountInfoObj.id}?api_key=${apiKey}&method=GET&dataType=json`
        }
      })
      .then((res)=> {
        console.log(res);
        let rankedInfoObj = res.data[0];
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
        }
        rankedInfoObj.rank = rankNum;
        console.log(rankedInfoObj);
        setRankedInfo(rankedInfoObj);
        

        axios({
          method:'GET',
          url: 'https://proxy.hackeryou.com',
          responseType: 'json',
          params: {
            reqUrl: `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountInfoObj.accountId}?api_key=${apiKey}&method=GET&dataType=json`
          }
        })
        .then((res)=> {
          console.log(res);
          let matchArray = res.data.matches;
          
          let initMatchArray = matchArray.slice(0, 10);
  
          let newArray = initMatchArray.map((match)=>{
            getMatchDetail(match.gameId);
          })
          
          
          console.log(matchDetailArray);
          setMatchInfo(matchDetailArray);
          
          setDisplayRankedInfo(true);
          setDisplayMatchHistory(true);
          // setTimeout(()=>{setDisplayMatchHistory(true)}, 5000);
          
          setTimeout(()=>{setTrigger(!trigger)}, 1000);
  
  
  
        });
      });
    });
  }








  // useEffect(()=>{
  //   if(matchInfo){
  //     setDisplayRankedInfo(true);
  //   }
    
    

  // },[matchInfo])

  // useEffect(()=>{
  //   if(displayRankedInfo){
  //     setTimeout(()=>{setDisplayMatchHistory(true)}, 5000);
  //   }
    
  // },[displayRankedInfo])



  const getMatchDetail = (gameId) => {

      axios({
        method:'GET',
        url: 'https://proxy.hackeryou.com',
        responseType: 'json',
        params: {
          reqUrl: `https://na1.api.riotgames.com/lol/match/v4/matches/${gameId}?api_key=${apiKey}&method=GET&dataType=json`
        }
      })
      .then((res)=> {
        matchDetailArray.push(res.data);
      });

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);

    let userNameValue = event.target[0].value;
    console.log(userNameValue);


    getAccountId(userNameValue);
    
  }

  const searchNew = (query) => {
    setDisplayRankedInfo(false);
    setDisplayMatchHistory(false);
    getAccountId(query);
  }

  return (


    
    <div className="App">


        <SearchBar handleSubmit={handleSubmit}/>

          {displayRankedInfo ? "yes" : "no"}
        
        {displayRankedInfo ? (<RankedInfo accountInfo = {accountInfo} rankedInfo = {rankedInfo}/>) : (null)}

        {displayMatchHistory ? <MatchHistory matchInfo={matchInfo} matchDetailArray = {matchDetailArray} champArray = {champArray} getAccountId={getAccountId} trigger={trigger} /> : null}

        {/* <TestField/> */}









    </div>


  );
}

export default App;
