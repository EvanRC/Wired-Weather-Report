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
        APIKey +"&units=imperial";
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
            document.getElementById("tempIcon").setAttribute("src",`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
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
getFiveDayWeatherData(city)
    

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

//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}


function getFiveDayWeatherData(city) {
    var queryURL =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&appid=" +
        APIKey +"&units=imperial";
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
            var htmlForecastCards = `<div class="row">`
            for (let i = 0; i <data.list.length; i = i + 8) {
                htmlForecastCards += `
                <div class="col-sm-2 forecast">
                <p>${dayjs(data.list[i].dt_txt).format('MM/DD/YYYY')}</p>
                <p></p>
                <p>Temperature:<span>${data.list[i].main.temp}</span>
                    <img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" />
                </p>
                <p>Wind Speed:<span>${data.list[i].wind.speed}</span></p>
                <p>Humidity:<span >${data.list[i].main.humidity}</span></p>
            </div>
                `
            }
            htmlForecastCards += `</div>`
            document.getElementById("future-forecast").innerHTML = htmlForecastCards
        
        })
        .catch(function (error) {
            //handle error case
            console.log("error: " + error.message);
        });
}





