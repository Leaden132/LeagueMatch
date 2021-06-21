import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const history = useHistory();
  const element = <FontAwesomeIcon icon={faSearch} />;

  let path = false;
  const location = useLocation<any>();
  if (location.pathname === "/") {
    path = false;
  } else {
    path = true;
  }

  let currentHome= ""
  let currentAbout=""
  let currentChampions=""
  if (location.pathname.includes("/champions")){
    currentHome=""
    currentAbout=""
    currentChampions="current"
  }

  else if (location.pathname.includes("/about")){
    currentHome=""
    currentAbout="current"
    currentChampions=""
  }

  else if (location.pathname==="/"){
    currentHome="current"
    currentAbout=""
    currentChampions=""
  }

  else {
    currentHome="current"
    currentAbout=""
    currentChampions=""
  }

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    history.push(`/profile/${encodeURI(input)}`);
    setInput("");
  };

  return (
    <section className="searchBar">
      <nav>
        <ul>
          <Link to="/" aria-label="Move to home page">
            <li className={`home ${currentHome}`}>home</li>
          </Link>
          <Link to="/about" aria-label="Move to about page">
            <li className={`${currentAbout}`}>about</li>
          </Link>
          <Link to="/champions" aria-label="Move to champions page">
            <li className={`${currentChampions}`}>champions</li>
          </Link>
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
