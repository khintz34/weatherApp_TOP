import { fetchWeather } from "./api/openweather.js";
import { setBackground } from "./weather.js";

const cityName = document.querySelector("#cityName");
const currentTemp = document.querySelector("#weather_curTemp");
const maxTemp = document.querySelector("#weather_maxTemp");
const minTemp = document.querySelector("#weather_minTemp");
const weatherType = document.querySelector("#weather_type");
const fiveDayTable = document.querySelector("#forecastTable");
const searchBtn = document.querySelector("#searchBtn");
const search = document.querySelector("#search");
const fBtn = document.querySelector("#fBtn");
const cBtn = document.querySelector("#cBtn");
let dayName;
let prevSearch = "chaska";
let degToggle = "imperial";
let errorToggle = false;

function convertToDegrees(temp) {
  return `${Math.round(temp)}°`;
}

async function getWeather(search, units) {
  try {
    const weather = await fetchWeather();
    console.log(weather);

    cityName.textContent = weather.name;
    currentTemp.textContent = `${Math.round(weather.main.temp)}°`;
    maxTemp.textContent = `${Math.round(weather.main.temp_max)}°`;
    minTemp.textContent = `${Math.round(weather.main.temp_min)}°`;
    weatherType.textContent = weather.weather[0].main;
    setBackground(weather.weather[0].id);
  } catch (error) {
    console.log(error);
    cityName.textContent = "City Name";
    currentTemp.textContent = ``;
    maxTemp.textContent = ``;
    minTemp.textContent = ``;
    weatherType.textContent = "";
    setBackground("0");
  }
}

async function getDayForecast(search, units) {
  try {
    const forecastResponse = await fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        search +
        "&APPID=f61f77ea54a19b239b2b3d5c6aae0dc8&units=" +
        units +
        "&cnt=5",
      { mode: "cors" }
    );
    const forecast = await forecastResponse.json();
    console.log(forecast);

    let tableRows = fiveDayTable.getElementsByTagName("tr");

    if (fiveDayTable.rows.length > 5) {
      for (let r = fiveDayTable.rows.length - 1; r > 0; r--) {
        fiveDayTable.removeChild(tableRows[r]);
      }
    }

    for (let i = 0; i < 5; i++) {
      const tableRow = document.createElement("tr");
      const dayCell = document.createElement("td");
      const maxCell = document.createElement("td");
      const minCell = document.createElement("td");
      const typeCell = document.createElement("td");

      getDayofWeek(i);
      dayCell.textContent = dayName;
      maxCell.textContent = `${Math.round(forecast.list[i].main.temp_max)}°`;
      minCell.textContent = `${Math.round(forecast.list[i].main.temp_min)}°`;
      typeCell.textContent = forecast.list[i].weather[0].main;

      tableRow.appendChild(dayCell);
      tableRow.appendChild(maxCell);
      tableRow.appendChild(minCell);
      tableRow.appendChild(typeCell);
      fiveDayTable.appendChild(tableRow);
      errorToggle = false;
      updateFooter();
    }
  } catch (error) {
    errorToggle = true;
    updateFooter();
    setBackground("0");
  }
}

function getDayofWeek(num) {
  let date = new Date();
  const dayNum = date.getDay() + 1;
  let totalNum;

  if (num > 0) {
    totalNum = dayNum + num;
  } else {
    totalNum = dayNum;
  }

  if (totalNum > 7) {
    totalNum = totalNum - 7;
  }

  if (totalNum === 1) {
    dayName = "Monday";
    return { dayName };
  } else if (totalNum === 2) {
    dayName = "Tuesday";
    return dayName;
  } else if (totalNum === 3) {
    dayName = "Wednesday";
    return dayName;
  } else if (totalNum === 4) {
    dayName = "Thursday";
    return dayName;
  } else if (totalNum === 5) {
    dayName = "Friday";
    return dayName;
  } else if (totalNum === 6) {
    dayName = "Saturday";
    return dayName;
  } else if (totalNum === 7) {
    dayName = "Sunday";
    return dayName;
  }
}

searchBtn.onclick = () => {
  const value = search.value;

  if (value === "") {
    getWeather(prevSearch, degToggle);
    getDayForecast(prevSearch, degToggle);
  } else {
    prevSearch = search.value;
    getWeather(value, degToggle);
    getDayForecast(value, degToggle);
  }
};

fBtn.onclick = () => {
  fBtn.classList.add("btnClicked");
  cBtn.classList.remove("btnClicked");
  getWeather(prevSearch, "imperial");
  getDayForecast(prevSearch, "imperial");
  degToggle = "imperial";
};

cBtn.onclick = () => {
  cBtn.classList.add("btnClicked");
  fBtn.classList.remove("btnClicked");
  getWeather(prevSearch, "metric");
  getDayForecast(prevSearch, "metric");
  degToggle = "metric";
};

function updateFooter() {
  const footer = document.querySelector("#footer");
  if (errorToggle) {
    footer.classList.add("red");
    footer.textContent =
      "There was an error! Are you sure you spelled the city right??";
  } else {
    footer.textContent = "OpenWeather App by @khintz34";
    footer.classList.remove("red");
  }
}

window.onload = () => {
  console.log(getWeather("Chaska", "imperial"));
  console.log(getDayForecast("Chaska", "imperial"));
};
