function formatDate(date) {
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "Desember",
  ];
  let currentDate = date.getDate();
  let currentDay = days[date.getDay()];
  let currentYear = date.getFullYear();
  let currentMonth = months[date.getMonth()];

  return `Last updated: ${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;
}

let now = new Date();
let theDate = document.querySelector("#date");
theDate.innerHTML = formatDate(now);

function formatTime(timestamp) {
  let currentTime = new Date(timestamp);
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0 ${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayWeatherForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<li class="list-group-item">`;
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="row" id="weather-forecast">
       <div class="col-4" id="forecast-date">
       ${day}
       </div>
       <div class="col-4">
         <img
           src="http://openweathermap.org/img/wn/01d@2x.png"
           alt=""
           width="36"
         />
       </div>
       <div class="col-4" id="forecast-temperature">
         <span id="forecast-temperature-max"> +19° </span>
         <span id="forecast-temperature-min"> +12° </span>
       </div>
     </div> 
     `;
  });

  forecastHTML = forecastHTML + `</li> `;
  forecastElement.innerHTML = forecastHTML;
}

function getWeatherForcast(coordinates) {
  let apiKey = "4a77ff67bcabd0a98acfc53b339a7788";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherForecast);
}

function displayTime(response) {
  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = formatTime(response.data.dt * 1000);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  celsiusTemperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = celsiusTemperature;
}
function displayCity(response) {
  let cityElement = document.querySelector("#city-name");
  let city = response.data.name;
  cityElement.innerHTML = city;
}
function displayWind(response) {
  let windElement = document.querySelector("#wind");
  let wind = Math.round(response.data.wind.speed);
  windElement.innerHTML = wind + " km/h";
}
function displayHumidity(response) {
  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  humidityElement.innerHTML = humidity + " %";
}
function displayFeelsLike(response) {
  let feelsLikeElement = document.querySelector("#feel-like");
  feelsLike = Math.round(response.data.main.feels_like);
  feelsLikeElement.innerHTML = feelsLike + " ℃";
}
function displayIcon(response) {
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function displayForecast(response) {
  displayCity(response);
  displayFeelsLike(response);
  displayTemperature(response);
  displayWind(response);
  displayHumidity(response);
  displayTime(response);
  displayIcon(response);
  getWeatherForcast(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  let apiKey = "4a77ff67bcabd0a98acfc53b339a7788";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(displayForecast);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusTemperature = null;

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "4a77ff67bcabd0a98acfc53b339a7788";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&lat=${latitude}&lon=${longitude}`;

  axios.get(`${apiUrl}`).then(displayForecast);
}

function currentPosition() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let buttonCurrentLocation = document.querySelector("#current-location");
buttonCurrentLocation.addEventListener("click", currentPosition);
