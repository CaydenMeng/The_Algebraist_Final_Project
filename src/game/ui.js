window.DwellerUI = (() => {
  function getDomRefs() {
    return {
      appShell: document.getElementById("app-shell"),
      text: document.getElementById("text"),
      choices: document.getElementById("choices"),
      sceneTitle: document.getElementById("scene-title"),
      sceneTag: document.getElementById("scene-tag"),
      phaseLabel: document.getElementById("phase-label"),
      speakerName: document.getElementById("speaker-name"),
      speakerNote: document.getElementById("speaker-note"),
      statusNote: document.getElementById("status-note"),
      logbook: document.getElementById("logbook"),
      responsePanel: document.getElementById("response-panel"),
      responseSignal: document.getElementById("response-signal"),
      responseTranslation: document.getElementById("response-translation"),
      urgencyValue: document.getElementById("urgency-value"),
      trustValue: document.getElementById("trust-value"),
      archiveValue: document.getElementById("archive-value"),
      urgencyBar: document.getElementById("urgency-bar"),
      trustBar: document.getElementById("trust-bar"),
      archiveBar: document.getElementById("archive-bar"),
      audioToggle: document.getElementById("audio-toggle"),
      audioStatus: document.getElementById("audio-status"),
      mainTheme: document.getElementById("main-theme"),
      goodEndingTheme: document.getElementById("good-ending-theme"),
      badEndingTheme: document.getElementById("bad-ending-theme"),
      backgroundVideoA: document.getElementById("background-video-a"),
      backgroundVideoB: document.getElementById("background-video-b"),
      portraitVideoA: document.getElementById("portrait-video-a"),
      portraitVideoB: document.getElementById("portrait-video-b"),
      characterSlot: document.getElementById("character-slot"),
      characterPanel: document.getElementById("character-panel"),
      endingBanner: document.getElementById("ending-banner"),
      endingEyebrow: document.getElementById("ending-eyebrow"),
      endingTitle: document.getElementById("ending-title"),
      endingNote: document.getElementById("ending-note"),
    };
  }

  function updateStats(dom, state, dwellerRead) {
    dom.urgencyValue.textContent = state.urgency;
    dom.trustValue.textContent = state.trust;
    dom.archiveValue.textContent = state.archive;

    dom.urgencyBar.style.width = `${state.urgency}%`;
    dom.trustBar.style.width = `${state.trust}%`;
    dom.archiveBar.style.width = `${state.archive}%`;
    dom.statusNote.textContent = dwellerRead;
  }

  function renderChoices(container, options) {
    container.innerHTML = "";

    options.forEach((option) => {
      const button = document.createElement("button");
      button.className = "choice";
      button.type = "button";

      const label = document.createElement("span");
      label.className = "choice__label";
      label.textContent = option.label;

      const detail = document.createElement("span");
      detail.className = "choice__detail";
      detail.textContent = option.detail;

      button.appendChild(label);
      button.appendChild(detail);
      button.addEventListener("click", option.onClick);
      container.appendChild(button);
    });
  }

  function renderLogbook(container, lines) {
    container.innerHTML = "";

    lines.forEach((entry) => {
      const item = document.createElement("li");
      item.textContent = entry;
      container.appendChild(item);
    });
  }

  function clearDwellerResponse(dom) {
    if (!dom.responsePanel) {
      return;
    }

    dom.responsePanel.hidden = true;
    dom.responseSignal.textContent = "";
    dom.responseTranslation.textContent = "";
  }

  function renderDwellerResponse(dom, response) {
    if (!dom.responsePanel || !response) {
      return;
    }

    dom.responseSignal.textContent = response.signal || "";
    dom.responseTranslation.textContent = response.translation || "";
    dom.responsePanel.hidden = false;
  }

  function renderSceneFrame(dom, scene, state, dwellerRead) {
    dom.phaseLabel.textContent = scene.phase;
    dom.sceneTag.textContent = scene.tag;
    dom.sceneTitle.textContent = scene.title;
    dom.speakerName.textContent = scene.speaker;
    dom.speakerNote.textContent = scene.speakerNote;
    dom.text.textContent = scene.body;

    updateStats(dom, state, dwellerRead);
  }

  function renderEndingFrame(dom, ending, state, dwellerRead) {
    dom.phaseLabel.textContent = ending.phase;
    dom.sceneTag.textContent = ending.tag;
    dom.sceneTitle.textContent = ending.title;
    dom.speakerName.textContent = ending.speaker;
    dom.speakerNote.textContent = ending.speakerNote;
    dom.text.textContent =
      `${ending.body}\n\nWhy this ending happened:\n${ending.insight}\n\nFinal readout:\nUrgency ${state.urgency}\nTrust ${state.trust}\nArchive Insight ${state.archive}`;

    clearDwellerResponse(dom);
    updateStats(dom, state, dwellerRead);
  }

  return {
    getDomRefs,
    renderChoices,
    renderLogbook,
    clearDwellerResponse,
    renderDwellerResponse,
    renderSceneFrame,
    renderEndingFrame,
  };
})();
