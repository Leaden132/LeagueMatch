
import "../styles/App.scss";
import { useEffect, useState, Suspense, lazy } from "react";
import { Route, Switch} from 'react-router-dom';
import axios from "axios";
import Fallback from './Fallback';
import Champions from "./Champions";
import InidividualChampInfo from './IndividualChampInfo';
import About from './About';
import Signup from "./auth/Signup";
import {AuthProvider} from '../contexts/AuthContext'
import LogIn from './auth/LogIn';
import Profile from "./Profile";
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
          <AuthProvider>
            <Suspense fallback={<Fallback/>}>
              <SearchBar/>
              <Switch>
                <Route exact path={`/match/:userName`} render={()=> <MatchHistory/> } />
                <Route exact path='/' render={()=> <HomePage/>}/>
                <Route exact path='/about' render={()=><About/>}/>
                <Route exact path='/champions' render={()=><Champions champObj={champObj}/>}/>
                <Route path='/champions/:champName' render={()=><InidividualChampInfo/>}/>
                <Route path='/signup' render={()=><Signup/>}/>
                <Route path='/login' render={()=><LogIn/>}/>
                <Route path='/profile' render={()=><Profile/>}/>
              </Switch>
            </Suspense>
          </AuthProvider>
        </div>
    </div>

  );
}

export default App;
