import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";
import { css } from "@emotion/react";
import firebase from "../config/firebase";
import {useAuth} from '../contexts/AuthContext';

const InidividualChampInfo = () => {
  const { champName } = useParams<{ champName: string }>();
  const {currentUser} = useAuth();

  const override = css`
    display: block;
    margin: 0 auto;
    margin-top: 300px;
    border-color: red;
  `;

  const champInfoStyle = {
    backgroundImage: `linear-gradient(rgba(33, 26, 56, 0.5), rgba(18, 11, 39, 0.8)), url("https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champName}_1.jpg")`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  const [loading, setLoading] = useState(true);
  const [champObj, setChampObj] = useState<any>({});
  const [shakeTrigger, setShakeTrigger] = useState('');
  const [displayComplete, setDisplayComplete] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const [duplicateCheck, setDuplicateCheck] = useState(false);
  

  useEffect(() => {
    setLoading(true);


    

    axios({
      method: "GET",
      url: `https://ddragon.leagueoflegends.com/cdn/11.12.1/data/en_US/champion/${champName}.json`,
      responseType: "json",
    }).then((res) => {
      setChampObj(res.data.data[champName]);

      if(currentUser){
        const userInfoRef = firebase.database().ref(`${currentUser.uid}/championList`);
    userInfoRef.on("value", (response)=>{
      const userInfoRes = response.val();


      const userInfoArray = [];

      for (let key in userInfoRes) {
        userInfoArray.unshift({
          key: key,
          name: userInfoRes[key],
        });
      }

      for (let i=0; i < userInfoArray.length; i++) {
        if (userInfoArray[i].name.champName === res.data.data[champName].id){
          setDuplicateCheck(true);
        }
      }
    })


  }



      setTimeout(() => {
        setLoading(false);
      }, 500);
    });

    return function cleanup(){
      if (currentUser){
        const userInfoRef = firebase.database().ref(`${currentUser.uid}/championList`);
        userInfoRef.off();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleAddList = () => {
    if (duplicateCheck) {
      // alert('this champion is already in your list!')
      setDisplayError(true);
      setShakeTrigger('duplicateError');
      setDisplayComplete(false);

      setTimeout(()=>{
        setShakeTrigger('');
      },1000)

      setTimeout(()=>{
        setDisplayError(false);
      },4000)

    }

    else {
      const userInfoRef = firebase.database().ref(`${currentUser.uid}/championList`);
      userInfoRef.push({
        champName: champName,
        champId:champObj.key
      })

      setDisplayComplete(true);
      setShakeTrigger('addCompleteTrigger');

      setTimeout(()=>{
        setDisplayComplete(false);
      },4000)
    }
  }

  return (
    <>
      {loading ? (
        <PulseLoader
          css={override}
          size={50}
          color={"#160d33"}
          loading={loading}
        />
      ) : (
        <div className="eachInfo" >
          <div className="champImageContainer">
            <div className="champBackground" style={champInfoStyle}></div>
          </div>
          <div className="wrapper">
            <div className="champInfoBoxContainer">
              <div className="champInfoBox">
                <div className="addListButtonContainer">
              {currentUser ? <button className="addListButton" onClick={handleAddList}>Add {champName} to your list</button> : null}
              {displayError ? <p className={shakeTrigger}>{champName} is already in your list!</p> : null}
              {displayComplete ? <p className={`${shakeTrigger} addComplete`}>{champName} is added to your list!</p> : null}
              </div>
                <div>
                  <div className="champEachInfoContainer">
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/${champObj.id}.png`}
                      alt={champObj.id}
                      className="championEach"
                    ></img>
                  </div>
                  
                  <div className="classContainer">
                    <h3>{champName}</h3>
                    <div>
                      {champObj.tags.map(
                        (tag: string, i: number, arr: Array<string>) => {
                          if (arr.length - 1 === i) {
                            return <span key={`tag-${i}`}>{tag}</span>;
                          } else {
                            return <span key={`tag-${i}`}>{tag} / </span>;
                          }
                        }
                      )}
                    </div>
                    <span>
                      {champObj.tags.map((tag: string, index: number) => {
                        return (
                          <img
                            className="classes"
                            src={`https://universe.leagueoflegends.com/images/role_icon_${tag.toLowerCase()}.png`}
                            alt={`${tag} icon`}
                            key={`role-${index}`}
                          ></img>
                        );
                      })}
                    </span>
                  </div>
                </div>

                <div className="skillContainer">
                  <div className="skills">
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/11.12.1/img/passive/${champObj.passive.image.full}`}
                      alt={champObj.passive.image.full}
                    ></img>
                    <span className="toolTip">
                    <span className="spellName">{champObj.passive.name}</span>
                    <br></br>
                      {champObj.passive.description.replace(
                        /(<([^>]+)>)/gi,
                        ""
                      )}
                    </span>
                    <div className="keyboard">
                      <span>P</span>
                    </div>
                  </div>
                  {champObj.spells.map((spell: any, index: number) => {

                      return (
                        <div className="skills" key={`spell-${index}`}>
                          <img
                            src={`https://ddragon.leagueoflegends.com/cdn/11.12.1/img/spell/${spell.image.full}`}
                            alt={spell.name}
                          ></img>

                          <span className="toolTip">
                          <span className="spellName">{spell.name}</span>
                            <br></br>
                            {spell.description}
                            <br></br>
                            <span className="spellCD">Cooldown: {spell.cooldownBurn}</span>
                          </span>
                          <div className="keyboard">
                          {index===0 && <span>Q</span>}
                          {index===1 && <span>W</span>}
                          {index===2 && <span>E</span>}
                          {index===3 && <span>R</span>}
                          </div>
                        </div>
                      );
                   
                  })}
                </div>
              </div>
              <p className="lore">{champObj.lore}</p>
            </div>

            <div className="champStatContainer">
              <h3>Champion Stats</h3>

              <div className="statContainer">
                <p>Attack</p>
                <div
                  className="stat attack"
                  style={{ width: `${champObj.info.attack}0%` }}
                ></div>
              </div>

              <div className="statContainer">
                <p>Defense</p>
                <div
                  className="stat defense"
                  style={{ width: `${champObj.info.defense}0%` }}
                ></div>
              </div>

              <div className="statContainer">
                <p>Magic</p>
                <div
                  className="stat magic"
                  style={{ width: `${champObj.info.magic}0%` }}
                ></div>
              </div>

              <div className="statContainer">
                <p>Difficulty</p>
                <div
                  className="stat difficulty"
                  style={{ width: `${champObj.info.difficulty}0%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InidividualChampInfo;
