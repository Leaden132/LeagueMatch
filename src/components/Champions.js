import {Link} from 'react-router-dom';

const Champions = ({champObj}) => {


  const champArray = Object.keys(champObj);
  console.log(champArray);

  return (
    <div className="championSection">
      {champArray.map((champ, index) => (
        <Link to={`/champions/${champObj[champ].id}`}>
        <div key={`champ-${index}`} className="champEachBox">
          <li className="championFlex" key={index}>
            <div className="champEachContainer">
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/${champObj[champ].id}.png`}
                alt={champObj[champ].id}
                className="championEach"
              ></img>
            </div>
            <div className="champEachInfo">
              <span className="champName">{champObj[champ].id}</span>
              <span>{champObj[champ].title}</span>
              <span>{champObj[champ].tags.map((tag)=>{
                  return tag
              })}</span>
              <span>{champObj[champ].partype}</span>
              <span>{champObj[champ].title}</span>
            </div>
          </li>
        </div>
        </Link>
      ))}
    </div>
  );
};

export default Champions;
