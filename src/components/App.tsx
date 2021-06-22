
import "../styles/App.scss";
import { useEffect, useState, Suspense, lazy } from "react";
import { Route} from 'react-router-dom';
import axios from "axios";
import Fallback from './Fallback';
import Champions from "./Champions";
import InidividualChampInfo from './IndividualChampInfo';
import About from './About';
const MatchHistory = lazy(()=> import ('./MatchHistory'))
const SearchBar = lazy(()=> import ('./SearchBar'))
const HomePage = lazy(()=> import ('./HomePage'))


const App = () => {
  require('dotenv').config()
  const [champObj, setChampObj] = useState<object>({});

  useEffect(()=>{
    axios({
      method:'GET',
      url: 'https://ddragon.leagueoflegends.com/cdn/11.4.1/data/en_US/champion.json',
      responseType: 'json',
    })
    .then((res)=> {
      setChampObj(res.data.data);
    })
  },[])

  return (
    <div className="App">
        <div className="flexContainer">
          <Suspense fallback={<Fallback/>}>
            <Route path='/' render={ () => <SearchBar /> } />
            <Route exact path={`/profile/:userName`} render={()=> <MatchHistory/> } />
            <Route exact path='/' render={()=> <HomePage/>}/>
            <Route exact path='/about' render={()=><About/>}/>
            <Route exact path='/champions' render={()=><Champions champObj={champObj}/>}/>
            <Route path='/champions/:champName' render={()=><InidividualChampInfo/>}/>
          </Suspense>
        </div>
    </div>
  );
}

export default App;
