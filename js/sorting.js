let img;

function preload() {
  img = loadImage("/assets/gecko.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
}

function draw() {
  background(0);
  image(img, 0, 0, windowWidth, windowHeight);
    img.loadPixels();
    let pixelsArr = [];
    for (let i = 0; i < img.pixels.length; i += 4) {
        pixelsArr.push([img.pixels[i], img.pixels[i + 1], img.pixels[i + 2], img.pixels[i + 3]]);
    }
    pixelsArr.sort((a, b) => {
        let sumA = a[0] + a[1] + a[2];
        let sumB = b[0] + b[1] + b[2];
        return sumA - sumB;
    });
    for (let i = 0; i < pixelsArr.length; i++) {
        let index = i * 4;
        img.pixels[index + 0] = pixelsArr[i][0];
        img.pixels[index + 1] = pixelsArr[i][1];
        img.pixels[index + 2] = pixelsArr[i][2];
        img.pixels[index + 3] = pixelsArr[i][3];
    }
    img.updatePixels();
  
}

