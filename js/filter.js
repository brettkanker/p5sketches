let img;

function preload() {
  img = loadImage("/assets/submarine.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
}

function draw() {
  background(0);
  image(img, 0, 0, windowWidth, windowHeight);
  img.loadPixels();
  for (let i = 0; i < img.pixels.length; i += 4) {
    let red = img.pixels[i + 0];
    let green = img.pixels[i + 1];
    let blue = img.pixels[i + 2];
    let alpha = img.pixels[i + 3];
    if (mouseIsPressed) {
      blue = random(255);
    }
    img.pixels[i + 0] = red;
    img.pixels[i + 1] = green;
    img.pixels[i + 2] = red;
    img.pixels[i + 3] = blue;
  }
  img.updatePixels();
}
