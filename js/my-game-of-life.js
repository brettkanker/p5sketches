// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Game of Life
// Video: https://youtu.be/FWSR_7kZuYg

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
    }
    return arr;
  }
  
  let button;
  let grid;
  let cols;
  let rows;
  let resolution = 10;
  let isGenerating = false;
  
  function setup() {
    createCanvas(1600, 1000);
    button = createButton("Start");
    button.mouseClicked(startGeneration);
    cols = width / resolution;
    rows = height / resolution;

    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = 0;
      }
    }
  }
  
  function draw() {
    background(0);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * resolution;
        let y = j * resolution;
        if (grid[i][j] === 1) {
          fill(255, 158, 0);
          stroke(0);
          rect(x, y, resolution - 1, resolution - 1);
        }
      }
    }
  
    if (isGenerating){
        let next = make2DArray(cols, rows);
  
        // Compute next based on grid
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            let state = grid[i][j];
            // Count live neighbors!
            let sum = 0;
            let neighbors = countNeighbors(grid, i, j);
      
            if (state == 0 && neighbors == 3) {
              next[i][j] = 1;
            } else if (state == 1 && (neighbors == 2 || neighbors == 3)) {
              next[i][j] = 1;
            } else if (state == 1 && neighbors >= 4) {
              next[i][j] = 1;
            } else {
              next[i][j] = 0;
            }                                                     
              

          }
        } 
        grid = next;
    }
  }
  
  
  function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let col = (x + i + cols) % cols;
        let row = (y + j + rows) % rows;
        sum += grid[col][row];
      }
    }
    sum -= grid[x][y];
    return sum;
  }

  // What I added

  function startGeneration() {
    isGenerating = true;
  }

  function mouseDragged() {
    if (!isGenerating) {
      // Get the cell indices based on the mouse position
      let i = Math.floor(mouseX / resolution);
      let j = Math.floor(mouseY / resolution);
  
      // Set the cell state to alive (1)
      grid[i][j] = 1;
    }
  }  
  
  function mousePressed() {
    // Get the cell indices based on the mouse position
    let i = Math.floor(mouseX / resolution);
    let j = Math.floor(mouseY / resolution);
  
    // Toggle the cell state between alive (1) and dead (0)
    if (grid[i][j] === 1) {
      grid[i][j] = 0;
    } else {
      grid[i][j] = 1;
    }
  }
  