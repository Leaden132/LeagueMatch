import axios from 'axios'


const convertChampions = (championId) => {

    let championName = 'ashe';

    axios({
        method:'GET',
        url: 'https://ddragon.leagueoflegends.com/cdn/11.4.1/data/en_US/champion.json',
        responseType: 'json',
      })
      .then((res)=> {
        const championArray = Object.keys(res.data);
            for(let i = 0 ; i <championArray.length ; i++){
                if (res.data[championArray[i]].key == championId){
                    championName = championArray[i];
                }
            }
            return championName;

      })


}

export default convertChampions;