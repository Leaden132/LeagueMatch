import "../styles/App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import MatchHistory from './MatchHistory'
import SearchBar from './SearchBar'
import RankedInfo from './RankedInfo'

function App() {

  const apiKey =`RGAPI-7a7ab972-8c0f-4665-bdb0-b65051695a9f`;
  
  const [userInput, setUserInput] = useState('tfblade');
  const [accountInfo, setAccountInfo] = useState({});
  const [rankedInfo, setRankedInfo] = useState({});
  const [matchInfo, setMatchInfo] = useState([]);
  
  const [displayRankedInfo, setDisplayRankedInfo] = useState(false);
  

  const getAccountId = (search) => {
    
    axios({
      method:'GET',
      url: 'https://proxy.hackeryou.com',
      responseType: 'json',
      params: {
        reqUrl: `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${userInput}?api_key=${apiKey}&method=GET&dataType=json`
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

      setAccountInfo(accountInfo);
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

      });


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
        setMatchInfo(matchArray);


        

      });






    });
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    getAccountId();
    setTimeout(()=>{setDisplayRankedInfo(true)}, 1000);
    
  }

  return (
    

    
    <div className="App">


        <SearchBar handleSubmit={handleSubmit}/>


        
        {displayRankedInfo ? <RankedInfo rankedInfo = {rankedInfo}/> : <div></div>}

        <MatchHistory  />











    </div>


  );
}

export default App;
