


const SearchBar = ({handleSubmit}) => {


    return(
        <>
        <p>Summoner Name Search</p>
<form action="submit" onSubmit={handleSubmit}>
  <label htmlFor="searchInput">
    Summoner Name:
    <input type="text" name="summonerName" placeholder="Summoner Name" className="searchInput" defaultValue="TFblade"/>
  </label>
  <input type="submit" value="Search" />
</form>
        </>
    )
}

export default SearchBar;