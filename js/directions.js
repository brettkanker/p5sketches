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

let shapeType = 'points'; // default shape type

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.style('border', '2px solid red');
  canvas.style('position', 'absolute');
  canvas.style('top', '40px');
  canvas.style('left', '10px');

  // create buttons
  let pointsBtn = createButton('Points');
  pointsBtn.mouseClicked(() => { shapeType = 'points'; });
  pointsBtn.style('position', 'absolute');
  pointsBtn.style('top', '10px');
  pointsBtn.style('left', '10px');

  let circlesBtn = createButton('Circles');
  circlesBtn.mouseClicked(() => { shapeType = 'circles'; });
  circlesBtn.style('position', 'absolute');
  circlesBtn.style('top', '10px');
  circlesBtn.style('left', '80px');

  let squaresBtn = createButton('Squares');
  squaresBtn.mouseClicked(() => { shapeType = 'squares'; });
  squaresBtn.style('position', 'absolute');
  squaresBtn.style('top', '10px');
  squaresBtn.style('left', '160px');

  // Initialize position and direction randomly
  xPos = random(width);
  yPos = random(height);
  const dir = floor(random(4)); // choose one of the four diagonal directions
  switch (dir) {
    case 0: // northeast
      xDir = 5;
      yDir = -5;
      break;
    case 1: // southeast
      xDir = 5;
      yDir = 5;
      break;
    case 2: // southwest
      xDir = -5;
      yDir = 5;
      break;
    case 3: // northwest
      xDir = -5;
      yDir = -5;
      break;
  }
}

function draw() {
  background(255);

  // Add the current position to the positions array
  positions.push(createVector(xPos, yPos));

  // Draw the shape based on shapeType
  
  if (shapeType === 'points') {
    for (let i = 0; i < positions.length; i++) {
      noFill();
      stroke(0, 0, 0, 100);
      strokeWeight(4);
      point(positions[i].x, positions[i].y);
    }
  } else if (shapeType === 'circles') {
    for (let i = 0; i < positions.length; i++) {
      noFill();
      stroke(0, 0, 0, 100);
      strokeWeight(1);
      ellipse(positions[i].x, positions[i].y, 50);
    }
  } else if (shapeType === 'squares') {
    for (let i = 0; i < positions.length; i++) {
      fill(255);
      stroke(0, 0, 0, 100);
      strokeWeight(2);
      rect(positions[i].x, positions[i].y, 25, 25);
    }
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
