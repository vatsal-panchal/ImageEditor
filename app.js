/* filters */
const filters = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  hueRotation: 0,
  blur: 0,
  grayscale: 0,
  sepia: 0,
  opacity: 100,
  invert: 0,
};

/* elements */
const imageInput = document.getElementById("image-input");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const filterBox = document.querySelector(".filters");
const placeholder = document.querySelector(".placeholder");
const resetBtn = document.getElementById("reset-btn");
const downloadBtn = document.getElementById("download-btn");

let img = null;

/* create one slider */
function createSlider(name, value) {
  const div = document.createElement("div");
  div.className = "filter";

  const p = document.createElement("p");
  p.innerText = name;

  const input = document.createElement("input");
  input.type = "range";
  input.value = value;
  input.id = name;

  if (name === "blur") input.max = 20;
  else if (name === "hueRotation") input.max = 360;
  else input.max = 200;

  input.addEventListener("input", applyFilters);

  div.appendChild(p);
  div.appendChild(input);
  return div;
}

/* make all sliders */
for (let key in filters) {
  filterBox.appendChild(createSlider(key, filters[key]));
}

/* upload image */
imageInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  placeholder.style.display = "none";

  img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = () => {
    canvas.style.display = "block";
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
  };
});

/* apply filters */
function applyFilters() {
  if (!img) return;

  const b = document.getElementById("brightness").value;
  const c = document.getElementById("contrast").value;
  const s = document.getElementById("saturation").value;
  const h = document.getElementById("hueRotation").value;
  const bl = document.getElementById("blur").value;
  const g = document.getElementById("grayscale").value;
  const sp = document.getElementById("sepia").value;
  const o = document.getElementById("opacity").value;
  const i = document.getElementById("invert").value;

  ctx.filter = `
    brightness(${b}%)
    contrast(${c}%)
    saturate(${s}%)
    hue-rotate(${h}deg)
    blur(${bl}px)
    grayscale(${g}%)
    sepia(${sp}%)
    opacity(${o}%)
    invert(${i}%)
  `;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
}

/* reset */
resetBtn.addEventListener("click", () => {
  for (let key in filters) {
    document.getElementById(key).value = filters[key];
  }
  applyFilters();
});

/* download */
downloadBtn.addEventListener("click", () => {
  if (!img) return;

  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = canvas.toDataURL();
  link.click();
});
