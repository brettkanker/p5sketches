function setup(){
    createCanvas(1600, 1000);
    strokeWeight(10);
}

function draw(){
    background(0);
    for (let i = 0; i <= innerWidth; i += 20) {
        // Green and yellow
        stroke(0, 255, 0);
        line(0, i, width/2, i);

        stroke(255, 255, 0);
        line(i, 0, i, height/2);

        // Purple and cyan
        stroke(190, 34, 201);
        line(0, i, width, i);

        stroke(0, 255, 2);
        line(i, 0, i, height);
    }
}