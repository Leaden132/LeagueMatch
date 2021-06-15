import {useHistory} from 'react-router-dom'
import {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import convertChampions from "./convertChampions";
import PulseLoader from 'react-spinners/PulseLoader';
import { css } from "@emotion/react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";


const HomePage = () => {
  const [input, setInput] = useState('');
  const history = useHistory();
  const element = <FontAwesomeIcon icon={faSearch} />
  const [rotation, setRotation] = useState([5,27,44,51,75,76,81,82,105,107,117,121,126,147,238]);
  const [rotationForNewPlayers, setRotationForNewPlayers] = useState([18,81,92,141,37,238,19,45,25,64]);
  const [loading, setLoading] = useState(true);
  const [champObj, setChampObj] = useState<any>({});
  const [rotationStyle, setRotationStyle] = useState<any>({});
  const override = css`
  display: block;
  margin: 0 auto;
  margin-top:300px;
  border-color: red;
  `
  // const apiKey = process.env.REACT_APP_apiKey;


  //There is problem with Riot API regarding Rotation champions, later update to correct api call! 
  useEffect(()=>{
    axios({
      method:'GET',
      url: 'https://ddragon.leagueoflegends.com/cdn/11.4.1/data/en_US/champion.json',
      responseType: 'json',
    })
    .then((res)=> {
      console.log(res);
      setChampObj(res.data.data);
      setRotation([5,27,44,51,75,76,81,82,105,107,117,121,126,147,238]);
    setRotationForNewPlayers([18,81,92,141,37,238,19,45,25,64]);
    setTimeout(() => {
      setLoading(false);
    }, 300);
    })
    
  },[])


  // useEffect(()=>{
  //   setLoading(true);
  //   axios({
  //     method: "GET",
  //     url: "https://proxy.hackeryou.com",
  //     responseType: "json",
  //     params: {
  //       reqUrl: `https://na1.api.riotgames.com/lol/platform/v3/champion-rotations/?api_key=${apiKey}`,
  //     }
  //   }).then( (res:any) => {
  //     console.log(res);
  //     console.log(res.freeChampionIds);

  //     setRotation(res.freeChampionIds);
  //     setRotationForNewPlayers(res.freeChampionIdsForNewPlayers);
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 1500);
  //   }).catch((error)=>{
  //     console.log(error);
  //   })

  // },[])

  const arrowLeft = (e:any) => {
    console.log("yay");
    console.log(e);
    setRotationStyle({transform: 'translate(-200px)'})
  }

  const submitForm = (e: React.FormEvent) => {
    console.log(e);
    e.preventDefault();
    history.push(`/profile/${encodeURI(input)}`);
  }

  


    return (
      <>
      {loading ? 

<PulseLoader
css={override}
size={50}
color={"#160d33"}
loading={loading}
/> 

:
<div className="main">
        <div className="background">
          {/* <img src="http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gwen_0.jpg"></img> */}
        </div>

        <div className="homePage">
          <div className="mainTitle">
            <h1>League Matches</h1>
          </div>
          {/* <div className="suggestion">
  <div className="suggestionContainer">
    <span>You don't play league of legends and don't know any user names?</span>
  <span>Try searching with "TFblade" first!</span>
  </div>
</div> */}

<div className="midContent">
<form onSubmit={submitForm}>
  <label htmlFor="searchInput">
    <input type="text" name="summonerName" placeholder="Search by summoner names" className="searchInput" value={input} required onChange={(e)=> setInput(e.target.value)}/>
  </label>
    <button type="submit" className="searchButton">{element}</button>
</form>
</div>





<div className="rotations">
  <div className="rotationContainer">
    <button onClick={arrowLeft}>ok</button>
  <div className="rotation" style={rotationStyle}>
      {
        rotation.map((champId)=>{
          return(
            <div className="eachRotation" >
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/${convertChampions(
              champId,
              champObj
            )}.png`}
            className="profImage"
            alt={convertChampions(champId, champObj)}
            // style={{height:'100px'}}
          ></img>
          <div>{convertChampions(champId, champObj)}</div>
            </div>
          )
          // <div>{convertChampions(champId, champObj)}</div>
        })
      }

  </div>
  </div>
  <div className="rotationForNewPlayers">
  {
        rotationForNewPlayers.map((champId)=>{
          return(
            <div className="eachRotation" >
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/${convertChampions(
              champId,
              champObj
            )}.png`}
            className="profImage"
            alt={convertChampions(champId, champObj)}
            // style={{height:'100px'}}
          ></img>
          <div>{convertChampions(champId, champObj)}</div>
            </div>
          )
          // <div>{convertChampions(champId, champObj)}</div>
        })
      }
  </div>
</div>

        </div>
        </div>
}
</>
    )
}

export default HomePage;