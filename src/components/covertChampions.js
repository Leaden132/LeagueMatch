import axios from 'axios'


const convertChampions = (championId, champArray) => {

          let championName = 'ashe';
        const championArray = Object.keys(champArray);
            for(let i = 0 ; i <championArray.length ; i++){
                if (champArray[championArray[i]].key == championId){
                    championName = championArray[i];
                }
            }
            return championName;

}

export default convertChampions;