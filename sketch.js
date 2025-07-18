let t = 0;
let noiseStrength = 0.5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  strokeWeight(1.5);
  stroke(200, 230);
}

function draw() {
  background(0, 20);
  translate(0, height / 2);

  let targetNoise = map(mouseY, 0, height, 1.0, 0.0);
  noiseStrength = lerp(noiseStrength, targetNoise, 0.05);

  beginShape();
  for (let x = 0; x < width; x += 4) {
    let baseFreq = 0.005;
    let sine = sin(TWO_PI * baseFreq * x + t);
    let noiseVal = noise(x * 0.01, t * 0.01);
    let y = map(sine * 0.7 + noiseVal * noiseStrength, -1, 1, -180, 180);
    vertex(x, y);
  }
  endShape();

  t += 0.01;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
