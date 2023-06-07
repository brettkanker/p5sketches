// https://joeiddon.github.io/projects/javascript/perlin.html

let perlin;
let audioContext;
let gainNode;

function setup() {
  createCanvas(windowWidth, windowHeight);

  perlin = {
    // Define a function to generate a random vector
    rand_vect: function () {
      let theta = random(0, 2 * PI);
      return { x: cos(theta), y: sin(theta) };
    },

    // Define a function to compute the dot product of the gradient vector and the distance vector
    dot_prod_grid: function (x, y, vx, vy) {
      let g_vect;
      let d_vect = { x: x - vx, y: y - vy };

      if (this.gradients[[vx, vy]]) {
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
    smootherstep: function (x) {
      return 6 * pow(x, 5) - 15 * pow(x, 4) + 10 * pow(x, 3);
    },

    // Define a function for linear interpolation between two values 'a' and 'b'
    interp: function (x, a, b) {
      return a + this.smootherstep(x) * (b - a);
    },

    // Initialize the 'gradients' and 'memory' objects
    seed: function () {
      this.gradients = {};
      this.memory = {};
    },

    // Get the Perlin noise value at coordinates (x, y)
    get: function (x, y) {
      let xf = floor(x);
      let yf = floor(y);

      // Interpolate the dot products
      let tl = this.dot_prod_grid(x, y, xf, yf);
      let tr = this.dot_prod_grid(x, y, xf + 1, yf);
      let bl = this.dot_prod_grid(x, y, xf, yf + 1);
      let br = this.dot_prod_grid(x, y, xf + 1, yf + 1);
      let xt = this.interp(x - xf, tl, tr);
      let xb = this.interp(x - xf, bl, br);
      let v = this.interp(y - yf, xt, xb);

      this.memory[[x, y]] = v;

      return v;
    },
  };

  // Initialize the Perlin noise generator by seeding the gradients and memory objects
  perlin.seed();

  // Initialize the audio context and gain node
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  gainNode = audioContext.createGain();
  gainNode.connect(audioContext.destination);
  gainNode.gain.value = 0; // Mute the initial sound
}

function keyPressed() {
  // Check the key code to determine which grid cell to play the sound for
  if (key === "1") {
    playSound(0);
  } else if (key === "2") {
    playSound(1);
  } else if (key === "3") {
    playSound(2);
  } else if (key === "4") {
    playSound(3);
  } else if (key === "5") {
    playSound(4);
  } else if (key === "6") {
    playSound(5);
  } else if (key === "7") {
    playSound(6);
  } else if (key === "8") {
    playSound(7);
  } else if (key === "9") {
    playSound(8);
  }
}

function generateNoiseGrid(gridIndex, audioData) {
  audioData.length = 0; // Clear the audioData array

  let gridSize = 3; // Number of grid cells in each row and column
  let padding = 20; // Distance between each grid
  let cellSize = (min(width, height) - padding * (gridSize - 1)) / gridSize; // Calculate the size of each grid cell

  // Calculate the offset of the current grid cell
  let offsetX = (cellSize + padding) * (gridIndex % gridSize);
  let offsetY = (cellSize + padding) * floor(gridIndex / gridSize);

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

        // Map the Perlin noise value to a frequency value between 20 and 2000 Hz
        let frequency = map(noiseValue, 0, 1, 20, 1600);

        // Add the frequency to the audioData array
        audioData.push(frequency);
      }
    }
  }

  updatePixels(); // Update the canvas with the generated Perlin noise grid
}

function playSound(gridIndex) {
  let duration = 0.3; // Duration of the sound in seconds

  let audioData = []; // Create a new audioData array for each sound

  // Generate the Perlin noise and populate the audioData array for the specified grid cell
  generateNoiseGrid(gridIndex, audioData);

  // Create an audio buffer with the audio data
  let buffer = audioContext.createBuffer(1, audioData.length, audioContext.sampleRate);
  let channelData = buffer.getChannelData(0);
  for (let i = 0; i < audioData.length; i++) {
    channelData[i] = audioData[i];
  }

  // Create a buffer source node and connect it to the gain node
  let source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(gainNode);

  // Fade in the sound with attack time of 0.2 seconds
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.2);

  // Start playing the sound
  source.start();

  // Stop the sound after the specified duration
  setTimeout(() => {
    source.stop();
  }, duration * 1000); // Convert duration to milliseconds

  // Fade out the sound with release time after the specified duration
  gainNode.gain.setValueAtTime(1, audioContext.currentTime + duration);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration + 0.2);
}
