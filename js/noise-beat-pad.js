//https://joeiddon.github.io/projects/javascript/perlin.html

let perlin;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  perlin = {
    // Define a function to generate a random vector
    rand_vect: function(){
        let theta = random(0, 2 * PI);
        return {x: cos(theta), y: sin(theta)};
    },
    
    // Define a function to compute the dot product of the gradient vector and the distance vector
    dot_prod_grid: function(x, y, vx, vy){
        let g_vect;
        let d_vect = {x: x - vx, y: y - vy};
        
        if (this.gradients[[vx, vy]]){
            g_vect = this.gradients[[vx, vy]];
        } else {
            // If the gradient vector doesn't exist, generate a random vector and store it in the 'gradients' object
            g_vect = this.rand_vect();
            this.gradients[[vx, vy]] = g_vect;
        }
        
        // Compute and return the dot product
        return d_vect.x * g_vect.x + d_vect.y * g_vect.y;
    },
    
    // Define a smootherstep function for interpolation
    smootherstep: function(x){
        return 6 * pow(x, 5) - 15 * pow(x, 4) + 10 * pow(x, 3);
    },
    
    // Define a function for linear interpolation between two values 'a' and 'b'
    interp: function(x, a, b){
        return a + this.smootherstep(x) * (b - a);
    },
    
    // Initialize the 'gradients' and 'memory' objects
    seed: function(){
        this.gradients = {};
        this.memory = {};
    },
    
    // Get the Perlin noise value at coordinates (x, y)
    get: function(x, y) {
        let xf = floor(x);
        let yf = floor(y);
        
        // Interpolate the dot products
        let tl = this.dot_prod_grid(x, y, xf,   yf);
        let tr = this.dot_prod_grid(x, y, xf+1, yf);
        let bl = this.dot_prod_grid(x, y, xf,   yf+1);
        let br = this.dot_prod_grid(x, y, xf+1, yf+1);
        let xt = this.interp(x-xf, tl, tr);
        let xb = this.interp(x-xf, bl, br);
        let v = this.interp(y-yf, xt, xb);
        
        this.memory[[x, y]] = v;

        return v;
    }
  };
  
  // Initialize the Perlin noise generator by seeding the gradients and memory objects
  perlin.seed();
  
  // Generate the Perlin noise and display it on the canvas
  generateNoiseGrid();
}

function generateNoiseGrid() {
  let gridSize = 3; // Number of grid cells in each row and column
  let padding = 20; // Distance between each grid
  let cellSize = (min(width, height) - padding * (gridSize - 1)) / gridSize; // Calculate the size of each grid cell
  
  // Iterate over each grid cell in the grid
  for (let gridX = 0; gridX < gridSize; gridX++) {
    for (let gridY = 0; gridY < gridSize; gridY++) {
      // Calculate the offset of the current grid cell
      let offsetX = (cellSize + padding) * gridX;
      let offsetY = (cellSize + padding) * gridY;
      
      let noiseScale = 0.01; // Scale factor for the Perlin noise
      
      // Iterate over each pixel within the current grid cell
      for (let x = 0; x < cellSize; x++) {
        for (let y = 0; y < cellSize; y++) {
          // Calculate the actual coordinates within the canvas
          let actualX = offsetX + x;
          let actualY = offsetY + y;
          
          // Check if the current pixel is within the canvas bounds
          if (actualX < width && actualY < height) {
            // Get the Perlin noise value at the current coordinates scaled by noiseScale
            let noiseValue = perlin.get(actualX * noiseScale, actualY * noiseScale);
            
            // Map the Perlin noise value to a color value between 0 and 255
            let colorValue = map(noiseValue, 0, 1, 0, 255);
            
            // Set the color of the current pixel
            set(actualX, actualY, color(colorValue));
          }
        }
      }
    }
  }
  
  updatePixels(); // Update the canvas with the generated Perlin noise grid
}



