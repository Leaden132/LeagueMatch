
const RankedInfo = ({accountInfo, rankedInfo}) => {

    // console.log(accountInfo);

    return(
        <section className="rankedInfo">
        <p>Level: {accountInfo.summonerLevel}</p>
        <div className = "ranked">
        <p>Rank: {rankedInfo.tier} {rankedInfo.rank} {rankedInfo.leaguePoints} lp</p>
        <img className = "rank" src = {`https://opgg-static.akamaized.net/images/medals/${rankedInfo.tier}_${rankedInfo.rank}.png?image=q_auto:best&amp;v=1`} alt={`${rankedInfo.tier} tier`}/>




        <p>Win Rate: {rankedInfo.wins} wins / {rankedInfo.losses} losses - {Math.floor((rankedInfo.wins / (rankedInfo.wins + rankedInfo.losses)) * 100)}% Win Rate </p>
        </div>
        <div className = "good">
        </div>
        </section>
    )
}

export default RankedInfo;