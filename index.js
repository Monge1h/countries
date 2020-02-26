async function getLocation() 
{
    try{
        let response = await fetch(`http://ip-api.com/json/`);
        return await response.json();
    }catch(err){
        return err
    }
}

(async function () {
    const dataLocation = await getLocation()


    
    document.getElementById('content').innerHTML = ` <div class="container__img">
    <img src="https://restcountries.eu/data/slv.svg" alt="">
</div>
<div class="container__info">
    <h1 class="container__country">El Salvador</h1>
    <div class="container__data">
        <span>Capital: </span> 
        <span class="answer">San Salvador</span>
        <span>Region: </span> 
        <span class="answer">America</span>
        <span>Sub Region: </span> 
        <span class="answer">Central America</span>
        <span>Language: </span> 
        <span class="answer">Spanish</span>
        <span>Currency: </span> 
        <span class="answer">USD</span>
    </div>
    <p class="container__text">
        <a href="#" class="container__cta">Buscar otro pais</a>
    </div>`
  })();
