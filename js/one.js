var song;
var amp;
var button;
var slider;

var volhistory = [];

function toggleSong() {
    if (song.isPlaying()){
        song.pause();
    } else {
        song.play();
    }
}

function preload() {
  song = loadSound("../assets/Yellow_Swans-Sovereign.mp3");
}

function setup() {
  createCanvas(400, 400);
  slider = createSlider(0, 1, 0.5, 0.01)
  button = createButton('Play/Pause');
  button.mousePressed(toggleSong);
  amp = new p5.Amplitude();
}

function draw() {
  background(0);
  song.setVolume(slider.value())
  var vol = amp.getLevel();
  volhistory.push(vol);
  stroke(255);
  noFill();
  beginShape();
  for (var i = 0; i < volhistory.length; i++){
    var y = map(volhistory[i], 0, 1, height/1.5, 0);
    vertex(i, y);
  }
  endShape();

  if (volhistory.length > width){
    volhistory.splice(0, 1);
  }
}
