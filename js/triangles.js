let axiom = "F+F+F";
let sentence = axiom;
let len = 50;

let rules = [];
rules[0] = {
  a: "F",
  b: "F-F+F"
};

function generate() {
  len *= 0.8;
  let nextSentence = "";
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    let found = false;
    for (let j = 0; j < rules.length; j++) {
      if (current == rules[j].a) {
        found = true;
        nextSentence += rules[j].b;
        break;
      }
    }
    if (!found) {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
  turtle();
}

function turtle() {
  background(51);
  resetMatrix();
  translate(width / 2, height/6);
  stroke(255, 100);
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);

    if (current == "F") {
      line(0, 0, 0, -len);
      translate(0, -len);
    } else if (current == "+") {
      rotate(-radians(120));
    } else if (current == "-") {
      rotate(radians(120));
    } else if (current == "[") {
      push();
    } else if (current == "]") {
      pop();
    }
  }
}

function setup() {
  createCanvas(800, 800);
  background(51);
  turtle();
  let button = createButton("Generate");
  button.mousePressed(generate);
}