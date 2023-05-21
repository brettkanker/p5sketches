function setup() {
    createCanvas(800, 800);
    background(0);
    stroke(255);
    strokeWeight(4);
  }
  
  function draw() {
    background(0);

    let size = 100; 
    let padding = 20; 
    let numRepetitions = 8;

    let totalWidth = size * numRepetitions + padding * (numRepetitions - 1);
    let totalHeight = size * numRepetitions + padding * (numRepetitions - 1);
    
    let startX = (width - totalWidth) / 2;
    let startY = (height - totalHeight) / 2;
    
    for (let i = 0; i < numRepetitions; i++) {
      for (let j = 0; j < numRepetitions; j++) {
        let x = startX + (size + padding) * i;
        let y = startY + (size + padding) * j;
        drawShape(x, y, size);
      }
    }
  }
  
  function drawShape(x, y, size) {
    curve(x, y, x + size * 0.2, y - size * 0.3, x + size * 0.8, y - size * 0.3, x + size, y);
    curve(x + size, y, x + size * 0.8, y + size * 0.3, x + size * 0.2, y + size * 0.3, x, y + size);
    
    curve(x, y, x + size * 0.2, y + size * 0.3, x + size * 0.8, y + size * 0.3, x + size, y + size);
    curve(x + size, y + size, x + size * 0.8, y - size * 0.3, x + size * 0.2, y - size * 0.3, x, y);
  }
  