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

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    history.push(`/profile/${encodeURI(input)}`);
    setInput("");
  };

  return (
    <section className="searchBar">
      <nav>
        <ul>
          <Link to="/">
            <li className="home">home</li>
          </Link>
          <Link to="/about">
            <li>about</li>
          </Link>
          <Link to="/champions">
            <li>champions</li>
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
