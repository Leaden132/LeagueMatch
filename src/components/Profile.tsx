import React, { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import firebase from "../config/firebase";

interface FirebaseInfo {
    key: string;
    name: any;
}

const Profile = () => {

    const { currentUser, logout } = useAuth()
    const [userListInfo, setUserListInfo] = useState<Array<object>>();



    // console.log(currentUser);
    // console.log(currentUser.uid);

    useEffect(()=>{
        const userInfoRef = firebase.database().ref(currentUser.uid);

        userInfoRef.on("value", (response)=>{
            const userInfo = response.val();

            console.log(userInfo);

            const allUserInfo = [];

            for (let key in userInfo){
                allUserInfo.unshift({
                    key: key,
                    name: userInfo[key]
                })
            }

            console.log(allUserInfo);

            allUserInfo.shift();

            setUserListInfo(allUserInfo)

        })

    }, [])


    return (
        <>
        {currentUser ? 
        <section className="profile championSection">
           
        <p>Email: {currentUser.email}</p>
        <p></p>

        {userListInfo ? <div className="championList">{userListInfo.map((user:any, index)=>{
            return (
<div key={index}>
                    
                   
                   <Link to={`/champions/${user.name.champName}`} key={`link-${index}`}>
                   <div key={`champ-${index}`} className="champEachBox">
                     <li className="championFlex">
                       <div className="champEachContainer">
                         <img
                           src={`https://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/${user.name.champName}.png`}
                           alt={user.name.champName}
                           className="championEach"
                         ></img>
                       </div>
                       <div className="champEachInfo">
                         <span className="champName">{user.name.champName}</span>
                         {/* <span className="champTitle">{champObj[champ].title}</span>
                         <span>{champObj[champ].tags.map((tag:string, i:number)=>{
                             return (
                               <img key={`champImage-${i}`} className="classes" src={`https://universe.leagueoflegends.com/images/role_icon_${tag.toLowerCase()}.png`} alt={`${tag} icon`}></img>
                               )
                         })}</span> */}
                       </div>
                     </li>
                   </div>
                   </Link>

            </div>
)
        })}</div> : <h2>No champions added to list yet</h2>}
   
        </section>
         : <section className="profile">No Profile</section>}
        </>
   
    )
}

export default Profile;