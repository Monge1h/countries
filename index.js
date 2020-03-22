(async function () {
    const dataLocation = await getLocation()

    const countryCode = dataLocation['country_name']

    const countryData = await getCountryData(countryCode)
    render(countryData)
  })();

function render(countryData){
    document.getElementById('content').innerHTML = `
    <div class="container__img">
        <img src="${countryData['flag']}" crossorigin="anonymous" alt="">
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
    const colorThief = new ColorThief();
    const img = document.querySelector('img');

    // Make sure image is finished loading
    if (img.complete) {
        let test = colorThief.getColor(img);
        document.querySelector('a').style.background = `rgb(${test})`;
        document.querySelector('h1').style.color = `rgb(${test})`;
    } else {
      img.addEventListener('load', function() {
        let test = colorThief.getColor(img);
        document.querySelector('a').style.background = `rgb(${test})`;
        document.querySelector('h1').style.color = `rgb(${test})`;
      });
    }
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
        let response = await fetch(`https://restcountries.eu/rest/v2/name/${country_code}`);
        response = await response.json()
        return await response[0];
    }catch(err){
        return err
    }
}

async function alertInput()
{
    const { value: code } = await Swal.fire({
        title: 'Search another country',
        input: 'text',
        inputValue: "",
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
        if(countryData === undefined){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Sorry I couldn't find that country!",
                footer: ':/'
              })
        }
        render(countryData)
      }
}