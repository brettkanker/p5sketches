let counter = 0;

function setup() {
  createCanvas(800, 800);
  background(0);
  noFill();
  stroke(255);
  strokeWeight(2);
  frameRate(5);
}

function draw() {
  translate(width / 2, height / 2);

  // Outer loop controls the number of rings
  for (let r = 20; r < 400; r += 40) {
    beginShape();
    // Inner loop controls the number of points in each ring
    for (let angle = 0; angle < 360; angle += random(10, 250)) {
      // Convert polar coordinates to cartesian coordinates
      let x = r * cos(radians(angle));
      let y = r * sin(radians(angle));
      vertex(x, y);
    }
    endShape(CLOSE);

    // Increment the counter
    counter++;

    // Check if the counter reaches limit
    if (counter === 100) {
      noLoop(); // Stop further iterations
      break; // Exit the loop
    }
  }
}
