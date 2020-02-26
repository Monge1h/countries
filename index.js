(async function () {
    const dataLocation = await getLocation()

    const countryCode = dataLocation['countryCode']

    const countryData = await getCountryData(countryCode)
    
    document.getElementById('content').innerHTML = `
    <div class="container__img">
        <img src="${countryData['flag']}" alt="">
    </div>
    <div class="container__info">
        <h1 class="container__country">${countryData['name']}</h1>
        <div class="container__data">
            <span>Capital: </span> 
            <span class="answer">${countryData['capital']}</span>
            <span>Region: </span> 
            <span class="answer">${countryData['region']}</span>
            <span>Sub Region: </span> 
            <span class="answer">${countryData['subregion']}</span>
            <span>Language: </span> 
            <span class="answer">${countryData['name']}</span>
            <span>Currency: </span> 
            <span class="answer">${countryData['currencies'][0]['name']}</span>
        </div>
        <p class="container__text">
            <a href="#" class="container__cta">Search another country</a>
    </div>`
  })();
async function getLocation() 
{
    try{
        let response = await fetch(`http://ip-api.com/json/`);
        return await response.json();
    }catch(err){
        return err
    }
}
async function getCountryData(country_code) 
{
    try{
        let response = await fetch(`https://restcountries.eu/rest/v2/alpha/${country_code}`);
        return await response.json();
    }catch(err){
        return err
    }
}

