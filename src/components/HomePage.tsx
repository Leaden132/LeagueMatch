import {useHistory} from 'react-router-dom'
import {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'



const HomePage = () => {
  const [input, setInput] = useState('');
  const history = useHistory();
  const element = <FontAwesomeIcon icon={faSearch} />

  const submitForm = (e: React.FormEvent) => {
    console.log(e);
    e.preventDefault();
    history.push(`/profile/${input.replace(/\s+/g, '')}`);

  }

    return (
<div className="main">
        <div className="background">
          {/* <img src="http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gwen_0.jpg"></img> */}
        </div>

        <div className="homePage">
          <div className="mainTitle">
            <h1>League Matches</h1>
          </div>

<div className="midContent">
<form onSubmit={submitForm}>
  <label htmlFor="searchInput">
    <input type="text" name="summonerName" placeholder="Search by summoner names" className="searchInput" value={input} required onChange={(e)=> setInput(e.target.value)}/>
  </label>
    <button type="submit" className="searchButton">{element}</button>
</form>
</div>



        </div>
        </div>
    )
}

export default HomePage;