let mic;
let t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  strokeWeight(1.5);
  stroke(200, 230);

  mic = new p5.AudioIn();
  mic.start(); // マイク入力の開始（アクセス許可必須）
}

function draw() {
  background(0, 20);
  translate(0, height / 2);

  let level = mic.getLevel(); // マイク音量レベル（0〜1程度）

  // マッピング強化（無音時でも微かに揺れる）
  let noiseStrength = map(level, 0, 0.2, 0.05, 1.5, true);

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
