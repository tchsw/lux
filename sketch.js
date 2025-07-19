let t = 0;
let numLines = 8;
let waves = [];
let colors = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  background(230); // 淡いグレー背景

  // カラーパレット（ピンク・オレンジ・イエロー系パステル）
  colors = [
    color(255, 182, 193, 160), // light pink
    color(255, 204, 153, 160), // peach
    color(255, 240, 160, 160), // light yellow
    color(255, 160, 160, 160), // soft red
    color(255, 200, 170, 160), // coral
    color(255, 220, 180, 160),
    color(255, 190, 220, 160),
    color(255, 210, 170, 160)
  ];

  for (let i = 0; i < numLines; i++) {
    waves.push({
      freq: random(0.003, 0.009),
      amp: random(20, 40),
      noiseSeed: random(1000),
      phaseShift: random(TWO_PI)
    });
  }
}

function draw() {
  background(230, 30); // 軽い残像感を残す淡グレー
  for (let i = 0; i < numLines; i++) {
    stroke(colors[i]);
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
