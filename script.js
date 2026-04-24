const intro = document.querySelector("#intro");
const spotlight = document.querySelector(".intro-spotlight");
const introButton = document.querySelector(".scroll-landing");
const teaButton = document.querySelector(".scroll-tea");
const pupils = [...document.querySelectorAll(".pupil")];
const eyes = [...document.querySelectorAll(".googly-eye")];
const typingLine = document.querySelector(".typing-line");

if (intro && spotlight) {
  intro.addEventListener("pointermove", (event) => {
    const rect = intro.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    spotlight.style.setProperty("--x", `${x}%`);
    spotlight.style.setProperty("--y", `${y}%`);
  });
}

const scrollToSection = (selector) => {
  const target = document.querySelector(selector);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

introButton?.addEventListener("click", () => scrollToSection("#landing"));
teaButton?.addEventListener("click", () => scrollToSection("#tea"));

window.addEventListener("pointermove", (event) => {
  eyes.forEach((eye, index) => {
    const pupil = pupils[index];
    const rect = eye.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
    const distance = 9;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    pupil.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
  });
});

document.querySelectorAll(".tea-envelope").forEach((item) => {
  const button = item.querySelector(".image-envelope");
  const note = item.querySelector(".paper-note");
  const text = item.dataset.note ?? "";
  let dragging = false;
  let startX = 0;
  let startY = 0;
  let left = 0;
  let top = 0;

  if (note) {
    note.textContent = text;
  }

  button?.addEventListener("click", (event) => {
    if (dragging) {
      event.preventDefault();
      return;
    }

    item.classList.toggle("is-open");
  });

  item.addEventListener("pointerdown", (event) => {
    dragging = false;
    startX = event.clientX;
    startY = event.clientY;
    left = item.offsetLeft;
    top = item.offsetTop;
    item.setPointerCapture(event.pointerId);
  });

  item.addEventListener("pointermove", (event) => {
    if (!item.hasPointerCapture(event.pointerId)) {
      return;
    }

    const dx = event.clientX - startX;
    const dy = event.clientY - startY;

    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      dragging = true;
    }

    if (dragging) {
      item.style.left = `${left + dx}px`;
      item.style.top = `${top + dy}px`;
    }
  });

  const release = (event) => {
    if (item.hasPointerCapture(event.pointerId)) {
      item.releasePointerCapture(event.pointerId);
    }

    window.setTimeout(() => {
      dragging = false;
    }, 0);
  };

  item.addEventListener("pointerup", release);
  item.addEventListener("pointercancel", release);
});

if (typingLine) {
  const fullText = "and who am i?\nthat's one\nsecret i'll\nnever tell";
  let index = 0;

  const typeText = () => {
    typingLine.textContent = fullText.slice(0, index);
    if (index < fullText.length) {
      index += 1;
      window.setTimeout(typeText, 55);
    }
  };

  typeText();
}
