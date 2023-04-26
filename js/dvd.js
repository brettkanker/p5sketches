let x, y;
let xspeed, yspeed;
let dvd;

function preload() {
  dvd = loadImage('/assets/dvd_logo.png');
}

function setup() {
  createCanvas(800, 600);
  dvd.resize(100, 50);
  x = random(width - dvd.width);
  y = random(height - dvd.height);
  xspeed = 3;
  yspeed = 3;
}

function draw() {
  background(0);
  image(dvd, x, y);

  x += xspeed;
  y += yspeed;

  if(mouseIsPressed){
    x += xspeed * mouseX * 0.01;
    y += yspeed * mouseY * 0.01;
  }

  if (x + dvd.width >= width || x <= 0) {
    xspeed *= -1;
    tint(random(255), random(255), random(255));
  }
  if (y + dvd.height >= height || y <= 0) {
    yspeed *= -1;
    tint(random(255), random(255), random(255));
  }
}
