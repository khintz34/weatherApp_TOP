const BASE_URL_CURRENT = "https://api.openweathermap.org/data/2.5/weather";
const BASE_URL_DAY = "https://api.openweathermap.org/data/2.5/forecast";
const APP_ID = "f61f77ea54a19b239b2b3d5c6aae0dc8";

function buildUrl(search, units, num) {
  if (num === 1) {
    return `${BASE_URL_CURRENT}?q=${search}&APPID=${APP_ID}&units=${units}`;
  } else if (num === 2) {
    return `${BASE_URL_DAY}?q=${search}&APPID=${APP_ID}&units=${units}&cnt=5`;
  }
}

export async function fetchWeatherCurrent(search, units) {
  const response = await fetch(buildUrl(search, units, 1), { mode: "cors" });
  return response.json();
}

export async function fetchWeatherDay(search, units) {
  const forecastResponse = await fetch(buildUrl(search, units, 2), {
    mode: "cors",
  });
  return forecastResponse.json();
}
