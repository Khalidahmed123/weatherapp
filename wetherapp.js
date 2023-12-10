// SELECT ELEMENTS
const iconElement= document.querySelector(".weather-icon");
const tempElement= document.querySelector(".temperature-value p");
const descElement=document.querySelector(".humidity-description p");
const locationElement= document.querySelector(".location p");
const notificationElement=document.querySelector(".notification");

// App data
const weather={};

weather.temperature={
    unit:"celsius"
}

// App consts and vars
const KELVIN = 273;
// API KEY
const key='58db9435ced308620562805fc52e3cc3';

// CHECK IF BROWSER SUPPORTS GEOLOCATION
// if('geolocation' in navigation){
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
    // navigator.geolocation.getCurrentPosition(setPosition,  );
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position){
    let latitude = parseInt(position.coords.latitude);
    let longitude = parseInt(position.coords.longitude);
    getWeather(latitude,longitude);

}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = '<p>'+error.message+'</p>';
}

// GET WEATHER FROM API PORVIDER
function getWeather(latitude,longitude){
    let api='https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid='+key;
    fetch(api)
        .then(function(response){
            let data =response.json(); //This is an expression that retrieves the JSON data from the response object and parses it into a JavaScript object.
            return data;
        })
        .then(function(data){
            console.log(data); 
            weather.temperature.value = Math.floor(data.main.temp - KELVIN); 
            weather.decription = data.main.humidity;
            weather.iconId = data.weather[0].icon;
            weather.countryname = data.name;
            weather.countryId = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}
// 27.2046° N, 77.4977° E

// DISPLAY WEATHER TO UI
function displayWeather(){
    iconElement.innerHTML = `<img src="Icons/`+weather.iconId+`@2x.png" alt="Weather-icon">`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = `<span>Humidity:</span>${weather.decription}`;
    locationElement.innerHTML = `${weather.countryname}, ${weather.countryId}`;
}

// C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENT
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) 
       return ;

    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius";
    }
});
