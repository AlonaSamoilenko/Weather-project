let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  moscow: {
    temp: -5,
    humidity: 20,
  },
};
let now = new Date();
function formatDate(date) {
  let days = ["Mon", "Tue", "Wed", "Tru", "Fri", "Sat", "Sun"];
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

  return `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;
}

let theDate = document.querySelector("#date");
theDate.innerHTML = formatDate(now);

function cityTemperature(response) {
  let cityElement = document.querySelector("#city-name");
  let temperatureElement = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;

  cityElement.innerHTML = city;
  temperatureElement.innerHTML = temperature;
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  let apiKey = "4a77ff67bcabd0a98acfc53b339a7788";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(cityTemperature);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "4a77ff67bcabd0a98acfc53b339a7788";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&lat=${latitude}&lon=${longitude}`;

  axios.get(`${apiUrl}`).then(cityTemperature);
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

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", convertToCelcius);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  //T(°F) = T(°C) × 9/5 + 32
  temperature.innerHTML = (temperature.innerHTML * 9) / 5 + 32;
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);
