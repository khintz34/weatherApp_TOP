import { getInitialConfig, getElementReferences } from "./utils.js";
import {
  getWeather,
  getDayForecast,
  getDayofWeek,
  roundTemp,
  initWeather,
  celciusClick,
  fareClick,
  searchForCity,
} from "./script.js";

export function main() {
  const elementIds = [
    "cityName",
    "weather_curTemp",
    "weather_maxTemp",
    "weather_minTemp",
    "weather_type",
    "forecastTable",
    "searchBtn",
    "search",
    "fBtn",
    "cBtn",
  ];

  const config = getInitialConfig();

  const htmlReferences = getElementReferences(elementIds);

  initWeather(
    "Chaska",
    "imperial",
    htmlReferences.cityName,
    htmlReferences.weather_curTemp,
    htmlReferences.weather_maxTemp,
    htmlReferences.weather_minTemp,
    htmlReferences.weather_type,
    htmlReferences.forecastTable,
    config.errorToggle,
    config.dayName
  );

  htmlReferences.cBtn.onclick = function () {
    celciusClick(
      htmlReferences.cBtn,
      htmlReferences.fBtn,
      htmlReferences.cityName,
      htmlReferences.weather_curTemp,
      htmlReferences.weather_maxTemp,
      htmlReferences.weather_minTemp,
      htmlReferences.weather_type,
      htmlReferences.forecastTable,
      config.errorToggle,
      config.degToggle,
      config.prevSearch,
      config.dayName
    );
  };

  htmlReferences.fBtn.onclick = function () {
    fareClick(
      htmlReferences.cBtn,
      htmlReferences.fBtn,
      htmlReferences.cityName,
      htmlReferences.weather_curTemp,
      htmlReferences.weather_maxTemp,
      htmlReferences.weather_minTemp,
      htmlReferences.weather_type,
      htmlReferences.forecastTable,
      config.errorToggle,
      config.degToggle,
      config.prevSearch,
      config.dayName
    );
  };

  htmlReferences.searchBtn.onclick = function () {
    searchForCity(
      htmlReferences.cityName,
      htmlReferences.weather_curTemp,
      htmlReferences.weather_maxTemp,
      htmlReferences.weather_minTemp,
      htmlReferences.weather_type,
      htmlReferences.forecastTable,
      config.errorToggle,
      config.degToggle,
      config.prevSearch,
      config.dayName,
      htmlReferences.search.value
    );
  };
}

main();
