export function getElementReferences(idSelectors) {
  const references = {};

  idSelectors.forEach((selector) => {
    references[selector] = document.querySelector(`#${selector}`);
  });

  return references;
}

export function getInitialConfig() {
  return {
    dayName: null,
    prevSearch: "chaska",
    degToggle: "imperial",
    errorToggle: false,
  };
}
