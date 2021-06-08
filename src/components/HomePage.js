import {Link} from 'react-router-dom'

const HomePage = ({handleSearch}) => {

    return (
        <div className="homePage">
            <h1>League Stats</h1>

            <form action="#">
  <label htmlFor="searchInput">
    <input type="text" name="summonerName" placeholder="Search for Summoner Names" className="searchInput" defaultValue="TFblade"/>
  </label>
  <Link to={`/profile`}>
    <input type="submit" value="Search" onClick={handleSearch}/>
    </Link>
  
    </form>


        </div>
    )
}

export default HomePage;