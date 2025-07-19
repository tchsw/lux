let mic;
let t = 0;
let numLines = 8;
let waves = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  strokeWeight(1);
  stroke(255, 30); // 重ねても光らないよう透過度低め

  mic = new p5.AudioIn();
  mic.start();

  // 各波形に異なるノイズシード・揺れパターンを設定
  for (let i = 0; i < numLines; i++) {
    waves.push({
      seed: random(1000),
      freq: random(0.003, 0.008),
      amp: random(0.5, 1.5)
    });
  }
}

function draw() {
  background(0, 20);

  let level = mic.getLevel(); // 0.0〜1.0
  let noiseStrength = map(level, 0, 0.2, 0.1, 1.2, true);

  // 全て中央ラインを基準に描画
  for (let i = 0; i < numLines; i++) {
    drawCenteredWave(waves[i], noiseStrength);
  }

  t += 0.01;
}

function drawCenteredWave(wave, strength) {
  beginShape();
  for (let x = 0; x < width; x += 4) {
    let sine = sin(TWO_PI * wave.freq * x + t + wave.seed);
    let noiseVal = noise(x * 0.01 + wave.seed, t * 0.01 + wave.seed);
    let yOffset = map(sine * wave.amp + noiseVal * strength, -1, 1, -80, 80);
    vertex(x, height / 2 + yOffset);
  }
  endShape();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
