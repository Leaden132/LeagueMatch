import "../styles/App.scss";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import MatchHistory from './MatchHistory'
import SearchBar from './SearchBar'
import RankedInfo from './RankedInfo'
import HomePage from './HomePage'

// import {BrowserRouter as Router} from 'react-router-dom';

import { 
  Route, Switch
} from 'react-router-dom';

import History from './History';

// import { Switch, Route } from "react-router-loading";

function App() {

  // const apiKey =`RGAPI-7a7ab972-8c0f-4665-bdb0-b65051695a9f`;
  
  // // const [userInput, setUserInput] = useState('tfblade');
  // const [accountInfo, setAccountInfo] = useState({});
  // const [rankedInfo, setRankedInfo] = useState({});
  // const [matchInfo, setMatchInfo] = useState([]);
  // // const [matchDetail, setMatchDetail] = useState([]);
  const [champArray, setChampArray] = useState({});
  const [userSearch, setUserSearch] = useState('');
  const [displayRankedInfo, setDisplayRankedInfo] = useState(false);
  const [displayMatchHistory, setDisplayMatchHistory] = useState(false);
  const matchDetailArray = [];
  const location = useLocation();


  useEffect(()=>{
      const searchParams = new URLSearchParams(window.location.search)
      console.log(searchParams);
      const userName = searchParams.get('name');
      console.log('yay', userName);

    axios({
      method:'GET',
      url: 'https://ddragon.leagueoflegends.com/cdn/11.4.1/data/en_US/champion.json',
      responseType: 'json',
    })
    .then((res)=> {
      setChampArray(res.data.data);
    })






  },[])


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



  const handleSearch = (event) => {
    // event.preventDefault();
    console.log(event);
    console.log(event.target.form[0].value);

    let userNameValue = event.target.form[0].value
    // let userNameValue = event.target[0].value;
    console.log(userNameValue);
    // getAccountId(userNameValue);
    setUserSearch(userNameValue);
    
  }

  const searchNew = (query) => {
    setDisplayRankedInfo(false);
    setDisplayMatchHistory(false);
    // getAccountId(query);
    
  }

  // const history = createHistory();

  return (
    <div className="App">

    {/* <Route exact path="/" render={() => (
    <Redirect to="/searchDashboard"/>
    )}/> */}
    {/* <Route exact path="/" component={Catalogue} /> */}
    
    
    {/* <SearchBar handleSubmit={handleSubmit}/> */}
        <div className="flexContainer">
        
        <Route path='/' render={ () => <SearchBar handleSearch={handleSearch}/> } />
        

        {/* <Route exact path='/profile' render={ () => <RankedInfo accountInfo = {accountInfo} rankedInfo = {rankedInfo}/>} /> */}


{/* 
        {displayRankedInfo ? (<RankedInfo accountInfo = {accountInfo} rankedInfo = {rankedInfo}/>) : (null)} */}
      <Switch>
      <Route exact path={`/profile/userName=${userSearch}`} render={()=> <MatchHistory getDate={getDate} searchNew={searchNew} search={userSearch} champArray={champArray}/> } />
      <Route exact path='/' render={()=> <HomePage handleSearch={handleSearch}/>}/>
      </Switch>

        
        {/* <Route exact path='/profile' render={()=> <MatchHistory matchInfo={matchInfo} accountInfo = {accountInfo} matchDetailArray = {matchDetailArray} champArray = {champArray} getAccountId={getAccountId} getDate={getDate} searchNew={searchNew} search={userSearch} trigger={trigger}/>} /> */}

        {/* {displayMatchHistory ? <MatchHistory matchInfo={matchInfo} accountInfo = {accountInfo} matchDetailArray = {matchDetailArray} champArray = {champArray} getAccountId={getAccountId} getDate={getDate} searchNew={searchNew} trigger={trigger} /> : null} */}

        </div>







    </div>
  );
}

export default App;
