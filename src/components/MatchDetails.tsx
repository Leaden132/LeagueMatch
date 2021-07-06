import convertChampions from "./convertChampions";
import convertRunes from "./convertRunes";
import convertSummoners from "./convertSummoners";
import { useHistory, Link } from "react-router-dom";
import opacity from "../assets/opacity.png";
import convertItemStat from "./convertItemStat";

const MatchDetails = ({
  playerInfo,
  championInfo,
  accountInfo,
  matchInfo,
  itemObj,
  champObj,
  runeArray,
}: {
  //These are all API calls with 100+ object keys. Not most efficient to build interfaces for each of them.
  playerInfo: any;
  championInfo: any;
  accountInfo: any;
  matchInfo: any;
  itemObj: any;
  champObj: any;
  runeArray: any;
}) => {
  const history = useHistory();
  const metaDataArray = matchInfo.map((game: any) => {
    return {
      date: game.gameCreation,
      duration: game.gameDuration,
      gameMode: game.gameMode,
      gameType: game.gameType,
      mapId: game.mapId,
      platform: game.platformId,
      seasonId: game.seasonId,
    };
  });

  const getDate = (playedTime: number) => {
    let date = new Date();
    let nowDate = date.getTime();
    let playedTimeStamp = nowDate - playedTime;
    let playedDate = 0;
    if (playedTimeStamp < 60000) {
      playedDate = 1;
      return "2 minutes ago";
    } else if (playedTimeStamp < 3600000) {
      playedDate = playedTimeStamp / 60000;
      return `${Math.floor(playedDate)} minutes ago`;
    } else if (playedTimeStamp < 86400000) {
      playedDate = playedTimeStamp / 3600000;
      return `${Math.floor(playedDate)} hours ago`;
    } else {
      playedDate = playedTimeStamp / 86400000;
      return `${Math.floor(playedDate)} days ago`;
    }
  };

  const metaConvert = (info: string) => {
    if (info === "CLASSIC") {
      return "Ranked Solo";
    } else {
      return info;
    }
  };

  const convertDuration = (info: number) => {
    const durationRemainder = info % 60;
    return `${Math.floor(info / 60)} : ${durationRemainder}`;
  };

  const kdaCalc = (k: number, d: number, a: number) => {
    if ((k + a) / d === Infinity) {
      return (
        <>
          <p>Perfect</p>
          <p className="kdaAlign">KDA</p>
        </>
      );
    }
    return ((k + a) / d).toFixed(1);
  };

  return (
    <div className="matchHistory">
      {playerInfo.map((player: any, index: number) => {
        let champion = championInfo[index];
        let win = false;
        for (let i = 0; i < 10; i++) {
          if (player[i].accountId === accountInfo.accountId) {
            if (champion[i].stats.win) {
              win = true;
            } else {
              win = false;
            }
          }
        }
        return (
          <div
            className={`match ${win ? "win" : "loss"}`}
            key={`player${index}`}
          >
            <div className={`game`}>
              <div className="metaInfo">
                <span title="match mode">
                  {metaConvert(metaDataArray[index].gameMode)}
                </span>
                <span className="matchOutcome" title="match outcome">{`${
                  win ? "Victory" : "Defeat"
                }`}</span>
                <span title="match played date">
                  {getDate(metaDataArray[index].date)}
                </span>
                <span className="gameDuration" title="match duration">
                  {convertDuration(metaDataArray[index].duration)}
                </span>
              </div>
              {champion.map((champ: any, i: number) => {
                let itemArray = [];
                for (let i = 0; i < 7; i++) {
                  let itemNum = champ.stats[`item${i}`];
                  const imgSrc =
                    champ.stats[`item${i}`] !== 0
                      ? `https://ddragon.bangingheads.net/cdn/11.10.1/img/item/${itemNum}.png`
                      : opacity;
                  if (i < 3) {
                    if (itemObj[itemNum]) {
                      itemArray.push(
                        <div className="item-upper" key={`index-${i}`}>
                          <img
                            src={imgSrc}
                            onError={(e: any) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://ddragon.bangingheads.net/cdn/11.10.1/img/item/1055.png";
                            }}
                            alt="items"
                          />
                          <span className="toolTip">
                            <span className="itemName">
                              {itemObj[itemNum].name}
                            </span>
                            {Object.keys(itemObj[itemNum].stats).map(
                              (stat, i) => (
                                <li className="itemStats" key={i}>
                                  <span>
                                    {convertItemStat(stat)} :{" "}
                                    {itemObj[itemNum].stats[stat]}
                                  </span>
                                </li>
                              )
                            )}
                            <br></br>
                            {itemObj[itemNum].plaintext}
                            <br></br>
                            <span className="itemCost">
                              Cost: {itemObj[itemNum].gold.total}
                            </span>{" "}
                          </span>
                        </div>
                      );
                    } else {
                      itemArray.push(
                        <div className="item-upper" key={`index-${i}`}>
                          <img
                            src={imgSrc}
                            onError={(e: any) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://ddragon.bangingheads.net/cdn/11.10.1/img/item/1055.png";
                            }}
                            alt="items"
                          />
                        </div>
                      );
                    }
                  } else if (i >= 3 && i < 6) {
                    if (itemObj[itemNum]) {
                      itemArray.push(
                        <div className="item-lower" key={`index${i}`}>
                          <img
                            src={imgSrc}
                            onError={(e: any) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://ddragon.bangingheads.net/cdn/11.10.1/img/item/1055.png";
                            }}
                            alt="items"
                          />
                          <span className="toolTip">
                            <span className="itemName">
                              {itemObj[itemNum].name}
                            </span>
                            {Object.keys(itemObj[itemNum].stats).map(
                              (stat, i) => (
                                <li className="itemStats" key={i}>
                                  <span>
                                    {convertItemStat(stat)} :{" "}
                                    {itemObj[itemNum].stats[stat]}
                                  </span>
                                </li>
                              )
                            )}
                            <br></br>
                            {itemObj[itemNum].plaintext}
                            <br></br>
                            <span className="itemCost">
                              Cost: {itemObj[itemNum].gold.total}
                            </span>{" "}
                          </span>
                        </div>
                      );
                    } else {
                      itemArray.push(
                        <div className="item-lower" key={`index-${i}`}>
                          <img
                            src={imgSrc}
                            onError={(e: any) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://ddragon.bangingheads.net/cdn/11.10.1/img/item/1055.png";
                            }}
                            alt="items"
                          />
                        </div>
                      );
                    }
                  } else {
                    if (itemObj[itemNum]) {
                      itemArray.push(
                        <div className="trinket" key={`inde${i}`}>
                          <img
                            src={imgSrc}
                            onError={(e: any) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://ddragon.bangingheads.net/cdn/11.10.1/img/item/1055.png";
                            }}
                            alt="items"
                          />
                          <span className="toolTip">
                            {itemObj[itemNum].name}
                            <br></br>
                            {itemObj[itemNum].plaintext}
                          </span>
                        </div>
                      );
                    } else {
                      itemArray.push(
                        <div className="trinket" key={`index-${i}`}>
                          <img
                            src={imgSrc}
                            onError={(e: any) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://ddragon.bangingheads.net/cdn/11.10.1/img/item/1055.png";
                            }}
                            alt="items"
                          />
                        </div>
                      );
                    }
                  }
                }
                return (
                  <div key={`blue${i}`} className="gameInfo">
                    {player[i].accountId === accountInfo.accountId && (
                      <div className={`userPlayInfo`}>
                        <div className="champNameContainer">
                          <div className="champContainer">
                            <Link to={`/champions/${convertChampions(champ.championId, champObj)}`}>
                            <img
                              src={`https://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/${convertChampions(
                                champ.championId,
                                champObj
                              )}.png`}
                              className="championImage"
                              alt={convertChampions(champ.championId, champObj)}
                            ></img>
                            </Link>
                          </div>
                          <p>{convertChampions(champ.championId, champObj)}</p>
                        </div>
                        <div className="summonerSpell">
                          <div className="spell spell1">
                            <img
                              src={`https://ddragon.leagueoflegends.com/cdn/11.12.1/img/spell/${convertSummoners(
                                champ.spell1Id
                              )}.png`}
                              alt="summoner spells"
                            ></img>
                            <span className="toolTip">This is SPELL!</span>
                          </div>
                          <div className="spell spell2">
                            <img
                              src={`https://ddragon.leagueoflegends.com/cdn/11.12.1/img/spell/${convertSummoners(
                                champ.spell2Id
                              )}.png`}
                              alt="summoner spells"
                            ></img>
                            <span className="toolTip">This is SPELL!</span>
                          </div>
                        </div>
                        <div className="runes">
                          <div className="rune">
                            <img
                              src={`https://ddragon.canisback.com/img/${convertRunes(
                                champ.stats.perk0,
                                runeArray
                              )}`}
                              alt={`${convertRunes(
                                champ.stats.perk0,
                                runeArray
                              )}`}
                              className="runeImage"
                              title="Main Rune"
                            ></img>
                          </div>
                          <div className="rune">
                            <img
                              src={`https://ddragon.canisback.com/img/${convertRunes(
                                champ.stats.perkSubStyle,
                                runeArray
                              )}`}
                              alt={`${champ.stats.perkSubStyle}`}
                              className="subRuneImage"
                              title="Sub Rune"
                            ></img>
                          </div>
                        </div>
                        <div className="kda">
                          <span
                            className="kdaTitle"
                            title="Kills / Deaths / Assists"
                          >
                            K/D/A
                          </span>
                          <span>
                            {champ.stats.kills} / {champ.stats.deaths} /{" "}
                            {champ.stats.assists}
                          </span>
                          <div className="kdaValue">
                            <span>
                              {kdaCalc(
                                champ.stats.kills,
                                champ.stats.deaths,
                                champ.stats.assists
                              )}
                            </span>
                          </div>
                        </div>
                        <ul className="levelDetail">
                          <li>level {champ.stats.champLevel}</li>
                          <li className="kdaAlign">
                            {champ.stats.totalMinionsKilled} CS
                          </li>
                          <li></li>
                        </ul>

                        <div className="items">{itemArray}</div>
                      </div>
                    )}

                    <li className="otherPlayerInfo">
                      <Link to={`/champions/${convertChampions(
                          champ.championId,
                          champObj
                        )}`}>
                      <img
                        src={`https://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/${convertChampions(
                          champ.championId,
                          champObj
                        )}.png`}
                        alt={convertChampions(champ.championId, champObj)}
                      ></img>
                      </Link>
                      <button
                        className="otherUsers"
                        onClick={() => {
                          history.push(
                            `/match/${encodeURI(player[i].summonerName)}`
                          );
                        }}
                      >
                        {player[i].summonerName}
                      </button>
                    </li>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MatchDetails;
