const container = document.getElementById("button-container");
const toggleBtn = document.getElementById("toggle-btn");
const speedSlider = document.getElementById("speed-slider");
const speedValue = document.getElementById("speed-value");
const mirrorBtn = document.getElementById("mirror-btn"); 

let interval = null;
let running = false;
let mirrored = false; 

mirrorBtn.addEventListener("click", () => {
  mirrored = !mirrored;
  container.classList.toggle("mirrored", mirrored);
  mirrorBtn.textContent = mirrored ? "Desespelhar" : "Espelhar";
});

function createRandomButton() {
  container.innerHTML = '';

  // Pequeno atraso para "desaparecer" antes de mostrar novo
  setTimeout(() => {
    // Gera um número inteiro entre 1 e 4
    const btnValue = Math.floor(Math.random() * 4) + 1;
    
    const btn = document.createElement("button");
    btn.textContent = btnValue;
    btn.className = "random-btn"; 
    container.appendChild(btn);
  }, 100);
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
