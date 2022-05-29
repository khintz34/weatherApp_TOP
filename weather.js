export function setBackground(weather) {
  const container = document.querySelector("#container");

  container.classList.add("overflow");

  container.classList.remove("clear");
  container.classList.remove("clouds");
  container.classList.remove("rain");
  container.classList.remove("snow");
  container.classList.remove("storm");
  container.classList.remove("severe");

  if (weather === 800) {
    container.classList.add("clear");
  } else if (weather > 800) {
    container.classList.add("clouds");
  } else if (weather >= 600 && weather <= 622) {
    container.classList.add("snow");
  } else if ((weather >= 300 && weather <= 531) || weather === 701) {
    container.classList.add("rain");
  } else if (weather >= 200 && weather <= 290) {
    container.classList.add("storm");
  } else if (weather >= 711 && weather <= 790) {
    container.classList.add("clouds");
  }
}
