let img;

function preload() {
  img = loadImage("/assets/cat-bunny.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  img.loadPixels();
}

function draw() {
  background(255);
  let imgWidth = mouseX > width ? width - 50 : mouseX - 50;
  let imgHeight = mouseY > height ? height - 50 : mouseY - 50;
  image(img, 0, 0, imgWidth, imgHeight);
}
