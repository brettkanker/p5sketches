let angle = 0;
var button;

function setup() {
  createCanvas(4000, 4000);
  background(0);
  button = createButton('Stop');
  button.mousePressed(stopLoop);
}

function draw() {
  stroke(random(255));
  translate(width / 2, height);
  branch(2000);
}

function branch(len) {
  line(0, 0, 0, -len);
  translate(0, -len);

  if (len > 4) {
    push();
    rotate(angle);
    branch(len * 0.67);
    pop();
    push();
    rotate(-angle);
    branch(len * 0.67);
    pop();
  }

  angle += 0.05;
}

function stopLoop(){
    noLoop();
    generateSound();
}

function generateSound() {
    // Get the image data from the canvas
    const imgData = document.getElementsByTagName('canvas')[0].getContext('2d').getImageData(0, 0, width, height).data;
    
    // Create a new audio context
    const audioCtx = new AudioContext();
  
    // Create a new audio buffer with 1 channel (mono) and a length equal to the width of the canvas
    const buffer = audioCtx.createBuffer(1, width, audioCtx.sampleRate);
  
    // Get the channel data from the buffer
    const channel = buffer.getChannelData(0);
  
    // Loop through each pixel in the image and map the pixel value to a waveform value
    for (let i = 0; i < imgData.length; i += 4) {
      // Map the red value of each pixel to a value between -1 and 1
      const waveformValue = map(imgData[i], 0, 255, -1, 1);
  
      // Add the waveform value to the channel data
      channel[i / 4] = waveformValue;
    }
  
    // Create a new buffer source and connect it to the audio context
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);
  
    // Start playing the buffer source
    source.start(0);
}
  