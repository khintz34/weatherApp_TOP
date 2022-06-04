import { getInitialConfig, getElementReferences } from "./utils.js";

export function main() {
  const elementIds = ["cityName", "weather_curTemp", "weather_maxTemp"];

  const config = getInitialConfig();

  const htmlReferences = getElementReferences(elementIds);

  return { config };
}

main();
