///APIKey
var APIKey = "8abd961d0015a3cb9fcb6f613530c1d4"

var city= "";
//variables declared
var citySearch= $("#city-search");
var searchButton= $("#searchbutton");
var cityName= $("#cityname");
var currentTemperature= $("#temperature");
var currentUvIndex= $("#uv-index");
var currentWindSpeed= $("#wind-speed");
var currentHumidity= $("#humidity");

//retrieved stored cities from the local storage
var storedCities= localStorage.getItem('Cities');
var sCity= storedCities ? JSON.parse(storedCities) : [];

//event listener added for the search button
searchButton.on('click' , searchCity);

//Function to get weather data from the open weather api
function getWeatherData(city) {
    var queryURL = 
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey;

    //API request using the fetch()
fetch(queryURL)
.then(function (response) {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error("Error: " + response.status);
    }
})
}

.then(function(data) {
    //retrives the desired weather information from openWeather
    var temperature = data.main.tempp;
    var uvIndex = data.value.uvIndex;
    var windSpeed = data.wind.speed;
    var humidity = data.main.humidity;

    //create dynamic html elements with weather data
    cityName.text(city);


})











