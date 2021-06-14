import {Link} from 'react-router-dom';

const Champions = ({champObj}:any) => {


  const champArray = Object.keys(champObj);
  console.log(champArray);

  return (
    <div className="championSection">
      <div className="wrapper">
      {champArray.map((champ, index) => (
        <Link to={`/champions/${champObj[champ].id}`} key={`link-${index}`}>
        <div key={`champ-${index}`} className="champEachBox">
          <li className="championFlex">
            <div className="champEachContainer">
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/${champObj[champ].id}.png`}
                alt={champObj[champ].id}
                className="championEach"
              ></img>
            </div>
            <div className="champEachInfo">
              <span className="champName">{champObj[champ].id}</span>
              <span className="champTitle">{champObj[champ].title}</span>
              <span>{champObj[champ].tags.map((tag:string, i:number)=>{
                  return (

                    <img key={`champImage-${i}`} className="classes" src={`https://universe.leagueoflegends.com/images/role_icon_${tag.toLowerCase()}.png`} alt={`${tag} icon`}></img>
                    // <p>{tag}</p>
                    
                    )
              })}</span>
            </div>
          </li>
        </div>
        </Link>
      ))}
      </div>
    </div>
  );
};

export default Champions;
