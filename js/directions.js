let xPos, yPos;
let xDir, yDir;

// Direction constants
const NORTH = 0;
const NORTHEAST = 1;
const EAST = 2;
const SOUTHEAST = 3;
const SOUTH = 4;
const SOUTHWEST = 5;
const WEST = 6;
const NORTHWEST = 7;

// An array to store previous positions of the shape
let positions = [];

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.style('border', '2px solid red');
  // Initialize position and direction randomly
  xPos = random(width);
  yPos = random(height);
  xDir = random(-5, 5); //floor/cealing/int
  yDir = random(-5, 5);
}

function draw() {
  background(255);

  // Add the current position to the positions array
  positions.push(createVector(xPos, yPos));

  // Draw the line using the positions array
  stroke(0, 0, 0, 100);
  strokeWeight(4);
  noFill();
//   beginShape();
//   for (let i = 0; i < positions.length; i++) {
//     vertex(positions[i].x, positions[i].y);
//   }
//   endShape();
  for (let i = 0; i < positions.length; i++) {
    point(positions[i].x, positions[i].y);
    // ellipse(positions[i].x, positions[i].y, 50);
  }

  // Move the shape based on direction
  xPos += xDir;
  yPos += yDir;

  // Handle edge cases
  if(xPos > width){
    xPos = 0
  }
  else if(xPos < 0){
    xPos = width
  }
  else if(yPos < 0){
    yPos = height
  }
  else if(yPos > height){
    yPos = 0
  }

  // Change direction randomly
  if (random() < map(mouseX, 0, width, 0.10, 1)) {
    const dir = floor(random(8));
    switch (dir) {
      case NORTH:
        yDir = -5;
        break;
      case NORTHEAST:
        xDir = 5;
        yDir = -5;
        break;
      case EAST:
        xDir = 5;
        break;
      case SOUTHEAST:
        xDir = 5;
        yDir = 5;
        break;
      case SOUTH:
        yDir = 5;
        break;
      case SOUTHWEST:
        xDir = -5;
        yDir = 5;
        break;
      case WEST:
        xDir = -5;
        break;
      case NORTHWEST:
        xDir = -5;
        yDir = -5;
        break;
    }
  }
}

// Stop adding positions to the array on mouse press
function mousePressed() {
  noLoop();
}

// Resume adding positions to the array on mouse release
function mouseReleased() {
  loop();
}
