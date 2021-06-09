import { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import History from './History';


const SearchBar = ({handleSearch}) => {

  // const [input, setInput] = useState('');
  // const [searchName, setSearchName] = useState('');

  // useEffect(()=>{
    
  //   const params = new URLSearchParams(window.location.search);

  //   const q = params.get('q');

  //   setSearchName(q ? q : 'qqcait');
  //   //eslint-disable-next-line
  // }, [])

  // const userSearch = (event) => {
  //   console.log(event);
  //   search = event.target.value;
  // }

  // let history = useHistory();

  // const submitAction = (event) => {
  //   event.preventDefault();
  //   setSearchName(input);

  //   History.push('/search?q=' + input);

  //   setInput('');
  // }

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
    {/* <input type="text" name="summonerName" placeholder="Summoner Name" className="searchInput" value={input} onChange={(e)=> setInput(e.target.value)}/> */}
    <input type="text" name="summonerName" placeholder="Summoner Name" className="searchInput" defaultValue="TFblade"/>
  </label>
  <Link to={`/profile`}>
    <button className="searchButton" onClick={handleSearch}>Search</button>
    </Link>
  
</form>
        </section>
    )
}

export default SearchBar;