window.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-game-button");
  const audioToggle = document.getElementById("menu-audio-toggle");
  const guideToggle = document.getElementById("guide-toggle");
  const guideModal = document.getElementById("guide-modal");
  const guideClose = document.getElementById("guide-close");
  const menuTheme = document.getElementById("menu-theme");

  let audioEnabled = false;

  function syncAudioLabel() {
    if (!audioToggle) {
      return;
    }

    audioToggle.textContent = audioEnabled ? "Music: On" : "Music: Off";
    audioToggle.setAttribute("aria-pressed", String(audioEnabled));
  }

  function setGuideOpen(isOpen) {
    if (!guideModal || !guideToggle) {
      return;
    }

    guideToggle.setAttribute("aria-expanded", String(isOpen));

    if (isOpen) {
      guideModal.hidden = false;
      window.requestAnimationFrame(() => guideModal.classList.add("is-visible"));
      return;
    }

    guideModal.classList.remove("is-visible");
    window.setTimeout(() => {
      if (!guideModal.classList.contains("is-visible")) {
        guideModal.hidden = true;
      }
    }, 220);
  }

  async function toggleAudio() {
    if (!menuTheme) {
      return;
    }

    if (audioEnabled) {
      menuTheme.pause();
      menuTheme.currentTime = 0;
      audioEnabled = false;
      syncAudioLabel();
      return;
    }

    try {
      menuTheme.volume = 0.34;
      await menuTheme.play();
      audioEnabled = true;
    } catch (error) {
      audioEnabled = false;
    }

    syncAudioLabel();
  }

  if (startButton) {
    startButton.addEventListener("click", () => {
      document.body.classList.add("menu-leaving");
      window.setTimeout(() => {
        window.location.href = "./game/";
      }, 260);
    });
  }

  if (audioToggle) {
    audioToggle.addEventListener("click", toggleAudio);
    syncAudioLabel();
  }

  if (guideToggle) {
    guideToggle.addEventListener("click", () => {
      const shouldOpen = guideModal.hidden || !guideModal.classList.contains("is-visible");
      setGuideOpen(shouldOpen);
    });
  }

  if (guideClose) {
    guideClose.addEventListener("click", () => setGuideOpen(false));
  }

  if (guideModal) {
    guideModal.addEventListener("click", (event) => {
      if (event.target === guideModal) {
        setGuideOpen(false);
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setGuideOpen(false);
    }
  });
});
