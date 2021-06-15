

const convertRunes = (runeId:number, runeArray:any):string => {
    let runeURL = 'perk-images/Styles/7200_Domination.png';

    for (let i=0; i< runeArray.length;i++) {
        runeArray[i].slots[0].runes.forEach((rune:any, index:number)=>{
            if (rune.id===runeId){
                // eslint-disable-next-line react-hooks/exhaustive-deps
                runeURL=rune.icon;
            }
        })
        // if (runeArray[i].slots[0].runes[0].id === runeId){

        // }
    }

//   const championArray = Object.keys(champObj);
//       for(let i = 0 ; i <championArray.length ; i++){
//           if (parseInt(champObj[championArray[i]].key, 10) === championId){
//               championName = championArray[i];
//           }
//       }
      return runeURL;
}

export default convertRunes;