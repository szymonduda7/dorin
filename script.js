document.getElementById("yr").textContent = new Date().getFullYear();

const mapIframe = document.getElementById("map-iframe");
if (mapIframe && window.MAPS_API_KEY && window.MAPS_API_KEY !== 'YOUR_KEY_HERE') {
  const place = "Szosa+Bydgoska+59,+88-100+Inowroc%C5%82aw,+Poland";
  mapIframe.src =
    "https://www.google.com/maps/embed/v1/place?key=" +
    window.MAPS_API_KEY +
    "&q=" +
    place;
}

const canvas = document.getElementById("wave-canvas");
const ctx = canvas.getContext("2d");
let t = 0;
let running = true;

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

function resize() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

resize();
window.addEventListener("resize", resize);

function drawWaves() {
  if (!running) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const numWaves = 7;
  for (let i = 0; i < numWaves; i++) {
    const y = (canvas.height / (numWaves + 1)) * (i + 1);
    const amp = 18 + i * 4;
    const freq = 0.006 - i * 0.0003;
    const speed = 0.3 + i * 0.07;
    ctx.beginPath();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1.2;
    ctx.globalAlpha = 0.6 - i * 0.06;
    for (let x = 0; x <= canvas.width; x += 2) {
      const yw = y + Math.sin(x * freq + t * speed) * amp;
      if (x === 0) ctx.moveTo(x, yw);
      else ctx.lineTo(x, yw);
    }
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  if (!prefersReducedMotion) {
    t += 0.018;
    requestAnimationFrame(drawWaves);
  }
}

if (!prefersReducedMotion) {
  drawWaves();
} else {
  t = 0;
  drawWaves();
  running = false;
}
