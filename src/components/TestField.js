import axios from 'axios';


const TestField = (puuId) => {
    const developKey = 'RGAPI-0659ead7-84b7-43d9-a449-801ae0f3eebe';

    axios({
        method:'GET',
        url: 'https://proxy.hackeryou.com',
        responseType: 'json',
        params: {
          reqUrl: `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/NA1_0000000000 _UEx5cUlatp7tYi3tjrjhXSZCe1cD7Yf_kbsPemQtUq6BC8FxMtTzB7xEO-7SFJBeke2-OXNJs8CyAQ/ids?start=0&count=20&api_key=${developKey}`
        }
      })
      .then(function(res) {
        console.log(res);

      })


    return(
        <div>
            ok
        </div>
    )



}

export default TestField;