function setup() {
    createCanvas(1600, 1000);
    background(216,173,136);
    stroke(37, 150, 190);
    strokeWeight(3);
  }
  
  function draw() {
    let patternSize = 70; 
    let padding = 35;
    
    for (let x = 0; x < width; x += patternSize + padding) {
      for (let y = 0; y < height; y += patternSize + padding) {
        drawCoolSPattern(x, y, patternSize);
      }
    }
  }
  
  function drawCoolSPattern(x, y, size) {
    // Top row
    line(x, y, x, y + size);
    line(x + size/2, y, x + size/2, y + size);
    line(x + size, y, x + size, y + size);
    
    // Bottom row
    line(x, y + size + size/2, x, y + size + size);
    line(x + size/2, y + size + size/2, x + size/2, y + size + size);
    line(x + size, y + size + size/2, x + size, y + size + size);
    
    // Connections
    line(x, y + size, x + size/2, y + size + size/2);
    line(x + size/2, y + size, x + size, y + size + size/2);
    
    line(x, y + size + size/2, x + size/4, y + size + size/4);
    line(x + size/2 + size/4, y + size + size/4, x + size, y + size);
  }
  