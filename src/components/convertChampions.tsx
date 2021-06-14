

const convertChampions = (championId:number, champObj:any):string => {
          let championName = 'Gwen';

          console.log(championId);
          console.log(champObj);
        const championArray = Object.keys(champObj);
            for(let i = 0 ; i <championArray.length ; i++){
                if (parseInt(champObj[championArray[i]].key, 10) === championId){
                    championName = championArray[i];
                }
            }
            return championName;
}

export default convertChampions;