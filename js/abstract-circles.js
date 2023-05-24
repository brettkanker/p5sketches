let circles = []; // Array to store circles
let isClicked = false;
let limit = 200;

function setup() {
  createCanvas(600, 600);
  background(220);
  button = createButton("Add more max circles");
  button.mouseClicked(increaseLimit);

  let limitText = createP(`Max circles: ${limit}`);
  limitText.position(width + 20, height - 40);
  limitText.style('font-family', 'Arial');
  limitText.style('font-size', '16px');
}

function draw() {
  if (isClicked === true){
    // Generate and draw additional circles
    while (circles.length < limit) {
        let newCircle = generateCircle();
        circles.push(newCircle);
        drawCircle(newCircle);
    }
  }
}

function generateCircle() {
  let validCircle = false;
  let newCircle;
  while (!validCircle) {
    let x = random(width);
    let y = random(height);
    let radius = random(10, 50);

    // Check if the point is not on or inside any existing circle
    let validPoint = true;
    for (let i = 0; i < circles.length; i++) {
      let circle = circles[i];
      let distance = dist(x, y, circle.x, circle.y);
      if (distance - circle.radius <= 0) {
        validPoint = false;
        break;
      }
    }

    if (validPoint) {
      validCircle = true;
      newCircle = { x, y, radius };
      // Adjust the radius based on the closest distance to other circles
      for (let i = 0; i < circles.length; i++) {
        let circle = circles[i];
        let distance = dist(newCircle.x, newCircle.y, circle.x, circle.y);
        let minDistance = distance - circle.radius;
        if (minDistance < newCircle.radius) {
          newCircle.radius = minDistance;
        }
      }
    }
  }

  return newCircle;
}

function drawCircle(circle) {
  if (isClicked == false){
    fill(255);
    ellipse(circle.x, circle.y, circle.radius * 2);
  } 
  else {
    fill(random(255), random(255), random(255), 100);
    ellipse(circle.x, circle.y, circle.radius * 2);
  }
}

function mousePressed() {
    // Check if mouse is pressed within the canvas
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
      if (!isClicked) {
        let startCircle = {
          x: mouseX,
          y: mouseY,
          radius: random(10, 50)
        };
        circles.push(startCircle);
        drawCircle(startCircle);
        isClicked = true;
      }
    }
}
  

function increaseLimit() {
    limit += 100;
    // Update the circle limit text
    let limitText = select('p');
    limitText.html(`Max circles: ${limit}`);
}
