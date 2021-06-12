

const convertChampions = (championId, champObj) => {

          let championName = 'Gwen';
        const championArray = Object.keys(champObj);
            for(let i = 0 ; i <championArray.length ; i++){
                if (parseInt(champObj[championArray[i]].key, 10) === championId){
                    championName = championArray[i];
                }
            }
            return championName;
}

export default convertChampions;