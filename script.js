// making the data real

function citySearched(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-form");
  let units = "imperial";
  let apiKey = "e2cf4b573a64292860e147bb5f7b421d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(currentWeather);
}

function currentWeather(response) {
  let temperature = Math.round(response.data.main.temp);

  let temperatureHeading = document.querySelector("#current-temperature");
  temperatureHeading.innerHTML = `${temperature}°F`;

  let currentSky = document.querySelector("#sky-description");
  currentSky.innerHTML = `${response.data.weather[0].description} `;

  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = ` ${Math.round(response.data.main.humidity)}% `;

  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = ` ${Math.round(response.data.wind.speed)} m/sec`;

  let cityHeading = document.querySelector("#current-city");
  cityHeading.innerHTML = `in ${response.data.name}`;

  let mainEmoji = document.querySelector("#current-emoji");

  // lo hago OBJETO

  let skyCondition = {
    "01d": "☀️",
    "01n": "☀️",
    "02d": "🌤",
    "02n": "🌤",
    "03d": "🌥",
    "03n": "🌥",
    "04d": "☁️",
    "04n": "☁️",
    "09d": "🌧",
    "09n": "🌧",
    "10d": "🌦",
    "10n": "🌦",
    "11d": "⛈",
    "11n": "⛈",
    "13d": "❄️",
    "13n": "❄️",
    "50d": "🌫",
    "50n": "🌫",
  };

  mainEmoji.innerHTML = skyCondition[response.data.weather[0].icon];

  let currentDateTime = document.querySelector("#current-day-time");
  currentDateTime.innerHTML = currentDayAndTime(response.data.dt * 1000);

  getForecast(response.data.coord);
}

///aqui tengo que crear dos funciones> una para recibir la data from the API call, y otra para desplegar el forecast en mi HTML

function getForecast(coordinates) {
  let apiKey = "e2cf4b573a64292860e147bb5f7b421d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${apiKey}`;

  console.log(apiUrl);

  axios.get(apiUrl).then(showForecast); /// esta funcion showForecast es la siguiente
}

function showForecast(response) {
  //// aqui definir dia de la semana, min, max y emoji, y como meto esto al html
}

function currentDayAndTime(timestamp) {
  let now = new Date(timestamp);

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];

  return `last updated at ${hours}:${minutes}, ${day}`;
}

currentDayAndTime();

let form = document.querySelector("#search-city");
form.addEventListener("submit", citySearched);

///
