///APIKey
var APIKey = "8abd961d0015a3cb9fcb6f613530c1d4"

var city = "";
//variables declared
var citySearch = document.querySelector("#city-search");
var searchButton = document.querySelector("#searchbutton");
var cityName = document.querySelector("#cityname");
var currentTemperature = document.querySelector("#temperature");
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
        APIKey + "&units=imperial";
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
            var temperature = data.main.temp;
            var windSpeed = data.wind.speed;
            var humidity = data.main.humidity;

            //create dynamic html elements with weather data
            cityName.innerText = data.name;
            currentTemperature.innerText = temperature;
            currentWindSpeed.innerText = windSpeed;
            currentHumidity.innerText = humidity;
            document.getElementById("tempIcon").setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
        })
        .catch(function (error) {
            //handle error case
            console.log("error: " + error.message);
        });
}

var sCity = [];

//function created for city search
function searchCity() {

    var storedCities = localStorage.getItem('cities');
    sCity = storedCities ? JSON.parse(storedCities) : [];
    
    var city = citySearch.value;
    getWeatherData(city);
    getFiveDayWeatherData(city)


    // then stores searched city into local storage
    sCity.push(city);
    localStorage.setItem('cities', JSON.stringify(sCity));

    citySearch.value = '';

    renderPreviousSearch();



}

//retrive and display stored cities from the local storage
function renderPreviousSearch() {
    //Retrieves the cities stored in local storage
    var storedCities = localStorage.getItem('cities');
    var sCity = storedCities ? JSON.parse(storedCities) : [];

    //lets get the citylist element
    var cityList = document.querySelector(".cityList");

    //clears content that is maybe already in the city list
    cityList.innerHTML = "";
  
    //Adds each city to the list
    sCity.forEach(function (city) {
        var button = document.createElement("button");
        button.innerText = city;
        button.classList.add("city-button");
        cityList.appendChild(button);

        //attatch event listener to the button 
        button.addEventListener('click', function () {
            getWeatherData(city);
            getFiveDayWeatherData(city);
        });
    });
    if (sCity.length > 0) {
        var lastSearchedCity = sCity[sCity.length - 1];
        getWeatherData(lastSearchedCity);
        getFiveDayWeatherData(lastSearchedCity);
    }
}

renderPreviousSearch();
//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}


function getFiveDayWeatherData(city) {
    var queryURL =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&appid=" +
        APIKey + "&units=imperial";
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
            console.log(data);
            var htmlForecastCards = `<div class="row">`;
            for (let i = 0; i < data.list.length; i = i + 8) {
                htmlForecastCards += `
                <div class="col-sm-2 forecast">
                  <p>${dayjs(data.list[i].dt_txt).format('MM/DD/YYYY')}</p>
                  <p></p>
                  <p>Temperature: <span>${data.list[i].main.temp}</span>
                    <img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png">
                  </p>
                  <p>Wind Speed: <span class="wind-speed">${data.list[i].wind.speed}</span></p>
                  <p>Humidity: <span>${data.list[i].main.humidity}</span></p>
                </div>
              `;
            }
            htmlForecastCards += `</div>`;
            document.getElementById("future-forecast").innerHTML = htmlForecastCards;
        })

        .catch(function (error) {
            //handle error case
            console.log("error: " + error.message);
        });
}





