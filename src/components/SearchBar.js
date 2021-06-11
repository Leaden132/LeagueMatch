import { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';


const SearchBar = () => {

  const [input, setInput] = useState('');
  const history = useHistory();
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

    const submitForm = (e) => {
      e.preventDefault()
      history.push(`/profile/${input.replace(/\s+/g, '')}`);
    }


    return(
        <section className="searchBar">
      <nav>
        <ul>
          <Link to="/">home</Link>
          <li>champions</li>
          <Link to="/profile">profile</Link>
        </ul>
      </nav>

<form onSubmit={submitForm}>
  <label htmlFor="searchInput">
    Summoner Name: 
    <input type="text" name="summonerName" placeholder="Summoner Name" className="searchInput" value={input} onChange={(e)=> setInput(e.target.value)}/>
  </label>
    <button type="submit" className="searchButton">Search</button>
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