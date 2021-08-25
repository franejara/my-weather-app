// making the data real

function currentTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureHeading = document.querySelector("#current-temperature");
  temperatureHeading.innerHTML = `${temperature}°C`;

  let cityHeading = document.querySelector("#current-city");
  cityHeading.innerHTML = `in ${response.data.name}`;
}

function citySearched(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-form");
  let units = "metric";
  let apiKey = "e2cf4b573a64292860e147bb5f7b421d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(currentTemperature);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", citySearched);

function currentDayAndTime() {
  let now = new Date();

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

  let currentDateTime = document.querySelector("#current-day-time");
  currentDateTime.innerHTML = `currently at ${hours}:${minutes}, ${day}`;
}

currentDayAndTime();
