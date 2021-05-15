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

function displayTime(response) {
  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = formatTime(response.data.dt * 1000);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = temperature;
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

function displayForecast(response) {
  displayCity(response);
  displayFeelsLike(response);
  displayTemperature(response);
  displayWind(response);
  displayHumidity(response);
  displayTime(response);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  let apiKey = "4a77ff67bcabd0a98acfc53b339a7788";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(displayForecast);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "4a77ff67bcabd0a98acfc53b339a7788";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&lat=${latitude}&lon=${longitude}`;

  axios.get(`${apiUrl}`).then(displayTemperature);
}

function currentPosition() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let buttonCurrentLocation = document.querySelector("#current-location");
buttonCurrentLocation.addEventListener("click", currentPosition);

function convertToCelcius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  // T(°C) = (T(°F) - 32) × 5/9
  temperature.innerHTML = ((temperature.innerHTML - 32) * 5) / 9;
}
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  //T(°F) = T(°C) × 9/5 + 32
  temperature.innerHTML = (temperature.innerHTML * 9) / 5 + 32;
}
