import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"

const SearchBar = () => {
  const [input, setInput] = useState("");
  const history = useHistory();
  const { logout, currentUser } = useAuth();
  const [error, setError] = useState("");
  const element = <FontAwesomeIcon icon={faSearch} />;

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  let path = false;
  let loginPath = false;

  const location = useLocation<any>();
  if (location.pathname === "/") {
    path = false;
  } else {
    path = true;
  }

  if (location.pathname=== ("/login" || "/signup" )){
    loginPath = true;
  }
  else {
    loginPath = false;
  }

  let currentHome= ""
  let currentAbout=""
  let currentChampions=""
  let currentLogin=""
  if (location.pathname.includes("/champions")){
    currentHome=""
    currentAbout=""
    currentChampions="current"
    currentLogin=""
  }

  else if (location.pathname.includes("/login" || "/signup")){
    currentLogin="current"
    currentHome=""
    currentAbout=""
    currentChampions=""
  }

  else if (location.pathname.includes("/about")){
    currentHome=""
    currentAbout="current"
    currentChampions=""
    currentLogin=""
  }

  else if (location.pathname==="/"){
    currentHome="current"
    currentAbout=""
    currentChampions=""
    currentLogin=""
  }

  else {
    currentHome="current"
    currentAbout=""
    currentChampions=""
    currentLogin=""
  }

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    history.push(`/match/${encodeURI(input)}`);
    setInput("");
  };
  console.log(currentLogin);

  return (
    <section className="searchBar">
      <nav>
        <ul>
          
            <li className={`home ${currentHome}`}><Link to="/" aria-label="Move to home page">home</Link></li>
          
          
            <li className={`${currentAbout}`}><Link to="/about" aria-label="Move to about page">about</Link></li>
          
          
            <li className={`${currentChampions}`}><Link to="/champions" aria-label="Move to champions page">champions</Link></li>
          

          { currentUser ? 
          
          <li className={`${currentLogin}`} onClick={handleLogout}><Link to="/">LogOut</Link></li>
          
           : 
           <li className={`${currentLogin}`}><Link to="/login" aria-label="Move to login page">LogIn</Link></li>
         
        }

        {currentUser ? (
          <li className={`${currentLogin}`}><Link to="/profile" aria-label="Move to profile page">profile</Link></li>) : null}
          


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
