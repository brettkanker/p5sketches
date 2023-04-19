let lakeImg;
let riverImg;
let combinedImg;

function preload() {
  lakeImg = loadImage('/assets/lake.jpg');
  riverImg = loadImage('/assets/river.jpg');
}

function setup() {
  createCanvas(800, 600);
  combinedImg = createImage(lakeImg.width, lakeImg.height);
  combinedImg.loadPixels();
  
  for (let y = 0; y < lakeImg.height; y++) {
    for (let x = 0; x < lakeImg.width; x++) {
      if (x % 2 == 0) {
        // Even pixel - take from river image
        const pixel = riverImg.get(x, y);
        combinedImg.set(x, y, pixel);
      } else {
        // Odd pixel - take from lake image
        const pixel = lakeImg.get(x, y);
        combinedImg.set(x, y, pixel);
      }
    }
  }
  combinedImg.updatePixels();
}

function draw() {
  background(255);
  image(combinedImg, 0, 0);
}
