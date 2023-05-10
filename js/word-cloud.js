var txt;
var order = 2;
var ngrams = {};
var button;
var canvasWidth = 800;
var canvasHeight = 800;
var words = [];

function preload() {
  txt = loadStrings('/assets/shakespeare.txt');
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background(0);
  txt = txt.join(' ');
  words = txt.split(/\s+/); // Split into an array of words

  for (var i = 0; i <= words.length - order; i++) {
    var gram = words.slice(i, i + order).join(' '); // Use join() to create n-grams of whole words

    if (!ngrams[gram]) {
      ngrams[gram] = [];
    }
    ngrams[gram].push(words[i + order]);
  }

  var startingIndex = floor(random(words.length - order)); // Choose a random starting index
  var currentGram = words.slice(startingIndex, startingIndex + order).join(' ');
  var result = currentGram;

  // Continue generating words as before
  for (var i = 0; i < 40; i++) {
    var possibilities = ngrams[currentGram];
    if (!possibilities) {
      break;
    }
    var next = random(possibilities);
    result += ' ' + next;
    words = result.split(/\s+/);
    var len = words.length;
    currentGram = words.slice(len - order, len).join(' ');
  }

  // Create a word cloud from the generated text
  var frequencies = {};
  var maxFrequency = 0;
  for (var i = 0; i < words.length; i++) {
    var word = words[i].toLowerCase();
    if (/\w+/.test(word)) {
      frequencies[word] = (frequencies[word] || 0) + 1;
      if (frequencies[word] > maxFrequency) {
        maxFrequency = frequencies[word];
      }
    }
  }

  var minFontSize = 30;
  var maxFontSize = 100;
  textSize(20);
  textAlign(CENTER, CENTER);
  var keys = Object.keys(frequencies);
  for (var i = 0; i < keys.length; i++) {
    var word = keys[i];
    var frequency = frequencies[word];
    var size = map(frequency, 1, maxFrequency, minFontSize, maxFontSize);
    textSize(size);
    fill(random(255), random(255), random(255));
    text(word, random(width), random(height));
  }


}
