

const convertRunes = (runeId:number, runeArray:any):string => {
    let runeURL = 'perk-images/Styles/7200_Domination.png';

    for (let i=0; i< runeArray.length;i++) {
        for(let x=0; x< runeArray[i].slots[0].runes.length; x++){
            if (runeArray[i].slots[0].runes[x].id===runeId){
                runeURL=runeArray[i].slots[0].runes[x].icon;
            }
        }
    }

      return runeURL;
}

export default convertRunes;