import { useHistory } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../contexts/AuthContext"
import firebase from "../config/firebase";
import { useEffect } from "react";


const HomePage = () => {
  const [input, setInput] = useState("");
  const history = useHistory();
  const element = <FontAwesomeIcon icon={faSearch} aria-hidden="true"/>;
  const infoElement = <FontAwesomeIcon icon={faInfoCircle} aria-hidden="true"/>;
  const [newToGame, setNewToGame] = useState(false);
  const [duplicateCheck, setDuplicateCheck] = useState(false);
  const { currentUser } = useAuth();


  useEffect(()=>{
    if(currentUser) {
      const userInfoRef = firebase.database().ref((`${currentUser.uid}/searches`));
        userInfoRef.on("value", (response)=>{
        const userInfoRes = response.val();
  
  
        const userInfoArray = [];
  
        for (let key in userInfoRes) {
          userInfoArray.unshift({
            key: key,
            details: userInfoRes[key],
          });
        }
  
        for (let i=0; i < userInfoArray.length; i++) {
          if (userInfoArray[i].details.summonerName === input.toString().trim()){
            setDuplicateCheck(true);
          }
        }
      })
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if(currentUser){
      const userInfoRef = firebase.database().ref((`${currentUser.uid}/searches`));


      if (!duplicateCheck) {
        userInfoRef.push({
          
          summonerName:input,
          timeStamp: Date.now()
        
        })
  
        
      }
    }

    
    
  
    
    history.push(`/match/${encodeURI(input)}`);
  };

  const infoButtonClick = () => {
    setNewToGame(!newToGame);
  };

  return (
    <>
      <section className="main">
        <div className="background"></div>
        <div className="homePage">
          <div className="mainTitle">
            <h1>League Matches</h1>
          </div>
          <div className="midContent">
            <form onSubmit={submitForm}>
              <label htmlFor="searchInput">
                <input
                  type="text"
                  name="summonerName"
                  placeholder="Search by summoner names"
                  className="searchInput"
                  value={input}
                  required
                  onChange={(e) => setInput(e.target.value)}
                />
              </label>
              <button type="submit" className="searchButton" aria-hidden="true">
                {element}
              </button>
            </form>
          </div>

          <div className="infoBox">
            <button className="infoButton" onClick={infoButtonClick}>
              New to League of Legends?
            </button>

            {newToGame ? (
              <div className="info">
                <p className="infoTitle">
                  {infoElement} Here are some summoner names to get you familiar
                  with our search function:
                </p>
                <p>TFblade, Doublelift, Trick2G</p>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
