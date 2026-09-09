const messages = [
  "I don't know exactly when it happened...",
  "But somewhere between our conversations, silly moments, little fights and endless talks...",
  "You became someone incredibly special to me.",
  "And now, whenever I think about happiness...",
  "Somehow, I find you there. ❤️"
];

let messageIndex = 0;
let typingTimer = null;

function show(id) {
  document.querySelectorAll("section").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startStory() {
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
