let mic;
let t = 0;
let numLines = 8;
let noiseSeeds = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  strokeWeight(1);
  stroke(200, 230);

  mic = new p5.AudioIn();
  mic.start();

  for (let i = 0; i < numLines; i++) {
    noiseSeeds.push(random(1000));
  }
}

function draw() {
  background(0, 20);

  let level = mic.getLevel(); // 0〜1程度
  let noiseStrength = map(level, 0, 0.2, 0.1, 1.5, true); // 音の大きさで揺らぎ調整

  for (let i = 0; i < numLines; i++) {
    let yOffset = map(i, 0, numLines - 1, height * 0.2, height * 0.8); // 縦位置
    drawWaveLine(yOffset, noiseSeeds[i], noiseStrength);
  }

  t += 0.01;
}

function drawWaveLine(yBase, seed, strength) {
  beginShape();
  for (let x = 0; x < width; x += 4) {
    let freq = 0.005;
    let sine = sin(TWO_PI * freq * x + t + seed);
    let noiseVal = noise(x * 0.01 + seed, t * 0.01 + seed);
    let y = yBase + map(sine * 0.7 + noiseVal * strength, -1, 1, -40, 40);
    vertex(x, y);
  }
  endShape();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
