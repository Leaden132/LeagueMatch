

const convertChampions = (championId:number, champObj:any):string => {
    console.log(championId);
    console.log(champObj);
          let championName = 'Gwen';
        const championArray = Object.keys(champObj.champObj);
            for(let i = 0 ; i <championArray.length ; i++){
                if (parseInt(champObj.champObj[championArray[i]].key, 10) === championId){
                    championName = championArray[i];
                }
            }
            return championName;
}

export default convertChampions;