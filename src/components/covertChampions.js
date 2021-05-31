import axios from 'axios'


const convertChampions = (championId, champArray) => {

    // console.log(champArray);
    // console.log(championId);

          let championName = 'ashe';
        const championArray = Object.keys(champArray);
            for(let i = 0 ; i <championArray.length ; i++){
                if (champArray[championArray[i]].key == championId){
                    championName = championArray[i];
                }
            }
            console.log(championArray);
            console.log(championName);
            return championName;

      




}

export default convertChampions;