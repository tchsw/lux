let t = 0;
let numLines = 8;
let waves = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  strokeWeight(1);
  stroke(255, 30); // 半透明で重なりを美しく

  // 各波形に個別の揺れパターン（周波数・振幅・ノイズシード）
  for (let i = 0; i < numLines; i++) {
    waves.push({
      freq: random(0.003, 0.01),
      amp: random(40, 80),
      noiseSeed: random(1000),
      phaseShift: random(TWO_PI)
    });
  }
}

function draw() {
  background(0, 20);

  for (let i = 0; i < numLines; i++) {
    drawWaveLine(waves[i]);
  }

  t += 0.01;
}

function drawWaveLine(wave) {
  beginShape();
  for (let x = 0; x < width; x += 4) {
    let sine = sin(TWO_PI * wave.freq * x + t + wave.phaseShift);
    let noiseVal = noise(x * 0.005 + wave.noiseSeed, t * 0.01);
    let yOffset = sine * wave.amp * 0.6 + (noiseVal - 0.5) * wave.amp * 0.8;
    vertex(x, height / 2 + yOffset);
  }
  endShape();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
