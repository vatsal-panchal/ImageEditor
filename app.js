const filters = {
  brightness: { value: 100, min: 0, max: 200 },
  contrast: { value: 100, min: 0, max: 200, unit: "%" },
  exposure: { value: 100, min: 0, max: 200, unit: "%" },
  saturation: { value: 100, min: 0, max: 200, unit: "%" },
  hueRotation: { value: 100, min: 0, max: 360, unit: "deg" },
  blur: { value: 100, min: 0, max: 20, unit: "px" },
  grayscale: { value: 0, min: 0, max: 0, unit: "%" },
  sepia: { value: 0, min: 0, max: 100, unit: "%" },
  opacity: { value: 100, min: 0, max: 100, unit: "%" },
  invert: { value: 0, min: 0, max: 100, unit: "%" },
};

const filtersContainer = document.querySelector(".filters");

function createFilterElement(name, unit = "%", value, min, max) {
  const div = document.createElement("div");
  div.classList.add("filter");

  const input = document.createElement("input");
  input.type = "range";
  input.min = min;
  input.max = max;
  input.value = value;
  input.name = name;
  input.id = name;

  const p = document.createElement("p");
  p.textContent = name;

  div.append(p);
  div.append(input);

  return div;
}

Object.keys(filters).forEach((key) => {
  const filterElement = createFilterElement(
    key, // name
    filters[key].unit, // unit
    filters[key].value, // value
    filters[key].min, // min
    filters[key].max // max
  );
  filtersContainer.append(filterElement);
});
