import { useParams } from "react-router-dom";
import { useEffect, useState} from "react";
import axios from 'axios';
import PulseLoader from 'react-spinners/PulseLoader';
import { css } from "@emotion/react";

const InidividualChampInfo = () => {
    const name = useParams();
    console.log(name.champName);
    let champName = name.champName;
    const override = css`
    display: block;
    margin: 0 auto;
    margin-top:300px;
    border-color: red;
    `

    const champInfoStyle = {
        background: `linear-gradient(rgba(33, 26, 56, 0.5), rgba(18, 11, 39, 0.8)), url("http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champName}_1.jpg")`,
        backgroundSize:'100% auto',
        backgroundRepeat:'no-repeat',
        backgroundPosition:'center, top'
      }


    const [loading, setLoading] = useState(true);
    const [champObj, setChampObj] = useState({});

    useEffect(()=>{
        setLoading(true);

      axios({
        method:'GET',
        url: `http://ddragon.leagueoflegends.com/cdn/11.12.1/data/en_US/champion/${champName}.json`,
        responseType: 'json',
      })
      .then((res)=> {
        console.log(res);
        console.log(res.data.data)
        console.log(res.data.data[champName]);
        setChampObj(res.data.data[champName])
        setTimeout(() => {
            setLoading(false);
          }, 500);
      })
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    
        return (
            <>

{loading ? 

<PulseLoader
css={override}
size={50}
color={"#160d33"}
loading={loading}
/> 

:
            <div className="eachInfo">


            <div className="champImageContainer">
          <div className="champBackground" style={champInfoStyle}></div>
        </div>
                <div className="champInfoBox">
                <p>{champName}</p>
                <p>{champObj.lore}</p>

                <div className="champEachInfoContainer">
                <img
                src={`http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/${champObj.id}.png`}
                alt={champObj.id}
                className="championEach"
              ></img>
              </div>
                </div>


                <div className="champStatContainer">
    <h1>stats</h1>
    <div className="statContainer">
    <div className="stat attack" style={{width:`${champObj.info.attack}0%`}}></div>
    </div>
    <div className="statContainer">
    <div className="stat attack" style={{width:`${champObj.info.defense}0%`}}></div>
    </div>
    <div className="statContainer">
    <div className="stat attack" style={{width:`${champObj.info.magic}0%`}}></div>
    </div>
    <div className="statContainer">
    <div className="stat attack" style={{width:`${champObj.info.difficulty}0%`}}></div>
    </div>
    <div className="statContainer">
    <div className="stat" ></div>
    </div>





                </div>


                <div className="champDetail">
                <p>{champName}</p>
                <p>{champObj.blurb}</p>
                <p>{champObj.image.full}</p>

                </div>

                

    
    
    
    
    
    
    
    
    
    
            </div>
}
            </>
        )
    }



export default InidividualChampInfo;