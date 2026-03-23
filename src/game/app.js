window.DwellerApp = (() => {
  const { initialState, scenes, getEnding } = window.DwellerStory;
  const { createState, resetState, applyEffects, getDwellerRead } = window.DwellerState;
  const {
    getDomRefs,
    renderChoices,
    renderLogbook,
    clearDwellerResponse,
    renderDwellerResponse,
    renderSceneFrame,
    renderEndingFrame,
  } = window.DwellerUI;

  function init() {
    const dom = getDomRefs();
    const state = createState(initialState);
    const media = window.DwellerMedia || null;
    const audio = window.DwellerAudio ? window.DwellerAudio.setupAudio(dom) : null;
    let currentSceneKey = "briefing";

    if (media) {
      media.setup(dom);
    }

    function resolveValue(value) {
      return typeof value === "function" ? value(state) : value;
    }

    function resolveScene(sceneKey) {
      const scene = scenes[sceneKey];

      return {
        phase: resolveValue(scene.phase),
        tag: resolveValue(scene.tag),
        title: resolveValue(scene.title),
        speaker: resolveValue(scene.speaker),
        speakerNote: resolveValue(scene.speakerNote),
        body: resolveValue(scene.body),
        choices: resolveValue(scene.choices),
        backgroundState: resolveValue(scene.backgroundState),
        portraitState: resolveValue(scene.portraitState),
        entryCue: resolveValue(scene.entryCue),
      };
    }

    function buildLogLines(extraLine) {
      const lines = [
        `Dweller read: ${getDwellerRead(state)}`,
        `Readout - urgency ${state.urgency}, trust ${state.trust}, archive insight ${state.archive}.`,
        ...state.history.slice(-4).reverse(),
      ];

      if (extraLine) {
        lines.unshift(extraLine);
      }

      return lines;
    }

    function renderScene(sceneKey, feedback = null) {
      const scene = resolveScene(sceneKey);
      const dwellerRead = getDwellerRead(state);
      currentSceneKey = sceneKey;

      clearDwellerResponse(dom);
      renderSceneFrame(dom, scene, state, dwellerRead);
      renderLogbook(dom.logbook, buildLogLines());
      renderChoices(
        dom.choices,
        scene.choices.map((choice) => ({
          ...choice,
          onClick: () => handleChoice(choice),
        }))
      );

      if (media) {
        media.applySceneMedia(dom, scene, {
          portraitState: feedback?.emotion,
        });
      }

      if (audio) {
        audio.setTheme("main");

        if (feedback?.cue) {
          audio.playCue(feedback.cue);
        }

        if (scene.entryCue) {
          window.setTimeout(() => {
            audio.playCue(scene.entryCue);
          }, feedback?.cue ? 260 : 0);
        }
      }
    }

    function renderChoiceResponse(choice) {
      const activeScene = resolveScene(currentSceneKey);
      const dwellerRead = getDwellerRead(state);

      renderSceneFrame(dom, activeScene, state, dwellerRead);
      renderDwellerResponse(dom, {
        signal: choice.responseSignal,
        translation: choice.responseTranslation,
      });
      renderLogbook(dom.logbook, buildLogLines(`Dweller reply: ${choice.responseTranslation}`));
      renderChoices(dom.choices, [
        {
          label: "Continue",
          detail: "Read the reply and continue the negotiation.",
          onClick: () => advanceFromChoice(choice),
        },
      ]);

      if (media) {
        media.applySceneMedia(dom, activeScene, {
          portraitState: choice.responseState,
        });
      }

      if (audio) {
        audio.playCue(choice.responseCue || choice.responseState);
      }
    }

    function advanceFromChoice(choice) {
      if (choice.next === "ending") {
        renderEnding(choice);
        return;
      }

      renderScene(choice.next);
    }

    function renderEnding(lastChoice = null) {
      const ending = getEnding(state);
      const dwellerRead = getDwellerRead(state);

      renderEndingFrame(dom, ending, state, dwellerRead);
      renderLogbook(
        dom.logbook,
        buildLogLines("Outcome locked. Review the final readout and compare it with the choices you made under pressure.")
      );
      renderChoices(dom.choices, [
        {
          label: "Replay negotiation",
          detail: "Reset every value to zero and try a different approach.",
          onClick: restart,
        },
        {
          label: "Return to main menu",
          detail: "Go back to the start screen.",
          onClick: () => {
            window.location.href = "../";
          },
        },
      ]);

      if (media) {
        media.applyEndingMedia(dom, ending);
      }

      if (audio) {
        audio.setTheme(ending.theme || "main");
        audio.playCue(ending.cue || lastChoice?.responseState);
      }
    }

    function handleChoice(choice) {
      applyEffects(state, choice.effects);
      state.history.push(choice.log);
      renderChoiceResponse(choice);
    }

    function restart() {
      resetState(state, initialState);
      renderScene("briefing", {
        emotion: "neutral",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });

      if (audio) {
        audio.setTheme("main");
      }
    }

    renderScene("briefing", {
      emotion: "neutral",
    });
  }

  return { init };
})();
