

const convertChampions = (championId, champArray) => {

          let championName = 'ashe';
        const championArray = Object.keys(champArray);
            for(let i = 0 ; i <championArray.length ; i++){
                if (parseInt(champArray[championArray[i]].key, 10) === championId){
                    championName = championArray[i];
                }
            }
            return championName;
}

export default convertChampions;