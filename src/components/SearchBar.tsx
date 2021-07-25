import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"
import firebase from "../config/firebase";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const history = useHistory();
  const { logout, currentUser, searchErrorSet } = useAuth();
  const [error, setError] = useState("");
  const element = <FontAwesomeIcon icon={faSearch} />;
  const [duplicateCheck, setDuplicateCheck] = useState(false);
  

  
  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
      console.log(error)
    }
  }

  let path = false;

  const location = useLocation<any>();
  if (location.pathname === "/") {
    path = false;
  } else {
    path = true;
  }

  const navObject = {
    currentHome: '',
    currentAbout: '',
    currentChampions: '',
    currentLogin: '',
    currentProfile: '',
  }

  const currentNavObject = {
    currentHome: '',
    currentAbout: '',
    currentChampions: '',
    currentLogin: '',
    currentProfile: '',
  }



  if (location.pathname.includes("/champions")){
    Object.assign(currentNavObject, navObject, {currentChampions:"current"})
  }

  else if (location.pathname==="/login"){
    Object.assign(currentNavObject, navObject, {currentLogin:"current"})
  }

  else if (location.pathname==="/signup"){
    Object.assign(currentNavObject, navObject, {currentLogin:"current"})
  }

  else if (location.pathname.includes("/about")){
    Object.assign(currentNavObject, navObject, {currentAbout:"current"})
  }

  else if (location.pathname==="/"){
    Object.assign(currentNavObject, navObject, {currentHome:"current"})
  }
  
  else if (location.pathname==="/profile"){
    Object.assign(currentNavObject, navObject, {currentProfile:"current"})
  }

  else {
    Object.assign(currentNavObject, navObject, {currentHome:"current"})
  }


  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();

    if(currentUser){
    const userInfoRef = firebase.database().ref((`${currentUser.uid}/searches`));
    console.log(Date.now());

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


    if (!duplicateCheck) {
      userInfoRef.push({
        
        summonerName:input,
        timeStamp: Date.now()
      
      })
    }
  }

  searchErrorSet(false);

    history.push(`/match/${encodeURI(input)}`);
    setInput("");
  };


  return (
    <section className="searchBar">
      <nav>
        <ul>
            <li className={`home ${currentNavObject.currentHome}`}><Link to="/" aria-label="Move to home page">home</Link></li>
            <li className={`${currentNavObject.currentAbout}`}><Link to="/about" aria-label="Move to about page">about</Link></li>
            <li className={`${currentNavObject.currentChampions}`}><Link to="/champions" aria-label="Move to champions page">champions</Link></li>
          
          { currentUser ? 
            null
           : 
           <li className={`${currentNavObject.currentLogin}`}><Link to="/login" aria-label="Move to login page">LogIn</Link></li>}

        {currentUser ? (
          <>
          <li className={`${currentNavObject.currentProfile}`}><Link to="/profile" aria-label="Move to profile page">profile</Link></li>
          <li className={`${currentNavObject.currentLogin}`} onClick={handleLogout}><Link to="/">LogOut</Link></li>
          </>) : null}
          
        </ul>
      </nav>

      {path ? (
        <form onSubmit={submitForm}>
          <label htmlFor="searchInput">
            <input
              type="text"
              name="summonerName"
              placeholder="Summoner Name"
              className="searchInput"
              value={input}
              required
              onChange={(e) => setInput(e.target.value)}
            />
          </label>
          <button type="submit" className="searchButton">
            {element}
          </button>
        </form>
      ) : null}
    </section>
  );
};

export default SearchBar;
