async function getLocation() 
{
    try{
        let response = await fetch(`http://ip-api.com/json/`);
        return await response.json();
        }catch(err){
        return err
        }
}

getLocation()
  .then(data => console.log(data));