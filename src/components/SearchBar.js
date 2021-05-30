


const SearchBar = ({handleSubmit}) => {


    return(
        <>
        <p>Summoner Name Search</p>
<form action="submit" onSubmit={handleSubmit}>
  <label htmlFor="searchInput">
    Summoner Name:
    <input type="text" name="name" placeholder="Summoner Name" className="searchInput"/>
  </label>
  <input type="submit" value="Search" />
</form>
        </>
    )
}

export default SearchBar;