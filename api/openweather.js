const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const APP_ID = "f61f77ea54a19b239b2b3d5c6aae0dc8";

function buildUrl(search, units) {
  return `${BASE_URL}?q=${search}&APPID=${APP_ID}&units=${units}`;
}

export async function fetchWeather() {
  const response = await fetch(buildUrl(), { mode: "cors" });
  return response.json();
}
