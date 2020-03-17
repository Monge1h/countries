(async function () {
    const dataLocation = await getLocation()


    const countryCode = dataLocation['country_code']

    const countryData = await getCountryData(countryCode)
    render(countryData)
  })();

function render(countryData){
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
            <span class="answer">${countryData['languages'][0]['name']}</span>
            <span>Currency: </span> 
            <span class="answer">${countryData['currencies'][0]['name']}</span>
        </div>
        <p class="container__text">
        <div onclick="alertInput()">
            <a href="#" class="container__cta" onclick = "alertInput()">Search another country</a>
        </div>
    </div>`
}
async function getLocation() 
{
    try{
        let response = await fetch(`https://ipapi.co/json`);
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

async function alertInput()
{
    const { value: code } = await Swal.fire({
        title: 'Search another country',
        input: 'text',
        inputValue: "MX",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!'
          }
        }
      })
      
      if (code) {
        const countryCode = code

        const countryData = await getCountryData(countryCode)
        render(countryData)
      }
}