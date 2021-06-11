
const RankedInfo = ({accountInfo, rankedInfo}) => {

    
    // console.log(rankedInfo);
    const tierConvert = (tier) => {
        if (tier)
        return tier.charAt(0).toUpperCase() + tier.slice(1).toLowerCase();
    }

    return(
        <section className="rankedInfo">
        <img className = "rank" src = {`https://opgg-static.akamaized.net/images/medals/${rankedInfo.tier}_${rankedInfo.rank}.png?image=q_auto:best&amp;v=1`} alt={`${rankedInfo.tier} tier`}/>
        <div className = "ranked">
            <span>Ranked Solo</span>
            <span className="tier">{tierConvert(rankedInfo.tier)} {rankedInfo.rank}</span>
            <span> {rankedInfo.leaguePoints} LP / {rankedInfo.wins}W {rankedInfo.losses}L</span>
            
            <span>Win Rate: {Math.floor((rankedInfo.wins / (rankedInfo.wins + rankedInfo.losses)) * 100)}%</span>
            <span>Summoner level: {accountInfo.summonerLevel}</span>
        </div>
        </section>
    )
}

export default RankedInfo;