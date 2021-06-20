import {Link} from 'react-router-dom';
import {useState} from 'react';
import allClass from '../assets/all_classes.png'

const Champions = ({champObj}:any) => {

  const [champFilter, setChampFilter] = useState(''); 
  const [classFilter, setClassFilter] = useState('AllClasses');
  const champArray = Object.keys(champObj);

  const filterByClass = (classFiltering:string, champName:string) => {
    
    if (classFiltering === 'AllClasses'){
      return true;
    }
    else{
      return champObj[champName].tags.includes(classFiltering);
    }

  }

  const handleClick = (event:any) => {
    if(event.target.parentElement.classList[0] === 'classChoiceContainer'){
      setClassFilter(event.target.classList[0]);
      for (let i=0; i<7; i++){
        event.target.parentElement.children[i].style.border='';
        event.target.parentElement.children[i].style.boxShadow='';
      }
      event.target.style.border = '2px solid violet';
      event.target.style.boxShadow = '0px 4px 4px #74b1bf';

    }
    else{
      setClassFilter(event.target.parentElement.classList[0]);
      for (let i=0; i<7; i++){
        event.target.parentElement.parentElement.children[i].style.border='';
        event.target.parentElement.parentElement.children[i].style.boxShadow='';
      }
      event.target.parentElement.style.border = '2px solid violet';
      event.target.parentElement.style.boxShadow = '0px 4px 4px #74b1bf';
    }
  }


  return (
    <div className="championSection">
            <div className="wrapper">
            <div className="championSectionTitle"> 
            <h2>Champions</h2>
        </div>
          <div className="filterContainer">
        <div>
            <input type="text" placeholder={'Search for champion names'} onChange={(event)=>{setChampFilter(event.target.value)}} value={champFilter}></input>
          </div>

          <div className="classChoiceContainer">
            <div className="AllClasses classChoice startChoice" onClick={handleClick}> <img src={allClass} alt="Any class icon"></img></div>
            <div className="Fighter classChoice" onClick={handleClick}><img src="https://universe.leagueoflegends.com/images/role_icon_fighter.png" alt="Fighter class icon"></img></div>
            <div className="Mage classChoice" onClick={handleClick}><img src="https://universe.leagueoflegends.com/images/role_icon_mage.png" alt="Mage class icon"></img></div>
            <div className="Assassin classChoice" onClick={handleClick}><img src="https://universe.leagueoflegends.com/images/role_icon_assassin.png" alt="Assassin class icon"></img></div>
            <div className="Tank classChoice" onClick={handleClick}><img src="https://universe.leagueoflegends.com/images/role_icon_tank.png" alt="Tank class icon"></img></div>
            <div className="Marksman classChoice" onClick={handleClick}><img src="https://universe.leagueoflegends.com/images/role_icon_marksman.png" alt="Marksman class icon"></img></div>
            <div className="Support classChoice endChoice" onClick={handleClick}><img src="https://universe.leagueoflegends.com/images/role_icon_support.png" alt="Support class icon"></img></div>
          </div>
          </div>
              <div className="championSectionContainer">




       {champArray.filter((champName, index)=>(champName.toLowerCase().includes(champFilter.toLowerCase()))).filter((champName)=>filterByClass(classFilter, champName)).map((champ, index) => {

         return(
        
        <Link to={`/champions/${champObj[champ].id}`} key={`link-${index}`}>
        <div key={`champ-${index}`} className="champEachBox">
          <li className="championFlex">
            <div className="champEachContainer">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/${champObj[champ].id}.png`}
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
                    )
              })}</span>
            </div>
          </li>
        </div>
        </Link>
      )})}
      </div>
    </div>
    </div>
  );
};

export default Champions;
