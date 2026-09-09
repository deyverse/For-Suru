
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
// Romantic background music
// IMPORTANT: Keep the music file in the same GitHub folder as index.html.
// File name must be exactly: romantic-melody.mp3
// ------------------------------------------------------------
let musicStarted = false;
let musicMuted = false;
let romanticAudio = null;

function getMusic() {
  if (!romanticAudio) {
    romanticAudio = document.getElementById("romanticMusic");

    // If the <audio> tag is missing from index.html, create it automatically.
    if (!romanticAudio) {
      romanticAudio = document.createElement("audio");
      romanticAudio.id = "romanticMusic";
      romanticAudio.src = "romantic-melody.mp3";
      romanticAudio.loop = true;
      romanticAudio.preload = "auto";
      romanticAudio.playsInline = true;
      document.body.appendChild(romanticAudio);
    }

    romanticAudio.volume = 0.55;

    romanticAudio.addEventListener("play", () => {
      musicStarted = true;
      updateMusicButton();
    });

    romanticAudio.addEventListener("pause", () => {
      if (!romanticAudio.ended) {
        musicStarted = false;
        updateMusicButton();
      }
    });

    romanticAudio.addEventListener("error", () => {
      console.error("Music could not be loaded. Check that romantic-melody.mp3 is in the same folder as index.html.");
    });
  }

  return romanticAudio;
}

async function startMusic() {
  const audio = getMusic();

  try {
    await audio.play();
    musicStarted = true;
    musicMuted = false;
    updateMusicButton();
  } catch (err) {
    console.error("Music playback failed:", err);
    updateMusicButton();
  }
}

function toggleMusic() {
  const audio = getMusic();

  if (audio.paused) {
    startMusic();
  } else {
    audio.pause();
    musicStarted = false;
    updateMusicButton();
  }
}

function updateMusicButton() {
  const btn = document.getElementById("musicToggle");
  if (!btn) return;

  const audio = romanticAudio;
  if (!audio || audio.paused) {
    btn.textContent = "🎵 Play Our Little Song";
  } else {
    btn.textContent = "🔇 Pause Our Song";
  }
}

// ------------------------------------------------------------
// ------------------------------------------------------------
// Story
// ------------------------------------------------------------
const messages = [
  "I don't know exactly when it happened...",
  "But somewhere between our conversations, silly moments, cute nok-jhoks and endless talks...",
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
