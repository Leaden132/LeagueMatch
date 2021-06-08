


const SearchBar = ({handleSubmit}) => {


    return(
        <section className="searchBar">
      <nav>
        <ul>
          <li>home</li>
          <li>champions</li>
        </ul>
      </nav>




<form action="submit" onSubmit={handleSubmit}>
  <label htmlFor="searchInput">
    Summoner Name: 
    <input type="text" name="summonerName" placeholder="Summoner Name" className="searchInput" defaultValue="TFblade"/>
  </label>
  <input type="submit" value="Search" />
</form>
        </section>
    )
}

export default SearchBar;