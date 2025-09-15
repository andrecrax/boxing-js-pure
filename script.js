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

function speakNumber(num) {
  const msg = new SpeechSynthesisUtterance();

  const palavras = {
    1: "um",
    2: "dois",
    3: "três",
    4: "quatro"
  };

  msg.text = palavras[num] || num;
  msg.lang = "pt-BR";

  // O slider controla também a velocidade da fala
  msg.rate = parseFloat(speedSlider.value);

  window.speechSynthesis.cancel(); // evita sobreposição de vozes
  window.speechSynthesis.speak(msg);
}

function createRandomButton() {
  container.innerHTML = '';

  const btnValue = Math.floor(Math.random() * 4) + 1;

  // Fala o número 0.1s antes de aparecer
  setTimeout(() => {
    speakNumber(btnValue);
  }, 0); // dispara já, sem atraso

  // Depois delay, mostra o botão
  setTimeout(() => {
    const btn = document.createElement("button");
    btn.textContent = btnValue;
    btn.className = "random-btn"; 
    container.appendChild(btn);
  }, 200); // atraso ms
}

function startRandomButtons() {
  createRandomButton();

  // Velocidade do sorteio (quanto maior o slider, maior o intervalo)
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

// Slider controla tanto fala quanto intervalo
speedSlider.addEventListener("input", () => {
  speedValue.textContent = speedSlider.value;

  if (running) {
    clearInterval(interval);
    startRandomButtons();
  }
});
