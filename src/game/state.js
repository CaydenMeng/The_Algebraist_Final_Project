window.DwellerState = (() => {
  function clamp(value) {
    return Math.max(0, Math.min(100, value));
  }

  function createState(initialState) {
    return {
      urgency: initialState.urgency,
      trust: initialState.trust,
      archive: initialState.archive,
      history: [...initialState.history],
    };
  }

  function resetState(state, initialState) {
    state.urgency = initialState.urgency;
    state.trust = initialState.trust;
    state.archive = initialState.archive;
    state.history = [...initialState.history];
  }

  function applyEffects(state, effects = {}) {
    state.urgency = clamp(state.urgency + (effects.urgency || 0));
    state.trust = clamp(state.trust + (effects.trust || 0));
    state.archive = clamp(state.archive + (effects.archive || 0));
  }

  function getDwellerRead(state) {
    if (state.urgency >= 65 && state.trust <= 10) {
      return "They think you came to take, not to understand.";
    }

    if (state.trust >= 45 && state.archive >= 45 && state.urgency <= 26) {
      return "They think you can be trusted with context, not just data.";
    }

    if (state.archive >= 38) {
      return "You are beginning to read the archive the way they do.";
    }

    if (state.trust >= 24) {
      return "They are cautious, but they still consider you worth answering.";
    }

    if (state.urgency >= 40) {
      return "Human panic is bending the conversation out of shape.";
    }

    return "First contact is fragile. They are still judging whether you want understanding or leverage.";
  }

  return {
    createState,
    resetState,
    applyEffects,
    getDwellerRead,
  };
})();
