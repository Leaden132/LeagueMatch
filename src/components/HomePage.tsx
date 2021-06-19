import {useHistory} from 'react-router-dom'
import {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faInfoCircle} from '@fortawesome/free-solid-svg-icons'
// import axios from 'axios'
// import PulseLoader from 'react-spinners/PulseLoader';
// import { css } from "@emotion/react";



const HomePage = () => {
  const [input, setInput] = useState('');
  const history = useHistory();
  const element = <FontAwesomeIcon icon={faSearch} />
  const infoElement = <FontAwesomeIcon icon={faInfoCircle} />
  const [newToGame, setNewToGame] = useState(false);
  // const [rotation, setRotation] = useState([5,27,44,51,75,76,81,82,105,107,117,121,126,147,238]);
  // const [rotationForNewPlayers, setRotationForNewPlayers] = useState([18,81,92,141,37,238,19,45,25,64]);
  // const [loading, setLoading] = useState(true);
  // const [champObj, setChampObj] = useState<any>({});
  // const [rotationStyle, setRotationStyle] = useState<any>({});
  // const override = css`
  // display: block;
  // margin: 0 auto;
  // margin-top:300px;
  // border-color: red;
  // `
  // const apiKey = process.env.REACT_APP_apiKey;


  //There is problem with Riot API regarding Rotation champions, later update to correct api call! 
  // useEffect(()=>{
  //   axios({
  //     method:'GET',
  //     url: 'https://ddragon.leagueoflegends.com/cdn/11.4.1/data/en_US/champion.json',
  //     responseType: 'json',
  //   })
  //   .then((res)=> {
  //     console.log(res);
  //     setChampObj(res.data.data);
  //     setRotation([5,27,44,51,75,76,81,82,105,107,117,121,126,147,238]);
  //   setRotationForNewPlayers([18,81,92,141,37,238,19,45,25,64]);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 300);
  //   })
    
  // },[])



  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    history.push(`/profile/${encodeURI(input)}`);
    setInput('');
  }

  const infoButtonClick = () => {
    
    setNewToGame(!newToGame);
  }

  


    return (
      <>

<div className="main">
        <div className="background">
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

<div className="infoBox">
  <button className="infoButton" onClick={infoButtonClick}>New to League of Legends?</button>

  {newToGame ?
  <div className="info">
    <p className="infoTitle">{infoElement} Here are some summoner names to get you familiar with our search function:</p>
    <p>TFblade, Doublelift, Trick2G</p>
  </div>

  :

  null
}
  </div>


{/* 
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
          ></img>
          <div>{convertChampions(champId, champObj)}</div>
            </div>
          )
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
          ></img>
          <div>{convertChampions(champId, champObj)}</div>
            </div>
          )
        })
      }
  </div>
</div> */}

        </div>
        </div>
{/* } */}
</>
    )
}

export default HomePage;