// OpenWeather API Key: 2cc42d107d77098140e12594178f5883

// OpenWeather Call 16 Day API call
// api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}

// API request by city name
// api.openweathermap.org/data/2.5/forecast/daily?q={city name},{state code},{country code}&cnt={cnt}&appid={API key}

var allWeatherData = '';

const searchBox = document.getElementById('search');
const currentWeather = $(document.getElementById('current-weather'));
const cityList = document.getElementById('city-list');
const forecastWeather = document.getElementById('forecast-weather');
const forecastDay1 = $("#day1");
const forecastDay2 = $("#day2");
const forecastDay3 = $("#day3");
const forecastDay4 = $("#day4");
const forecastDay5 = $("#day5");
const cards = [forecastDay1, forecastDay2, forecastDay3, forecastDay4, forecastDay5];

function getData() {
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=32.45&lon=-99.73&units=imperial&appid=2cc42d107d77098140e12594178f5883', {

        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            allWeatherData = data;
        });
    displayWeather();
}

function displayWeather() {
    setTimeout(() => {
        //currentWeather.children(0).text()
        //date
        //currentWeather.children('#current-temp').text(Math.ceil(allWeatherData.current.temp));
        //window
        //humidity
        var todaysDate = new Date(allWeatherData.current.dt * 1000);
        currentWeather.children('#current-date').text(todaysDate.getMonth() + 1 + '/' + todaysDate.getDate() + '/' + todaysDate.getFullYear());
        currentWeather.children('#current-weather').attr('src', 'http://openweathermap.org/img/wn/' + allWeatherData.current.weather[0].icon + '@2x.png');
        currentWeather.children('#current-temp').text('Temp: ' + Math.ceil(allWeatherData.current.temp));
        currentWeather.children('#current-wind').text('Wind: ' + allWeatherData.current.wind_speed + "MPH");
        currentWeather.children('#current-humidity').text('Humidity: ' + allWeatherData.current.humidity + "%")
        for (var i = 0; i < cards.length; i++) {
            var date = new Date(allWeatherData.daily[i + 1].dt * 1000);
            //console.log(allWeatherData.daily[i + 1].weather[0].icon);
            var iconCode = allWeatherData.daily[i].weather[0].icon;
            cards[i].children('.card-date').text(date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear());
            cards[i].children('.card-weather').attr('src', 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png');
            cards[i].children('.card-temp').text("Temp: " + allWeatherData.daily[i + 1].temp.max + 'F');
            cards[i].children('.card-wind').text("Wind: " + allWeatherData.daily[i + 1].wind_speed + " MPH");
            cards[i].children('.card-humidity').text("Humidity: " + allWeatherData.daily[i + 1].humidity + "%");
            console.log(cards[i]);
        }
    }, 1000);

}

function init() {
    getData();
}

init();