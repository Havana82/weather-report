
// proxy request. UI fuctionality event listeners section
const getLocation = () => {
    let location = document.getElementById("cityNameInput").value
    const url ='http://127.0.0.1:5000/location';

    return axios.get(url, {params:{q:location}})
    .then((response)=>{

    let latitude = response.data[0].lat;
    let longitude = response.data[0].lon
    console.log(longitude)
    console.log(latitude)
    return {latitude:latitude, longitude: longitude};


    })
    .catch( (error) => {
        console.log('error in findLatitudeAndLongitude!');
      });
    
 }

const getWeather = (lat, lon) =>{
    return axios
    .get('http://127.0.0.1:5000/weather', {params:{lat:lat,lon:lon}})
    .then((response)=>{
       
        let result = response.data['main']['temp'];
        return result
       
    })
    .catch((error)=>{
        console.log(error);
    }

    )
}

const getLocationWeather = () =>{
    let tempVal = document.getElementById("tempValue");
    return getLocation()
    .then( result =>{
             getWeather(result.latitude, result.longitude)
            .then(
                (response)=>{
                  
                    let farenheit = Math.floor(((response) - 273.15) * 9/5 + 32 )
                    console.log(farenheit);
                    tempVal.textContent = farenheit;
                    return farenheit

                }
            )
          
          
            
        }
    )
   
}





// states
const state = {
    temp: 0,
    landscape:"🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲",
    city: "Seattle"

}

// selected elements
const temp = document.getElementById("tempValue");
const controlUp = document.getElementById("increaseTempControl");
const controlDown = document.getElementById("decreaseTempControl");
const landscape = document.getElementById("landscape");
const cityName = document.getElementById("headerCityName");
const cityInput = document.getElementById("cityNameInput");
const reset = document.getElementById("cityNameReset");
const skyImage = document.getElementById("sky");
const sky = document.getElementById("skySelect");
const weatherGarden = document.getElementById("gardenContent")
const tempbutton = document.getElementById("currentTempButton")

// helper functions
const changeColor = () =>{
    if (state.temp>80){
        temp.className = 'red';
        landscape.innerText = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
    }
    else if (state.temp>69){
        temp.className = 'orange';
        landscape.innerText = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"
    }
    else if(state.temp>59){
        temp.className = 'yellow';
        landscape.innerText = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"
    }
    else if(state.temp>49){
        temp.className = 'green'
        landscape.innerText = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"
    }
    else{
        temp.className = 'teal'
        landscape.innerText = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"
    }
}

// functions
const increaseTemp = () =>{
    changeColor()
    state.temp+= 1
    temp.innerText = state.temp
    
}

const decreaseTemp = () => {
    changeColor()
    state.temp -= 1
    temp.innerText = state.temp
    
}

const resetCity = () =>{
    cityName.textContent = state.city;
    cityInput.value = state.city;

}

const changeSky= () =>{
   const skyValue = document.getElementById("skySelect").value;

   if (skyValue === "snowy"){
        skyImage.textContent = "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨";
        weatherGarden.className = "snowy";

    }
   else if (skyValue === "rainy"){
        skyImage.textContent = "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧"
        weatherGarden.className = "rainy";

    }
   else if (skyValue === "sunny") {
        skyImage.textContent = "☁️ ☁️ ☁️☁️ ☁️ ☀️ ☁️ ☁️☁️ ☁️"
        weatherGarden.className = "sunny";
   }
   
   else if (skyValue === "cloudy") {
        skyImage.textContent = "☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️ ☁️☁️☁️"
        weatherGarden.className = "cloudy";
   }



}

// event listeners
controlUp.addEventListener('click', increaseTemp)
controlDown.addEventListener('click', decreaseTemp)
cityInput.addEventListener('input', function(){
    cityName.textContent = this.value;
})
sky.addEventListener('change', changeSky)
reset.addEventListener("click", resetCity)
tempbutton.addEventListener('click',getLocationWeather)




