let img;

function preload() {
  img = loadImage("/assets/beast.jpg");
}

function setup() {
  background(0);
  createCanvas(img.width, img.height);
  pixelDensity(1);
  img.loadPixels();
  
  for (let i = 0; i < 100; i++) {
    let x1 = floor(random(img.width));
    let x2 = floor(random(img.width));
    let y1 = floor(random(img.height));
    let y2 = floor(random(img.height));
    let w = floor(random(10, 100));
    let h = floor(random(10, 100));
    let r = random(-50, 50);
    let g = random(-50, 50);
    let b = random(-50, 50);
    copy(img, x1, y1, w, h, x2, y2, w, h);
    for (let j = 0; j < w * h * 4; j += 4) {
      img.pixels[(x2 + floor(j / 4) % w + (y2 + floor(j / 4) / w) * img.width) * 4] += r;
      img.pixels[(x2 + floor(j / 4) % w + (y2 + floor(j / 4) / w) * img.width) * 4 + 1] += g;
      img.pixels[(x2 + floor(j / 4) % w + (y2 + floor(j / 4) / w) * img.width) * 4 + 2] += b;
    }
    updatePixels();
  }
}
