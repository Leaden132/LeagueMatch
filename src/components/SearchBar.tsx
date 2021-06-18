import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchBar = () => {

  const [input, setInput] = useState('');
  const history = useHistory();
  const element = <FontAwesomeIcon icon={faSearch} />

    const submitForm = (e: React.FormEvent) => {
      e.preventDefault()
      history.push(`/profile/${encodeURI(input)}`);
    }


    return(
        <section className="searchBar">
      <nav>
        <ul>
          <Link to="/"><li className="home">home</li></Link>
          <Link to="/about"><li>about</li></Link>
          <Link to="/champions"><li>champions</li></Link>
          {/* <Link to="/profile">profile</Link> */}
        </ul>
      </nav>

<form onSubmit={submitForm}>
  <label htmlFor="searchInput">
    <input type="text" name="summonerName" placeholder="Summoner Name" className="searchInput" value={input} required onChange={(e)=> setInput(e.target.value)}/>
  </label>
  <button type="submit" className="searchButton">{element}</button>
</form>


        </section>
    )
}

export default SearchBar;


// <form action="#">
//   <label htmlFor="searchInput">
//     Summoner Name: 
//     {/* <input type="text" name="summonerName" placeholder="Summoner Name" className="searchInput" value={input} onChange={(e)=> setInput(e.target.value)}/> */}
//     <input type="text" name="summonerName" placeholder="Summoner Name" className="searchInput" value={input} onChange={(e)=> setInput(e.target.value)}/>
//   </label>
//     <Link to={`/profile/${input}`}>
//     <button className="searchButton" onClick={handleSearch}>Search</button>
//     </Link>
// </form>