window.DwellerAudio = (() => {
  const cueSources = {
    urgent: "../assets/audio/alien-urgent.wav",
    reflective: "../assets/audio/alien-reflective.wav",
    amused: "../assets/audio/alien-amused.wav",
    disturbed: "../assets/audio/alien-disturbed.wav",
    withdrawn: "../assets/audio/alien-withdrawn.wav",
  };

  const cueVolumes = {
    urgent: 0.7,
    reflective: 0.52,
    amused: 0.5,
    disturbed: 0.62,
    withdrawn: 0.56,
  };

  const themeVolumes = {
    main: 0.34,
    good: 0.42,
    bad: 0.4,
  };

  const themeLabels = {
    main: "Main theme playing",
    good: "Good ending theme playing",
    bad: "Bad ending theme playing",
  };

  function setupAudio(dom) {
    if (!dom.audioToggle || !dom.audioStatus || !dom.mainTheme || !dom.goodEndingTheme || !dom.badEndingTheme) {
      return null;
    }

    const themes = {
      main: dom.mainTheme,
      good: dom.goodEndingTheme,
      bad: dom.badEndingTheme,
    };

    let enabled = false;
    let targetTheme = "main";
    let fadeToken = 0;
    let statusOverride = "";
    let wantsResume = window.localStorage.getItem("dwellerMusic") === "on";
    const sessionPreference = window.sessionStorage.getItem("dwellerMusicEntry");

    if (sessionPreference === "resume") {
      wantsResume = true;
    }

    Object.values(themes).forEach((audio) => {
      audio.volume = 0;
      audio.preload = "auto";
    });

    function getThemeVolume(themeKey) {
      return themeVolumes[themeKey] || themeVolumes.main;
    }

    function updateAudioUi() {
      if (dom.audioToggle) {
        dom.audioToggle.textContent = enabled
          ? "Pause soundtrack"
          : wantsResume
            ? "Resume soundtrack"
            : "Enable soundtrack";
        dom.audioToggle.setAttribute("aria-pressed", String(enabled));
      }

      if (statusOverride) {
        dom.audioStatus.textContent = statusOverride;
        return;
      }

      dom.audioStatus.textContent = enabled
        ? themeLabels[targetTheme]
        : wantsResume
          ? "Music is set to on. Press once if your browser paused it on entry."
          : "Audio off";
    }

    async function safePlay(audio) {
      try {
        await audio.play();
        return true;
      } catch (error) {
        return false;
      }
    }

    function stopAllThemes() {
      fadeToken += 1;
      Object.values(themes).forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
        audio.volume = 0;
      });
    }

    function crossfadeTo(themeKey) {
      if (!themes[themeKey]) {
        return;
      }

      targetTheme = themeKey;
      statusOverride = "";

      if (!enabled) {
        updateAudioUi();
        return;
      }

      const nextTheme = themes[themeKey];
      const previousThemes = Object.entries(themes).filter(([key]) => key !== themeKey);
      const currentToken = ++fadeToken;

      nextTheme.volume = 0;

      safePlay(nextTheme).then((played) => {
        if (!played || currentToken !== fadeToken) {
          updateAudioUi();
          return;
        }

        const start = performance.now();
        const duration = 900;

        function step(now) {
          if (currentToken !== fadeToken) {
            return;
          }

          const progress = Math.min(1, (now - start) / duration);
          nextTheme.volume = getThemeVolume(themeKey) * progress;

          previousThemes.forEach(([key, audio]) => {
            audio.volume = getThemeVolume(key) * (1 - progress);
          });

          if (progress < 1) {
            window.requestAnimationFrame(step);
            return;
          }

          previousThemes.forEach(([, audio]) => {
            audio.pause();
            audio.currentTime = 0;
            audio.volume = 0;
          });
          nextTheme.volume = getThemeVolume(themeKey);
          updateAudioUi();
        }

        window.requestAnimationFrame(step);
      });
    }

    async function enableAudio(isAutoStart = false) {
      wantsResume = true;
      statusOverride = "";

      const played = await safePlay(themes[targetTheme]);

      if (!played) {
        enabled = false;
        wantsResume = true;
        window.localStorage.setItem("dwellerMusic", "on");
        statusOverride = isAutoStart
          ? "Music was left on in the menu. Press once to resume it here."
          : "Browser blocked audio. Press again after interacting with the page.";
        updateAudioUi();
        return false;
      }

      enabled = true;
      wantsResume = true;
      window.localStorage.setItem("dwellerMusic", "on");
      window.sessionStorage.removeItem("dwellerMusicEntry");
      themes[targetTheme].volume = getThemeVolume(targetTheme);
      updateAudioUi();
      return true;
    }

    function disableAudio() {
      enabled = false;
      wantsResume = false;
      statusOverride = "";
      window.localStorage.setItem("dwellerMusic", "off");
      window.sessionStorage.setItem("dwellerMusicEntry", "off");
      stopAllThemes();
      updateAudioUi();
    }

    async function toggleAudio() {
      if (enabled) {
        disableAudio();
        return false;
      }

      return enableAudio(false);
    }

    function playCue(cueKey) {
      if (!enabled || !cueKey) {
        return;
      }

      const resolvedCue = cueKey === "attentive" ? "reflective" : cueKey === "neutral" ? null : cueKey;
      const src = cueSources[resolvedCue];

      if (!src) {
        return;
      }

      const cue = new Audio(src);
      const activeTheme = themes[targetTheme];
      const activeThemeVolume = getThemeVolume(targetTheme);
      let restored = false;

      cue.preload = "auto";
      cue.volume = cueVolumes[resolvedCue] || 0.52;

      if (activeTheme && !activeTheme.paused) {
        activeTheme.volume = Math.max(0.12, activeTheme.volume - 0.16);
      }

      const restoreTheme = () => {
        if (restored || !enabled) {
          return;
        }

        restored = true;
        if (activeTheme && !activeTheme.paused) {
          activeTheme.volume = activeThemeVolume;
        }
      };

      cue.addEventListener("ended", restoreTheme, { once: true });
      window.setTimeout(restoreTheme, 1400);
      cue.play().catch(restoreTheme);
    }

    if (dom.audioToggle) {
      dom.audioToggle.addEventListener("click", toggleAudio);
    }

    updateAudioUi();

    if (wantsResume) {
      window.setTimeout(() => {
        enableAudio(true);
      }, 80);
    }

    return {
      setTheme: crossfadeTo,
      playCue,
      toggleAudio,
      enableAudio,
      disableAudio,
      isEnabled: () => enabled,
    };
  }

  return {
    setupAudio,
  };
})();
