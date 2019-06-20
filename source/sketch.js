let ls;
let walls = [];

let num = 360;
let type = 0;
let step = 10;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    ls = new LightSource(num);

    // screen boundary
    walls.push(new Boundary(-1, -1, width + 1, -1));
    walls.push(new Boundary(-1, -1, -1, height + 1));
    walls.push(new Boundary(-1, height + 1, width + 1, height + 1));
    walls.push(new Boundary(width + 1, -1, width + 1, height + 1));

    // inside boundaries
    walls.push(new Boundary(width / 4, height / 4, width / 4, 3 * height / 4));
    walls.push(new Boundary(3 * width / 4, height / 4, 5 * width / 6, 3 * height / 4));
}

function draw() {
    background(0);
    if (keyIsPressed) {
        if (key == 'a') {
            num += num < 1440 ? step : 0;
            ls = new LightSource(num);
        } else if (key == 's') {
            num -= num > step ? step : 0;
            ls = new LightSource(num);
        }
    }

    for (let wall of walls) {
        wall.show();
    }
    ls.changePos(mouseX, mouseY);
    ls.cast(walls, type);
}

// if mouse is clicked - create random boundary
function mouseClicked() {
    walls.push(new Boundary(random(0, width),
        random(0, height),
        random(0, width),
        random(0, height)));
}

// if keyboard is pressed
function keyPressed() {
    if (keyCode == 68) { // if 'd' is pressed change between display type
        type = !type;
    }
    return false;
}

