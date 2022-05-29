const cityName = document.querySelector("#cityName");
const currentTemp = document.querySelector("#weather_curTemp");
const maxTemp = document.querySelector("#weather_maxTemp");
const minTemp = document.querySelector("#weather_minTemp");
const weatherType = document.querySelector("#weather_type");
const fiveDayTable = document.querySelector("#forecastTable");
const searchBtn = document.querySelector("#searchBtn");
const search = document.querySelector("#search");
async function getWeather(search1) {
    try {
        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + search1 + "&APPID=f61f77ea54a19b239b2b3d5c6aae0dc8&units=imperial", {
            mode: "cors"
        });
        const weather = await response.json();
        console.log(weather);
        cityName.textContent = weather.name;
        currentTemp.textContent = weather.main.temp;
        maxTemp.textContent = weather.main.temp_max;
        minTemp.textContent = weather.main.temp_min;
        weatherType.textContent = weather.weather[0].main;
    } catch (error) {
        console.log("ERROR");
    }
}
async function getDayForecast(search2) {
    try {
        const forecastResponse = await fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + search2 + "&APPID=f61f77ea54a19b239b2b3d5c6aae0dc8&units=imperial&cnt=5", {
            mode: "cors"
        });
        const forecast = await forecastResponse.json();
        console.log(forecast);
        let tableRows = fiveDayTable.getElementsByTagName("tr");
        if (fiveDayTable.rows.length > 5) for(let r = fiveDayTable.rows.length - 1; r > 0; r--)fiveDayTable.removeChild(tableRows[r]);
        for(let i = 0; i < 5; i++){
            const tableRow = document.createElement("tr");
            const dayCell = document.createElement("td");
            const maxCell = document.createElement("td");
            const minCell = document.createElement("td");
            const typeCell = document.createElement("td");
            dayCell.textContent = `Day ${i + 1}`;
            maxCell.textContent = forecast.list[i].main.temp_max;
            minCell.textContent = forecast.list[i].main.temp_min;
            typeCell.textContent = forecast.list[i].weather[0].main;
            tableRow.appendChild(dayCell);
            tableRow.appendChild(maxCell);
            tableRow.appendChild(minCell);
            tableRow.appendChild(typeCell);
            fiveDayTable.appendChild(tableRow);
        }
    } catch (error) {
        console.log("ERROR");
    }
}
searchBtn.onclick = ()=>{
    const value = search.value;
    getWeather(value);
    getDayForecast(value);
};
window.onload = ()=>{
    console.log(getWeather("Oconomowoc"));
    console.log(getDayForecast("Oconomowoc"));
};

//# sourceMappingURL=index.4c0f2ebb.js.map
