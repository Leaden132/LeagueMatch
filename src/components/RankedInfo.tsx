
interface Props {
    accountInfo: object;
    rankedInfo: object;
}

const RankedInfo: React.FC<Props> = ({accountInfo, rankedInfo}:any) => {

    console.log(accountInfo);
    console.log(rankedInfo);
    const tierConvert = (tier:string) => {
        if (tier)
        return tier.charAt(0).toUpperCase() + tier.slice(1).toLowerCase();
    }

    const imgURL = rankedInfo.tier && rankedInfo.rank ? `https://opgg-static.akamaized.net/images/medals/${rankedInfo.tier}_${rankedInfo.rank}.png?image=q_auto:best&amp;v=1` : undefined;

    return(
        <section className="rankedInfo">
        {imgURL ? 
        <img className = "rank" src = {`https://opgg-static.akamaized.net/images/medals/${rankedInfo.tier}_${rankedInfo.rank}.png?image=q_auto:best&amp;v=1`} alt={`${rankedInfo.tier} tier`}/>
            :
            <img className = "rank" src = {`https://ddragon.bangingheads.net/other/emblems/unranked_1.png`} alt={`Unranked`}/>
}
        <div className = "ranked">
            {
                imgURL ?
                <>
                <span>Ranked Solo</span>
                <span className="tier">{tierConvert(rankedInfo.tier)} {rankedInfo.rank}</span>
                <span> {rankedInfo.leaguePoints} LP / {rankedInfo.wins}W {rankedInfo.losses}L</span>
                
                <span>Win Rate: {Math.floor((rankedInfo.wins / (rankedInfo.wins + rankedInfo.losses)) * 100)}%</span>
                <span>Summoner level: {accountInfo.summonerLevel}</span>
                </>
                :
                <>
                <span className="unranked">Summoner level: {accountInfo.summonerLevel}</span>
                <span>This player has not yet</span>
                <span>played ranked games</span>
                
</>
            }
        </div>
        </section>
    )
}

export default RankedInfo;