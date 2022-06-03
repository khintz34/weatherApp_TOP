import { getInitialConfig, getElementReferences } from "./utils";

function main() {
  const elementIds = ["cityName", "weather_curTemp", "weather_maxTemp"];

  const config = getInitialConfig();
  // {
  //   dayName: null,
  //   prevSearch: 'chaska',
  //   degToggle: 'imperial',
  //   errorToggle: false,
  // }

  const htmlReferences = getElementReferences(elementIds);
  // {
  //   'cityName': document.querySelector('#cityName'),
  //   'weather_curTemp': ...
  // }
}

main();
