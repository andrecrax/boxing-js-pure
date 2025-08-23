const container = document.getElementById("button-container");
const toggleBtn = document.getElementById("toggle-btn");
const speedSlider = document.getElementById("speed-slider");
const speedValue = document.getElementById("speed-value");

let interval = null;
let running = false;

function createRandomButton() {
  // Remove botão anterior
  container.innerHTML = '';

  // Pequeno atraso para "desaparecer" antes de mostrar novo
  setTimeout(() => {
    const btnValue = Math.random() < 0.5 ? "1" : "2";
    const btn = document.createElement("button");
    btn.textContent = btnValue;
    btn.className = "random-btn"; // sempre redondo
    container.appendChild(btn);
  }, 100); // 100ms de intervalo para desaparecer
}

function startRandomButtons() {
  createRandomButton();
  const speed = parseFloat(speedSlider.value) * 1000;

  interval = setInterval(() => {
    createRandomButton();
  }, speed);
}

toggleBtn.addEventListener("click", () => {
  running = !running;
  toggleBtn.textContent = running ? "Parar" : "Iniciar";

  if (running) {
    startRandomButtons();
  } else {
    clearInterval(interval);
  }
});

speedSlider.addEventListener("input", () => {
  speedValue.textContent = speedSlider.value;

  if (running) {
    clearInterval(interval);
    startRandomButtons();
  }
});
