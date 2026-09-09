
const SECRET_PASSWORD = "onlymine";

function unlockSurprise() {
  const input = document.getElementById("passwordInput");
  const error = document.getElementById("passwordError");
  const card = document.querySelector(".password-card");

  if (input.value === SECRET_PASSWORD) {
    error.textContent = "";
    document.getElementById("passwordScreen").classList.add("unlocked");

    // Start the original romantic melody only after user interaction.
    startMusic();

    setTimeout(() => {
      document.getElementById("opening").scrollIntoView({ behavior: "smooth" });
    }, 350);
  } else {
    error.textContent = "Hmm... that's not it, my baby 😏❤️ Try again.";
    card.classList.remove("shake");
    void card.offsetWidth;
    card.classList.add("shake");
    input.value = "";
    input.focus();
  }
}

let messageIndex = 0;
let typingTimer = null;

// ------------------------------------------------------------
// Original romantic background music
// Generated in the browser with Web Audio API.
// No external copyrighted audio file is needed.
// ------------------------------------------------------------
let audioCtx = null;
let masterGain = null;
let musicStarted = false;
let musicTimer = null;
let musicMuted = false;

const melody = [
  [261.63, 0.55], [329.63, 0.55], [392.00, 0.8],
  [329.63, 0.45], [293.66, 0.55], [329.63, 0.55],
  [440.00, 0.9], [392.00, 0.55],
  [349.23, 0.55], [329.63, 0.55], [293.66, 0.75],
  [261.63, 0.55], [293.66, 0.55], [392.00, 1.0]
];

function startMusic() {
  if (musicStarted) {
    if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
    return;
  }

  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  masterGain = audioCtx.createGain();
  masterGain.gain.value = 0.055;
  masterGain.connect(audioCtx.destination);

  musicStarted = true;
  scheduleMusicLoop();
  updateMusicButton();
}

function playNote(freq, duration, when) {
  if (!audioCtx || musicMuted) return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, when);

  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(0.18, when + 0.035);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + duration);

  osc.connect(gain);
  gain.connect(masterGain);
  osc.start(when);
  osc.stop(when + duration + 0.04);
}

function playPad(freq, duration, when) {
  if (!audioCtx || musicMuted) return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "triangle";
  osc.frequency.value = freq / 2;

  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.linearRampToValueAtTime(0.025, when + 0.3);
  gain.gain.linearRampToValueAtTime(0.0001, when + duration);

  osc.connect(gain);
  gain.connect(masterGain);
  osc.start(when);
  osc.stop(when + duration + 0.05);
}

function scheduleMusicLoop() {
  if (!audioCtx) return;

  const start = audioCtx.currentTime + 0.05;
  let t = start;

  melody.forEach(([freq, duration], index) => {
    playNote(freq, duration * 0.82, t);
    if (index % 4 === 0) playPad(freq, 2.3, t);
    t += duration;
  });

  const total = melody.reduce((sum, n) => sum + n[1], 0);
  musicTimer = setTimeout(scheduleMusicLoop, (total - 0.15) * 1000);
}

function toggleMusic() {
  if (!musicStarted) {
    startMusic();
    return;
  }

  musicMuted = !musicMuted;
  if (masterGain) masterGain.gain.value = musicMuted ? 0 : 0.055;
  updateMusicButton();
}

function updateMusicButton() {
  const btn = document.getElementById("musicToggle");
  if (!btn) return;
  btn.textContent = musicMuted ? "🔇 Music Off" : "🎵 Our Little Song";
}

// ------------------------------------------------------------
// Story
// ------------------------------------------------------------
const messages = [
  "I don't know exactly when it happened...",
  "But somewhere between our conversations, silly moments, little fights and endless talks...",
  "You became someone incredibly special to me.",
  "And now, whenever I think about happiness...",
  "Somehow, I find you there. ❤️"
];

function show(id) {
  document.querySelectorAll("section").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startStory() {
  startMusic();
  show("story");
  createHearts(12);
  typeMessage();
}

function typeMessage() {
  clearInterval(typingTimer);
  const target = document.getElementById("typing");
  const text = messages[messageIndex];
  target.textContent = "";
  let i = 0;

  typingTimer = setInterval(() => {
    target.textContent += text.charAt(i++);
    if (i >= text.length) clearInterval(typingTimer);
  }, 32);
}

function nextMessage() {
  messageIndex++;

  if (messageIndex < messages.length) {
    typeMessage();
  } else {
    show("memoriesIntro");
    createHearts(12);
  }
}

function showGallery() {
  startMusic();
  show("gallery");
  createHearts(14);
}

function showQuestion() {
  show("question");
  createHearts(10);
}

function moveButton() {
  const btn = document.getElementById("noBtn");
  const x = Math.max(10, Math.random() * (window.innerWidth - btn.offsetWidth - 20));
  const y = Math.max(10, Math.random() * (window.innerHeight - btn.offsetHeight - 20));

  btn.style.position = "fixed";
  btn.style.left = `${x}px`;
  btn.style.top = `${y}px`;
}

function yesAnswer() {
  show("final");
  createHearts(30);

  if (!musicStarted) startMusic();

  setInterval(() => createHearts(1), 700);
}

function createHeart() {
  const el = document.createElement("div");
  el.className = "floating-heart";
  el.textContent = ["❤️","💖","💕","💗","💓","💞","✨","🥰"][Math.floor(Math.random() * 8)];
  el.style.left = `${Math.random() * 100}vw`;
  el.style.fontSize = `${15 + Math.random() * 25}px`;
  el.style.animationDuration = `${4 + Math.random() * 4}s`;

  document.body.appendChild(el);
  setTimeout(() => el.remove(), 8500);
}

function createHearts(count) {
  for (let i = 0; i < count; i++) {
    setTimeout(createHeart, i * 120);
  }
}
