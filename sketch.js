let mic;
let fft;
let started = false;
const waveHistory = [];
const historyLength = 120;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.id('vj-canvas');
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  noLoop();

  const startButton = document.getElementById('startButton');
  if (startButton) {
    startButton.addEventListener('click', async () => {
      await initAudio();
      startButton.closest('.instructions')?.classList.add('hidden');
    });
  }
}

async function initAudio() {
  if (started) return;
  try {
    userStartAudio();
    mic = new p5.AudioIn();
    await mic.start();

    fft = new p5.FFT(0.8, 1024);
    fft.setInput(mic);

    started = true;
    loop();
  } catch (err) {
    console.error('Audio initialization failed:', err);
    const button = document.getElementById('startButton');
    if (button) {
      button.textContent = 'マイクアクセスが拒否されました';
      button.disabled = true;
      button.style.cursor = 'not-allowed';
    }
  }
}

function draw() {
  if (!started) {
    background(0);
    return;
  }

  background(0, 0, 0, 15);

  const spectrum = fft.analyze();
  const bass = fft.getEnergy('bass');
  const mid = fft.getEnergy('mid');
  const treble = fft.getEnergy('treble');
  const level = mic.getLevel() * 600;

  waveHistory.unshift(level);
  if (waveHistory.length > historyLength) {
    waveHistory.pop();
  }

  blendMode(ADD);
  strokeWeight(2);
  noFill();

  push();
  translate(width / 2, height / 2);
  const baseRadius = map(level, 0, 120, 80, min(width, height) / 2);

  stroke(map(bass, 0, 255, 0, 70), 90, 100, 50);
  drawOrganicCircle(baseRadius * 0.9, 35);

  stroke(map(mid, 0, 255, 120, 220), 80, 100, 55);
  drawOrganicCircle(baseRadius * 0.6, 55);

  stroke(map(treble, 0, 255, 240, 360), 60, 100, 65);
  drawOrganicCircle(baseRadius * 0.4, 85);
  pop();

  push();
  translate(width * 0.1, height * 0.8);
  stroke(48, 30, 100, 70);
  strokeWeight(3);
  beginShape();
  for (let i = 0; i < waveHistory.length; i++) {
    const x = map(i, 0, historyLength, 0, width * 0.8);
    const y = map(waveHistory[i], 0, 120, 0, -height * 0.3);
    curveVertex(x, y + sin(frameCount + i * 10) * 5);
  }
  endShape();
  pop();

  push();
  translate(width / 2, height / 2);
  stroke(200, 50, 100, 40);
  strokeWeight(2);
  beginShape();
  const step = 360 / spectrum.length;
  for (let i = 0; i < spectrum.length; i++) {
    const amp = spectrum[i];
    const angle = i * step;
    const rad = map(amp, 0, 255, 20, min(width, height) / 2);
    const x = rad * cos(angle + frameCount * 0.4);
    const y = rad * sin(angle + frameCount * 0.4);
    vertex(x, y);
  }
  endShape(CLOSE);
  pop();

  blendMode(BLEND);
}

function drawOrganicCircle(radius, noiseScale) {
  beginShape();
  const segments = 360 / 45;
  for (let angle = 0; angle < 360; angle += segments) {
    const noiseRadius = radius + noise(angle * 0.02, frameCount * 0.01) * noiseScale;
    const x = noiseRadius * cos(angle);
    const y = noiseRadius * sin(angle);
    curveVertex(x, y);
  }
  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
