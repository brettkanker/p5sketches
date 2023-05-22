let spread;
let inc;
let margin;
let vertOffset;
// extra flat line at either end
let extraLine = 70;
// steps between vertexes
let step = 3;
// spacing between lines
let ySpacing = 2.6

// noise settings
let offset = 0;
let offsetInc = 0
let rowOffset = 40
let lineMultiplier = 27

// fuzz settings
let fuzzOffset = 1000;
let fuzzInc = offsetInc
let fuzzMultiplier = 3.5

function preload() {
    song = loadSound("/assets/Joy_Division-Disorder.mp3");
}

function setup() {
  createCanvas(600, 600);
  background(200)

  amplitude = new p5.Amplitude();
  amplitude.setInput(song);

  margin = width / 3;
  vertOffset = width / 4.6;
  spread = width - margin * 2
  inc = TWO_PI * step / spread;
  stroke(255)
  strokeWeight(1.2)
  fill(0)
  // noFill()
  frameRate(24)
}

function draw() {
  background(0);

  if (song.isLoaded() && !song.isPlaying()) {
    song.play(); // Start playing the audio file
  }

  let level = amplitude.getLevel(); // Get the current audio level
  offsetInc = level * 2;
//   fuzzOffset = level * 1000;

  // make rows
  for (let y = 0; y <= 50 * ySpacing; y += ySpacing) {
    let a = 0.0;
    // begin the line
    beginShape();
    for (let x = -extraLine; x <= spread + extraLine; x += step) {
      // perlin noise
      let n = noise(offset + x / rowOffset + y) * lineMultiplier;
      // flatten the line if not in the 'spread' area
      if (x < 0 || x > spread) a = 0;
      // use a sine wave to multiply the noise
      let vert = ((1 - sin(a + PI / 2)) * n)
      // add some extra fuzz to the line
      let fuzz = noise(fuzzOffset + x / rowOffset + y) * fuzzMultiplier;
      // draw the line
      vertex(x + margin, height - vert - (height - y * ySpacing) + vertOffset + fuzz);
      //increment the angle for the sine wave.
      a = a + inc;
    }
    endShape()
  }
  // increment the noise and fuzz
  offset += offsetInc;
  fuzzOffset += fuzzInc
}