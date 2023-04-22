let img;

function preload() {
  img = loadImage("/assets/eyes.jpg");
}

function setup() {
  createCanvas(img.width, img.height);
  pixelDensity(1);
  img.loadPixels();
}

function draw() {
  background(255);
  let x1 = floor(random(img.width));
  let x2 = floor(random(img.width));
  let y1 = floor(random(img.height));
  let y2 = floor(random(img.height));
  let w = floor(random(10, 100));
  let h = floor(random(10, 100));
  copy(img, x1, y1, w, h, x2, y2, w, h);
  updatePixels();
}
