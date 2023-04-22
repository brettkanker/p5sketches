let currentColor = 'black';
let currentShape = 'brush';

function setup() {
  createCanvas(800, 600);
  background(255);
  
  // Create buttons for each color
  const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'brown', 'white', 'black'];
  colors.forEach((color) => {
    const button = createButton(color);
    button.mousePressed(() => {
      currentColor = color;
      currentShape = 'brush';
    });
    button.parent('color-buttons');
  });
  
  // Create buttons for each shape
  const shapes = ['circle', 'square', 'ellipse', 'triangle', 'trapez'];
  shapes.forEach((shape) => {
    const button = createButton(shape);
    button.mousePressed(() => {
      currentShape = shape;
    });
    button.parent('shape-buttons');
  });
  
  // Create button to generate noise
  const noiseButton = createButton('Generate Noise');
  noiseButton.mousePressed(generateNoise);
  noiseButton.parent('noise-button');
}

function draw() {
  // If the mouse is pressed, draw the current shape at the mouse position
  if (mouseIsPressed) {
    fill(currentColor);
    stroke(currentColor);
    switch (currentShape) {
      case 'brush':
        ellipse(mouseX, mouseY, 20, 20);
        break;
      case 'circle':
        ellipse(mouseX, mouseY, 50, 50);
        break;
      case 'square':
        rect(mouseX, mouseY, 50, 50);
        break;
      case 'ellipse':
        ellipse(mouseX, mouseY, 100, 50);
        break;
      case 'triangle':
        triangle(mouseX, mouseY, mouseX + 50, mouseY + 50, mouseX - 50, mouseY + 50);
        break;
      case 'trapez':
        quad(mouseX - 50, mouseY + 50, mouseX + 50, mouseY + 50, mouseX + 100, mouseY, mouseX - 100, mouseY);
        break;
    }
  }
}

function generateNoise() {
  // Create a new audio context
  const audioCtx = new AudioContext();

  // Create a new audio buffer with 1 channel (mono) and a length equal to the width of the canvas
  const buffer = audioCtx.createBuffer(1, width, audioCtx.sampleRate);

  // Get the channel data from the buffer
  const channel = buffer.getChannelData(0);

  // Loop through each x-coordinate in the canvas and map the pixel value to a waveform value
  for (let x = 0; x < width; x++) {
    // Calculate the y-coordinate of the noise based on the current time and the x-coordinate
    const y = map(noise(x * 0.01, frameCount * 0.01), 0, 1, 0, height);

    // Calculate the brightness of the pixel at the current x,y-coordinate
    const brightnessValue = brightness(get(x, y));

    // Map the brightness value to a waveform value
    const waveformValue = map(brightnessValue, 0, 255, -1, 1);

    // Add the waveform value to the channel data
    channel[x] = waveformValue;
  }

  // Create a new buffer source and connect it to the audio context
  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.connect(audioCtx.destination);

  // Start playing the buffer source and loop it indefinitely
  source.loop = true;
  source.start(0);
}


