///APIKey
var APIKey = "8abd961d0015a3cb9fcb6f613530c1d4"

var city = "";
//variables declared
var citySearch = document.querySelector("#city-search");
var searchButton = document.querySelector("#searchbutton");
var cityName = document.querySelector("#cityname");
var currentTemperature = document.querySelector("#temperature");
var currentUvIndex = document.querySelector("#uv-index");
var currentWindSpeed = document.querySelector("#wind-speed");
var currentHumidity = document.querySelector("#humidity");

//retrieved stored cities from the local storage
var storedCities = localStorage.getItem('Cities');
var sCity = storedCities ? JSON.parse(storedCities) : [];

//event listener added for the search button
searchButton.addEventListener('click', searchCity);

//Function to get weather data from the open weather api
function getWeatherData(city) {
    var queryURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        APIKey;
    console.log(queryURL)
    //API request using the fetch()
    fetch(queryURL)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error: " + response.status);
            }
        })


        .then(function (data) {
            console.log(data)
            //retrives the desired weather information from openWeather
            // var temperature = data.main.tempp;
            // var uvIndex = data.value.uvIndex;
            // var windSpeed = data.wind.speed;
            // var humidity = data.main.humidity;

            // //create dynamic html elements with weather data
            // cityName.text(city);
            // currentTemperature.text(temperature);
            // currentUvIndex.text(uvIndex);
            // currentWindSpeed.text(windSpeed);
            // currentHumidity.text(hymidity);
        })
        .catch(function (error) {
            //handle error case
            console.log("error: " + error.message);
        });
}

//function created for city search
function searchCity() {
    var city = citySearch.value;
    console.log(city)
    getWeatherData(city);

    //then stores searched city into local storage
    // sCity.push(city);
    // localStorage.setItem('cities', JSON.stringify(sCity));

    // //adds searched city to the city ist
    // var listItem = document.createElement("li").innerText = city;
    // cityList.append(listItem);

    //clears search field
    citySearch.value = '';
}

//retrive and display stored cities from the local storage
function renderPreviousSearch() {
    sCity.forEach(function (city) {
        var listItem = $("<li>").text(city);
        cityList.append(listItem);
    });

    //get the weather data for the fist city in the list
    if (sCity.length > 0) {
       // getWeatherData(sCity[0]);
    }
};










