import { fetchWeatherCurrent, fetchWeatherDay } from "./api/openweather.js";
import { setBackground } from "./weather.js";

export async function getWeather(
  search,
  units,
  cityName,
  currentTemp,
  maxTemp,
  minTemp,
  weatherType,
  errorToggle
) {
  try {
    const weather = await fetchWeatherCurrent(search, units);
    cityName.textContent = weather.name;
    currentTemp.textContent = roundTemp(weather.main.temp);
    maxTemp.textContent = roundTemp(weather.main.temp_max);
    minTemp.textContent = roundTemp(weather.main.temp_min);
    weatherType.textContent = weather.weather[0].main;
    setBackground(weather.weather[0].id);
    errorToggle = true;
  } catch (error) {
    console.log(error);
    errorToggle = false;

    //not sure how else to get these variables here
    let cityName = document.querySelector("#cityName");
    let currentTemp = document.querySelector("#weather_curTemp");
    let maxTemp = document.querySelector("#weather_maxTemp");
    let minTemp = document.querySelector("#weather_minTemp");
    let weatherType = document.querySelector("#weather_type");
    resetText(cityName, currentTemp, maxTemp, minTemp, weatherType);
    setBackground("0");
  }
}

export async function getDayForecast(
  search,
  units,
  forecastTable,
  errorToggle,
  dayName
) {
  try {
    const forecast = await fetchWeatherDay(search, units);

    let tableRows = forecastTable.getElementsByTagName("tr");

    if (forecastTable.rows.length > 5) {
      for (let r = forecastTable.rows.length - 1; r > 0; r--) {
        forecastTable.removeChild(tableRows[r]);
      }
    }

    for (let i = 0; i < 5; i++) {
      const tableRow = document.createElement("tr");
      const dayCell = document.createElement("td");
      const maxCell = document.createElement("td");
      const minCell = document.createElement("td");
      const typeCell = document.createElement("td");

      getDayofWeek(i, dayName);
      dayCell.textContent = dayName;
      maxCell.textContent = roundTemp(forecast.list[i].main.temp_max);
      minCell.textContent = roundTemp(forecast.list[i].main.temp_min);
      typeCell.textContent = forecast.list[i].weather[0].main;

      tableRow.appendChild(dayCell);
      tableRow.appendChild(maxCell);
      tableRow.appendChild(minCell);
      tableRow.appendChild(typeCell);
      forecastTable.appendChild(tableRow);
      errorToggle = false;
      updateFooter();
    }
  } catch (error) {
    errorToggle = true;
    updateFooter(errorToggle);
    setBackground("0");
  }
}

export function getDayofWeek(num, dayName) {
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

export function searchForCity(
  cityName,
  currentTemp,
  maxTemp,
  minTemp,
  weatherType,
  forecastTable,
  errorToggle,
  degToggle,
  prevSearch,
  dayName,
  search
) {
  const value = search;

  if (value === "") {
    getWeather(
      prevSearch,
      degToggle,
      cityName,
      currentTemp,
      maxTemp,
      minTemp,
      weatherType,
      errorToggle
    );
    getDayForecast(prevSearch, degToggle, forecastTable, errorToggle, dayName);
  } else {
    prevSearch = search.value;
    getWeather(
      value,
      degToggle,
      cityName,
      currentTemp,
      maxTemp,
      minTemp,
      weatherType,
      errorToggle
    );
    getDayForecast(value, degToggle, forecastTable, errorToggle, dayName);
  }
}

export function fareClick(
  cBtn,
  fBtn,
  cityName,
  currentTemp,
  maxTemp,
  minTemp,
  weatherType,
  forecastTable,
  errorToggle,
  degToggle,
  prevSearch,
  dayName
) {
  fBtn.classList.add("btnClicked");
  cBtn.classList.remove("btnClicked");
  getWeather(
    prevSearch,
    "imperial",
    cityName,
    currentTemp,
    maxTemp,
    minTemp,
    weatherType,
    errorToggle
  );
  getDayForecast(prevSearch, "imperial", forecastTable, errorToggle, dayName);
  degToggle = "imperial";
}

export function celciusClick(
  cBtn,
  fBtn,
  cityName,
  currentTemp,
  maxTemp,
  minTemp,
  weatherType,
  forecastTable,
  errorToggle,
  degToggle,
  prevSearch,
  dayName
) {
  cBtn.classList.add("btnClicked");
  fBtn.classList.remove("btnClicked");
  getWeather(
    prevSearch,
    "metric",
    cityName,
    currentTemp,
    maxTemp,
    minTemp,
    weatherType,
    errorToggle
  );
  getDayForecast(prevSearch, "metric", forecastTable, errorToggle, dayName);
  degToggle = "metric";
}

function updateFooter(errorToggle) {
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

export function roundTemp(temp) {
  return `${Math.round(temp)}°`;
}

function resetText(cityName, currentTemp, maxTemp, minTemp, weatherType) {
  cityName.textContent = "City Name";
  currentTemp.textContent = ``;
  maxTemp.textContent = ``;
  minTemp.textContent = ``;
  weatherType.textContent = "";
}

export function initWeather(
  search,
  units,
  cityName,
  currentTemp,
  maxTemp,
  minTemp,
  weatherType,
  forecastTable,
  errorToggle,
  dayName
) {
  console.log(
    getWeather(
      search,
      units,
      cityName,
      currentTemp,
      maxTemp,
      minTemp,
      weatherType
    )
  );
  console.log(
    getDayForecast(search, units, forecastTable, errorToggle, dayName)
  );
}
