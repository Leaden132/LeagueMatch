import { useHistory } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  const [input, setInput] = useState("");
  const history = useHistory();
  const element = <FontAwesomeIcon icon={faSearch} />;
  const infoElement = <FontAwesomeIcon icon={faInfoCircle} />;
  const [newToGame, setNewToGame] = useState(false);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    history.push(`/profile/${encodeURI(input)}`);
    setInput("");
  };

  const infoButtonClick = () => {
    setNewToGame(!newToGame);
  };

  return (
    <>
      <div className="main">
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
              <button type="submit" className="searchButton">
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
      </div>
    </>
  );
};

export default HomePage;
