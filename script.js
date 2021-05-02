// script.js

const img = new Image(); // used to load image from <input> and draw to canvas

let canvas = document.getElementById("user-image");
let generateButton = document.getElementsByTagName("button")[0];
let clearButton = document.getElementsByTagName("button")[1];
let readTextButton =document.getElementsByTagName("button")[2];
let imageInput = document.getElementById("image-input");
let generateMeme = document.getElementById("generate-meme");
let context = canvas.getContext("2d");
let voiceList = [];
let readButtonVolume = 1;


// Fires whenever the img object loads a new image (such as with img.src =)
img.addEventListener('load', () => {
  // TODO
  context.clearRect(0, 0, 400, 400);

  let topText = document.getElementById("text-top");
  let bottomText = document.getElementById("text-bottom");

  topText.value = "";
  bottomText.value = "";

  generateButton.disabled = false;
  clearButton.disabled = true;
  readTextButton.disabled = true;

  let dimension = getDimmensions(400, 400, img.width, img.height);

  context.fillStyle = "black";
  context.fillRect(0, 0, 400, 400);
  context.drawImage(img, dimension.startX, dimension.startY, dimension.width, dimension.height);

  // Some helpful tips:
  // - Fill the whole Canvas with black first to add borders on non-square images, then draw on top
  // - Clear the form when a new image is selected
  // - If you draw the image to canvas here, it will update as soon as a new image is selected
});

imageInput.addEventListener('change', () => {
  let imagePath = URL.createObjectURL(imageInput.files[0]);
  let alternate = imagePath.split("\\").pop();
  img.src = imagePath;
  img.alt = alternate;
});

generateMeme.addEventListener('submit', (event) => {
  event.preventDefault(); // by default submit will refresh the page. Preventing the same
  let topText = document.getElementById("text-top");
  let bottomText = document.getElementById("text-bottom");

  context.fillStyle = "black";
  context.font = "30px serif";
  context.textAlign = "center";
  context.fillText(bottomText.value, 130, 350);
  context.fillText(topText.value, 130, 50);

  clearButton.disabled = false;
  readTextButton.disabled = false;
});

clearButton.addEventListener('click', () => {
  let topText = document.getElementById("text-top");
  let bottomText = document.getElementById("text-bottom");
  topText.value = "";
  bottomText.value = "";

  context.clearRect(0, 0, canvas.width, canvas.height);
});

/*
speechSynthesis.addEventListener('voiceschanged', () => {
  voiceList = speechSynthesis.getVoices();
  let voiceChoice = document.getElementById("voice-selection");
  
  for (var i = 0; i < voiceList.length ; i++){
    var option = document.createElement("option");
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

    if(voices[i].default) {
      option.textContent +- " DEFAULT";
    }

  option.setAttribute("data.lang", voices[i].lang);
  option.setAttribute("data.name", voices[i].name);
  voiceChoice.appendChild(option);

  }

});
*/

/*
readTextButton.addEventListener('click', () => {
  let topText = document.getElementById("text-top");
  let bottomText = document.getElementById("text-bottom");
  let utteranceTop = new SpeechSynthesisUtterance(topText.value);
  let utteranceBottom = new SpeechSynthesisUtterance(bottomText.value);
  utteranceTop.volume = readButtonVolume;
  utteranceBottom.volume = readButtonVolume;
  speechSynthesis.speak(utteranceTop);
  speechSynthesis.speak(utteranceBottom);

});
*/

/*
volume.addEventListener('input', () => {
  let iconImage = document.getElementsByTagName('img')[0];
  readButtonVolume = (volume.value / 100)
  if (volume.value == 0){
    iconImage.src = "icons/volume-level-0.svg";
    iconImage.alt = "Volume Level 0: 0"
  }
  else if (volume.value >= 1 && volume.value <= 33){
    iconImage.src = "icons/volume-level-1.svg";
    iconImage.alt = "Volume Level 1: 1 - 33";
  }
  else if (volume.value >= 34 && volume.value <= 66){
    iconImage.src = "icons/volume-level-2.svg";
    iconImage.alt = "Volume Level 1: 34 - 66";
  }
  else if (volume.value >= 67 && volume.value <= 100){
    iconImage.src = "icons/volume-level-3.svg";
    iconImage.alt = "Volume Level 1: 67 - 100";
  }

});
*/

/**
 * Takes in the dimensions of the canvas and the new image, then calculates the new
 * dimensions of the image so that it fits perfectly into the Canvas and maintains aspect ratio
 * @param {number} canvasWidth Width of the canvas element to insert image into
 * @param {number} canvasHeight Height of the canvas element to insert image into
 * @param {number} imageWidth Width of the new user submitted image
 * @param {number} imageHeight Height of the new user submitted image
 * @returns {Object} An object containing four properties: The newly calculated width and height,
 * and also the starting X and starting Y coordinate to be used when you draw the new image to the
 * Canvas. These coordinates align with the top left of the image.
 */
function getDimmensions(canvasWidth, canvasHeight, imageWidth, imageHeight) {
  let aspectRatio, height, width, startX, startY;

  // Get the aspect ratio, used so the picture always fits inside the canvas
  aspectRatio = imageWidth / imageHeight;

  // If the apsect ratio is less than 1 it's a verical image
  if (aspectRatio < 1) {
    // Height is the max possible given the canvas
    height = canvasHeight;
    // Width is then proportional given the height and aspect ratio
    width = canvasHeight * aspectRatio;
    // Start the Y at the top since it's max height, but center the width
    startY = 0;
    startX = (canvasWidth - width) / 2;
    // This is for horizontal images now
  } else {
    // Width is the maximum width possible given the canvas
    width = canvasWidth;
    // Height is then proportional given the width and aspect ratio
    height = canvasWidth / aspectRatio;
    // Start the X at the very left since it's max width, but center the height
    startX = 0;
    startY = (canvasHeight - height) / 2;
  }

  return { 'width': width, 'height': height, 'startX': startX, 'startY': startY }
}
