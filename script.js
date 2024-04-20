// Querying DOM elements
const fileInput = document.querySelector(".file-input");
const filterOptions = document.querySelectorAll(".filter button");
const filterName = document.querySelector(".filter-info .name");
const filterValue = document.querySelector(".filter-info .value");
const filterSlider = document.querySelector(".slider input");
const rotateOptions = document.querySelectorAll(".rotate button");
const previewImg = document.querySelector(".preview-img img");
const resetFilterBtn = document.querySelector(".reset-filter");
const chooseImgBtn = document.querySelector(".choose-img");
const saveImgBtn = document.querySelector(".save-img");

// Querying slider elements
const brightnessSlider = document.getElementById("brightness-slider");
const saturationSlider = document.getElementById("saturation-slider");
const inversionSlider = document.getElementById("inversion-slider");
const grayscaleSlider = document.getElementById("grayscale-slider");
const contrastSlider = document.getElementById("contrast-slider");

// Initializing filter settings
let brightness = "100", saturation = "100", inversion = "0", grayscale = "0", contrast = "100";
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

// Event listeners for sliders
brightnessSlider.addEventListener("input", updateBrightness);
saturationSlider.addEventListener("input", updateSaturation);
inversionSlider.addEventListener("input", updateInversion);
grayscaleSlider.addEventListener("input", updateGrayscale);
contrastSlider.addEventListener("input", updateContrast);

// Event listener for file input
fileInput.addEventListener("change", loadImage);

// Event listener for reset filter button
resetFilterBtn.addEventListener("click", resetFilter);

// Event listener for save image button
saveImgBtn.addEventListener("click", saveImage);

// Event listener for choose image button
chooseImgBtn.addEventListener("click", () => fileInput.click());

// Function to load image
function loadImage() {
    let file = fileInput.files[0];
    if (!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", () => {
        resetFilterBtn.click();
        document.querySelector(".container").classList.remove("disable");
    });
}

// Function to apply filter
function applyFilter() {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}

// Update brightness value
function updateBrightness() {
    brightness = brightnessSlider.value;
    applyFilter();
}

// Update saturation value
function updateSaturation() {
    saturation = saturationSlider.value;
    applyFilter();
}

// Update inversion value
function updateInversion() {
    inversion = inversionSlider.value;
    applyFilter();
}

// Update grayscale value
function updateGrayscale() {
    grayscale = grayscaleSlider.value;
    applyFilter();
}

// Update contrast value
function updateContrast() {
    contrast = contrastSlider.value;
    applyFilter();
}

// Event listener for rotate options
rotateOptions.forEach(option => {
    option.addEventListener("click", () => {
        if (option.id === "left") {
            rotate -= 90;
        } else if (option.id === "right") {
            rotate += 90;
        } else if (option.id === "horizontal") {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        } else {
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyFilter();
    });
});

// Reset filter settings to default values
function resetFilter() {
    brightness = "100";
    saturation = "100";
    inversion = "0";
    grayscale = "0";
    contrast = "100";
    rotate = 0;
    flipHorizontal = 1;
    flipVertical = 1;

    // Update slider values
    brightnessSlider.value = brightness;
    saturationSlider.value = saturation;
    inversionSlider.value = inversion;
    grayscaleSlider.value = grayscale;
    contrastSlider.value = contrast;

    // Apply filters
    applyFilter();
}

// Function to save image
function saveImage() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Adjust canvas size based on image dimensions and rotation
    let canvasWidth = previewImg.naturalWidth;
    let canvasHeight = previewImg.naturalHeight;
    if (rotate % 180 !== 0) {
        // Swap width and height if image is rotated 90 or 270 degrees
        [canvasWidth, canvasHeight] = [canvasHeight, canvasWidth];
    }
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if (rotate !== 0) {
        // Rotate canvas
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);

    // Adjust drawing position based on rotation
    const offsetX = -previewImg.naturalWidth / 2;
    const offsetY = -previewImg.naturalHeight / 2;
    ctx.drawImage(previewImg, offsetX, offsetY);

    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}

