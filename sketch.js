let mic;
let t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  strokeWeight(1.5);
  stroke(200, 230);

  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(0, 20);
  translate(0, height / 2);

  let level = mic.getLevel(); // 0.0〜1.0
  let noiseStrength = map(level, 0, 0.3, 0.05, 1.5, true); // より強調

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
