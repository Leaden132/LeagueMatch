import { Link } from 'react-router-dom';


const SearchBar = ({handleSearch}) => {


    return(
        <section className="searchBar">
      <nav>
        <ul>
          <Link to="/">home</Link>
          <li>champions</li>
          <Link to="/profile">profile</Link>
        </ul>
      </nav>




<form action="#">
  <label htmlFor="searchInput">
    Summoner Name: 
    <input type="text" name="summonerName" placeholder="Summoner Name" className="searchInput" defaultValue="TFblade"/>
  </label>
  <Link to={`/profile`}>
    <input type="submit" value="Search" onClick={handleSearch}/>
    </Link>
  
</form>
        </section>
    )
}

export default SearchBar;