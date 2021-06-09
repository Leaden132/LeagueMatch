import {useHistory} from 'react-router-dom'
import {useState} from 'react'


const HomePage = ({handleSearch}) => {
  const [input, setInput] = useState('');
  const history = useHistory();
  
  const submitForm = (e) => {
    e.preventDefault()
    history.push(`/profile/${input}`); 
  }

    return (
        <div className="homePage">
            <h1>League Stats</h1>

            <form onSubmit={submitForm}>
  <label htmlFor="searchInput">
    Summoner Name: 
    <input type="text" name="summonerName" placeholder="Summoner Name" className="searchInput" value={input} onChange={(e)=> setInput(e.target.value)}/>
  </label>
    <button type="submit" className="searchButton">Search</button>
</form>


        </div>
    )
}

export default HomePage;