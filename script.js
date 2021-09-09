// making the data real

function citySearched(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-form");
  let units = "metric";
  let apiKey = "e2cf4b573a64292860e147bb5f7b421d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(currentWeather);
}

function currentWeather(response) {
  temperature = Math.round(response.data.main.temp);
  console.log(response.data);
  let temperatureHeading = document.querySelector("#current-temperature");
  temperatureHeading.innerHTML = `${temperature}°C`;

  let currentSky = document.querySelector("#sky-description");
  currentSky.innerHTML = `${response.data.weather[0].description} `;

  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = ` ${Math.round(response.data.main.humidity)}% `;

  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = ` ${Math.round(response.data.wind.speed)} meter/sec`;

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

// coding to Fahrenheit

function changeTempToFahrenheit(event) {
  event.preventDefault();

  //remove the active link from fahrenheit, and add it to celsius link

  let currentDegrees = document.querySelector("#current-temperature");
  let fahrenheitTemperature = Math.round((temperature * 9) / 5 + 32);

  currentDegrees.innerHTML = `${fahrenheitTemperature}°F`;

  changeToFahrenheit.classList.add("hidden");
  changeToCelsius.classList.remove("hidden");
}

function changeTempToCelsius(event) {
  event.preventDefault();

  let currentDegrees = document.querySelector("#current-temperature");

  currentDegrees.innerHTML = `${temperature}°C`;

  changeToFahrenheit.classList.remove("hidden");
  changeToCelsius.classList.add("hidden");
}

let temperature = null;

let changeToFahrenheit = document.querySelector("#to-fahrenheit");
let changeToCelsius = document.querySelector("#to-celsius");

changeToFahrenheit.addEventListener("click", changeTempToFahrenheit);
changeToCelsius.addEventListener("click", changeTempToCelsius);

///
