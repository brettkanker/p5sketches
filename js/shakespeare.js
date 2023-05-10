var txt;
var order = 2;
var ngrams = {};
var button;
var canvasWidth = 1600;
var canvasHeight = 800;
var squareWidth = 400;
var squareHeight = 400;
var squaresPerRow = 4;
var squares = [];

function preload() {
  txt = loadStrings('/assets/shakespeare.txt');
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  txt = txt.join(' ');
  var words = txt.split(/\s+/); // Split into an array of words

  for (var i = 0; i <= words.length - order; i++) {
    var gram = words.slice(i, i + order).join(' '); // Use join() to create n-grams of whole words

    if (!ngrams[gram]) {
      ngrams[gram] = [];
    }
    ngrams[gram].push(words[i + order]);
  }
  
  button = createButton("generate");
  button.mousePressed(generateSquare);
}

function generateSquare() {
  var words = txt.split(/\s+/);
  var startingIndex = floor(random(words.length - order)); // Choose a random starting index
  var currentGram = words.slice(startingIndex, startingIndex + order).join(' ');
  var result = currentGram;

  // Continue generating words as before
  for (var i = 0; i < 50; i++) {
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

  // Create a new colored square with the generated text
  var newSquare = createGraphics(squareWidth, squareHeight);
  newSquare.background(random(255), random(255), random(255));
  newSquare.textSize(24);
  newSquare.text(result, 10, 50, 390, 400);
  squares.push(newSquare);

  // If there are more than four squares, start a new row
  if (squares.length > squaresPerRow) {
    translate(0, squareHeight);
    squares.splice(0, squaresPerRow);
  }

  // Display all the squares
  for (var i = 0; i < squares.length; i++) {
    var x = i * squareWidth;
    var y = (floor(i / squaresPerRow)) * squareHeight;
    image(squares[i], x, y);
  }
}
