// OpenWeather API Key: 2cc42d107d77098140e12594178f5883

// OpenWeather Call 16 Day API call
// api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}

// API request by city name
// api.openweathermap.org/data/2.5/forecast/daily?q={city name},{state code},{country code}&cnt={cnt}&appid={API key}

var allWeatherData = '';

const searchBox = document.getElementById('search-box');
const clearBtn = document.getElementById('btn-clear');
const searchBtn = document.getElementById('btn-search');
const currentWeather = $(document.getElementById('current-weather'));
const cityList = document.getElementById('city-list');
const forecastWeather = document.getElementById('forecast-weather');
const forecastDay1 = $("#day1");
const forecastDay2 = $("#day2");
const forecastDay3 = $("#day3");
const forecastDay4 = $("#day4");
const forecastDay5 = $("#day5");
const cards = [forecastDay1, forecastDay2, forecastDay3, forecastDay4, forecastDay5];
const APIKey = '2cc42d107d77098140e12594178f5883';
var historyArray;

searchBtn.addEventListener('click', searchCity);
clearBtn.addEventListener('click', clearHistory);

function clearHistory() {
    localStorage.clear();
    location.reload();
}

function searchCity() {
    if (searchBox) {
        fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + searchBox.value + '&appid=' + APIKey, {})
            .then(function(response) {
                if (!response) {
                    console.log('error');
                }
                return response.json();
            })
            .then(function(data) {
                var cityName = data[0].name;
                getData(data[0].lat.toFixed(2), data[0].lon.toFixed(2), cityName);
            })
            .catch((err) => {
                currentWeather.children('#current-city').text(err + 'searchCity()');
            });
    }
}

function getData(lat, lon, cityName) {
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + APIKey, {

        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            allWeatherData = data;
            storeHistory(cityName);
            displayWeather(cityName);
        })
        .catch((err) => {
            currentWeather.children('#current-city').text(err + 'getData()');

        });

}

function storeHistory(cityName) {
    if (historyArray == null) {
        historyArray = [];
        historyArray.push(cityName);
    } else if (historyArray.length > 0 && historyArray.includes(cityName) == false) {
        historyArray.push(cityName);
    }
    localStorage.setItem('cities', JSON.stringify(historyArray));
    appendCities();
}

function displayWeather(cityName) {
    searchBox.value = '';
    setTimeout(() => {
        var todaysDate = new Date(allWeatherData.current.dt * 1000);
        currentWeather.children('#current-city').text(cityName);
        currentWeather.children('#current-date').text(todaysDate.getMonth() + 1 + '/' + todaysDate.getDate() + '/' + todaysDate.getFullYear());
        currentWeather.children('#current-weather').attr('src', 'https://openweathermap.org/img/wn/' + allWeatherData.current.weather[0].icon + '@2x.png');
        currentWeather.children('#current-temp').text('Temp: ' + Math.ceil(allWeatherData.current.temp));
        currentWeather.children('#current-wind').text('Wind: ' + allWeatherData.current.wind_speed + "MPH");
        currentWeather.children('#current-humidity').text('Humidity: ' + allWeatherData.current.humidity + "%");
        document.getElementById('5-day-forecast').textContent = '5 day forecast for ' + cityName;
        for (var i = 0; i < cards.length; i++) {
            var date = new Date(allWeatherData.daily[i + 1].dt * 1000);
            //console.log(allWeatherData.daily[i + 1].weather[0].icon);
            var iconCode = allWeatherData.daily[i].weather[0].icon;
            cards[i].children('.card-date').text(date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear());
            cards[i].children('.card-weather').attr('src', 'https://openweathermap.org/img/wn/' + iconCode + '@2x.png');
            cards[i].children('.card-temp').text("Temp: " + allWeatherData.daily[i + 1].temp.max + 'F');
            cards[i].children('.card-wind').text("Wind: " + allWeatherData.daily[i + 1].wind_speed + " MPH");
            cards[i].children('.card-humidity').text("Humidity: " + allWeatherData.daily[i + 1].humidity + "%");
        }
    }, 1000);

}

function appendCities(event) {
    removeAllChildren(cityList);
    for (var i = 0; i < historyArray.length; i++) {
        var x = document.createElement('li');
        x.textContent = historyArray[i];
        cityList.appendChild(x);
        x.addEventListener('click', setCity);
    }
}

function setCity(event) {
    searchBox.value = event.target.textContent;
    searchCity();
}

function init() {
    if (localStorage.length > 0) {
        historyArray = JSON.parse(localStorage.getItem("cities"));
        appendCities();
    }

}

function removeAllChildren(p) {
    while (p.firstChild) {
        p.removeChild(p.firstChild);
    }
}

init();