

import "../styles/App.scss";
import { useEffect, useState, Suspense, lazy } from "react";
import { useLocation, Switch } from 'react-router-dom';
import {Route} from 'react-router-loading';
import axios from "axios";
import Fallback from './Fallback';

const MatchHistory = lazy(()=> import ('./MatchHistory'))
const SearchBar = lazy(()=> import ('./SearchBar'))
const HomePage = lazy(()=> import ('./HomePage'))

// import SearchBar from './SearchBar'
// import HomePage from './HomePage'


function App() {
  require('dotenv').config()
  const [champArray, setChampArray] = useState({});
  const [userSearch, setUserSearch] = useState('');
  const location = useLocation();

  useEffect(()=>{
    axios({
      method:'GET',
      url: 'https://ddragon.leagueoflegends.com/cdn/11.4.1/data/en_US/champion.json',
      responseType: 'json',
    })
    .then((res)=> {
      setChampArray(res.data.data);
    })

    // setUserSearch(userName);

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



  // const handleSearch = (event) => {
  //   // event.preventDefault();
  //   console.log(event);
  //   console.log(event.target.form[0].value);

  //   let userNameValue = event.target.form[0].value
  //   // let userNameValue = event.target[0].value;
  //   console.log(userNameValue);
  //   // getAccountId(userNameValue);
  //   setUserSearch(userNameValue);
    
  // }




  return (
    <div className="App">


        <div className="flexContainer">
      <Suspense fallback={<Fallback/>}>
      <Route path='/' render={ () => <SearchBar /> } />
      <Route exact path={`/profile/:userName`} render={()=> <MatchHistory getDate={getDate} search={userSearch} champArray={champArray}/> } />
      <Route exact path='/' render={()=> <HomePage/>}/>
      </Suspense>


        </div>







    </div>
  );
}

export default App;
