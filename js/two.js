let angle = 0;
var button;

function setup() {
  createCanvas(200, 200);
  background(0);
}

function draw() {
  stroke(random(255));
  translate(width / 2, height);
  branch(100);
}

function branch(len) {
  line(0, 0, 0, -len);
  translate(0, -len);

  if (len > 4) {
    push();
    rotate(angle);
    branch(len * 0.67);
    pop();
    push();
    rotate(-angle);
    branch(len * 0.67);
    pop();
  }

  angle += 0.05;
}