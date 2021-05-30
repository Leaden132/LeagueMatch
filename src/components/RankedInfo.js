
const RankedInfo = ({rankedInfo}) => {



    return(
        <>
        <div className = "ranked">
        <p>Rank: {rankedInfo.tier} {rankedInfo.rank} {rankedInfo.leaguePoints} lp</p>
        <img className = "rank" src = {`https://opgg-static.akamaized.net/images/medals/${rankedInfo.tier}_${rankedInfo.rank}.png?image=q_auto:best&amp;v=1`}/>




        <p>Win Rate: {rankedInfo.wins} wins / {rankedInfo.losses} losses - {Math.floor((rankedInfo.wins / (rankedInfo.wins + rankedInfo.losses)) * 100)}% Win Rate </p>
        </div>
        <div className = "good">
        </div>
        </>
    )
}

export default RankedInfo;