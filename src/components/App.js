

import "../styles/App.scss";
import { useEffect, useState, Suspense, lazy } from "react";
import { Route} from 'react-router-dom';
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
      <Route exact path={`/profile/:userName`} render={()=> <MatchHistory champArray={champArray}/> } />
      <Route exact path='/' render={()=> <HomePage/>}/>
      </Suspense>


        </div>







    </div>
  );
}

export default App;
