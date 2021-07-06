import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import firebase from "../config/firebase";

// interface FirebaseInfo {
//   key: string;
//   name: any;
// }

const Profile = () => {
  const { currentUser } = useAuth();
  const [userListInfo, setUserListInfo] = useState<Array<object>>();
  const [userSearchInfo, setUserSearchInfo] = useState<Array<object>>();

  useEffect(() => {
    const userInfoRef = firebase.database().ref(`${currentUser.uid}/championList`);

    userInfoRef.on("value", (response) => {
      const userInfo = response.val();
      const allUserInfo = [];

      for (let key in userInfo) {
        allUserInfo.unshift({
          key: key,
          name: userInfo[key],
        });
      }

      allUserInfo.shift();

      if (allUserInfo.length) {
        setUserListInfo(allUserInfo);
      }
    });


    const userSearchRef = firebase.database().ref(`${currentUser.uid}/searches`);

    userSearchRef.on("value", (response) => {
      const searchInfo = response.val();
      const allSearchInfo = [];

      for (let key in searchInfo) {
        allSearchInfo.unshift({
          key: key,
          name: searchInfo[key],
        });
      }

      allSearchInfo.shift();

      if (allSearchInfo.length) {
        setUserSearchInfo(allSearchInfo);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemoveChamp = (key:string) => {
    const userInfoRef = firebase.database().ref(`${currentUser.uid}/championList`);
    userInfoRef.child(key).remove();
  }

  const getDate = (createdTime: number) => {
    let date = new Date();
    let nowDate = date.getTime();
    let createdTimeStamp = nowDate - createdTime;
    let createdDate = 0;
    if (createdTimeStamp < 60000) {
      createdDate = 1;
      return "2 minutes ago";
    } else if (createdTimeStamp < 3600000) {
      createdDate = createdTimeStamp / 60000;
      return `${Math.floor(createdDate)} minutes ago`;
    } else if (createdTimeStamp < 86400000) {
      createdDate = createdTimeStamp / 3600000;
      return `${Math.floor(createdDate)} hours ago`;
    } else {
      createdDate = createdTimeStamp / 86400000;
      return `${Math.floor(createdDate)} days ago`;
    }
  };

  return (
    <>
      {currentUser ? (
        <section className="profile">
          <h4>Display Name: {currentUser.displayName}</h4>

          <div className="championListContainer">
            <div className="recentSearch">
              <h3>Recent Searches</h3>
              <div className="recentSearchContainer">
                {
                  userSearchInfo ? (
                    <ul>
                    {userSearchInfo.map((search:any, index)=>{
                      return(
                        
                        <li className="eachSearch" key={index}>
                          <Link to={`/match/${encodeURI(search.name.summonerName)}`}>
                          <span>{search.name.summonerName}</span>
                          <span className="toolTip">searched {getDate(search.name.timeStamp)}</span>
                          </Link>
                          </li>
                          
                      )

                    })}
                    </ul>
                  ) : <h4>No search history</h4>
                }
              </div>
            </div>
            <h3>Favourite Champions List</h3>
            <div className="championList">
              {userListInfo ? (
                <>
                  {userListInfo.map((user: any, index) => {
                    return (
                      
                        <div key={`champ-${index}`} className="champEachBox">
                          <li className="championFlex">
                          
                            {/* <div className="champEachContainer"> */}
                            <Link
                        to={`/champions/${user.name.champName}`}
                        key={`link-${index}`}
                        className="champEachContainer"
                      >
                              <img
                                src={`https://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/${user.name.champName}.png`}
                                alt={user.name.champName}
                                className="championEach"
                              ></img>
                              </Link>
                            {/* </div> */}
                            
                            <div className="champEachInfo">
                              <span className="champName">
                                {user.name.champName}
                              </span>
                              <div className="buttonContainer">
                              {/* <button>Add</button> */}
                              <button onClick={()=>handleRemoveChamp(user.key)}>Remove</button>
                              </div>
                            </div>
                          </li>
                        </div>
                      
                    );
                  })}{" "}
                </>
              ) : (
                <h4>No champions added to list yet</h4>
              )}
            </div>
          </div>
        </section>
      ) : (
        <section className="profile">No Profile</section>
      )}
    </>
  );
};

export default Profile;
