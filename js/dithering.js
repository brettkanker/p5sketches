let img;

function preload() {
  img = loadImage("/assets/apocalypse-now.jpg");
}

function setup() {
  createCanvas(img.width, img.height);
  pixelDensity(1);
  img.loadPixels();
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let index = (x + y * img.width) * 4;
      let oldR = img.pixels[index + 0];
      let oldG = img.pixels[index + 1];
      let oldB = img.pixels[index + 2];
      let newR = oldR > 127 ? 255 : 0;
      let newG = oldG > 127 ? 255 : 0;
      let newB = oldB > 127 ? 255 : 0;
      let errR = oldR - newR;
      let errG = oldG - newG;
      let errB = oldB - newB;
      img.pixels[index + 0] = newR;
      img.pixels[index + 1] = newG;
      img.pixels[index + 2] = newB;
      for (let i = 0; i < 3; i++) {
        if (x + 1 < img.width) {
          img.pixels[index + 4 + i] += errR * 7 / 16;
          img.pixels[index + 4 * img.width - 4 + i] += errR * 1 / 16;
        }
        if (x > 0 && y + 1 < img.height) {
          img.pixels[index - 4 + 4 * img.width + i] += errR * 3 / 16;
        }
        if (x + 1 < img.width && y + 1 < img.height) {
          img.pixels[index + 4 + 4 * img.width + i] += errR * 5 / 16;
        }
      }
    }
  }
  img.updatePixels();
  image(img, 0, 0, img.width, img.height);
}
