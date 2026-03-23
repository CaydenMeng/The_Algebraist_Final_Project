window.DwellerStory = (() => {
  const initialState = {
    urgency: 0,
    trust: 0,
    archive: 0,
    history: [],
  };

  const scenes = {
    briefing: {
      phase: "Opening",
      tag: "Briefing",
      title: "A Chance To Reach The List",
      speaker: "Command Briefing",
      speakerNote: "You are the envoy sent to talk before soldiers are sent to take.",
      body:
        "Intelligence believes a Dweller archive near a gas giant contains records tied to The List. Your translator can turn Dweller speech into rough human meaning, but it cannot teach you their humour, rituals, or sense of time.\n\nYour goal is simple to say and hard to do: earn enough trust to reach the records before human command decides to force the issue.\n\nHow do you open the conversation?",
      backgroundState: "base",
      portraitState: "neutral",
      choices: [
        {
          label: "Push for access now",
          detail: "Lead with the emergency and ask for the records immediately.",
          log: "You opened with urgency and treated the archive like something to seize.",
          effects: { urgency: 18, trust: -12, archive: 0 },
          responseState: "disturbed",
          responseSignal: ":::keth/vel--hurry?//unripe:::",
          responseTranslation: "You ask for the ending before the question is even alive.",
          next: "contact",
        },
        {
          label: "Ask how to speak properly",
          detail: "Admit that you know their words better than their behaviour.",
          log: "You opened with restraint and signalled that you needed to learn, not just extract.",
          effects: { urgency: 4, trust: 10, archive: 8 },
          responseState: "attentive",
          responseSignal: "o/hold...hold...meaning blooms slowly/o",
          responseTranslation: "At least one of you knows that translation is not understanding.",
          next: "contact",
        },
        {
          label: "Offer a formal archive greeting",
          detail: "Use a researched Dweller greeting and name the archive as memory, not property.",
          log: "You began with ritual respect instead of political pressure.",
          effects: { urgency: 2, trust: 8, archive: 10 },
          responseState: "neutral",
          responseSignal: "~entry-mark accepted // human remembers old forms~",
          responseTranslation: "You have done some homework. That lowers the temperature.",
          next: "contact",
        },
      ],
    },

    contact: {
      phase: "Contact",
      tag: "First Contact",
      title: "The Dweller Tests You",
      speaker: "Dweller",
      speakerNote: "Its words arrive clearly. Its intent does not.",
      body:
        "The Dweller answers with a joke about short-lived species who confuse panic with importance. The translator renders every word. The problem is that you still do not know whether it is mocking you, warning you, or inviting you further in.\n\nThen it asks: \"Why should memory obey your alarm?\"\n\nHow do you respond?",
      backgroundState: "base",
      portraitState: "neutral",
      choices: [
        {
          label: "Repeat the danger",
          detail: "Double down on the threat and insist that delay is unacceptable.",
          log: "You treated urgency as proof that the Dwellers should cooperate immediately.",
          effects: { urgency: 14, trust: -10, archive: -2 },
          responseState: "disturbed",
          responseSignal: "{break|break|break} unfinished question detected",
          responseTranslation: "You speak as if panic should outrank meaning.",
          next: "archive",
        },
        {
          label: "Ask what memory needs",
          detail: "Shift from the emergency to the conditions of understanding.",
          log: "You stopped trying to win the exchange quickly and started trying to understand the rules of it.",
          effects: { urgency: 4, trust: 10, archive: 8 },
          responseState: "attentive",
          responseSignal: "::orbit-length? memory-length? now you listen::",
          responseTranslation: "Better. You ask what the archive requires, not only what you require.",
          next: "archive",
        },
        {
          label: "Admit the mismatch",
          detail: "Tell the Dweller you can translate the words, but not the behaviour yet.",
          log: "You named the real problem: not language failure, but cultural misreading.",
          effects: { urgency: 3, trust: 14, archive: 6 },
          responseState: "amused",
          responseSignal: "s/s/spiral amusement registered",
          responseTranslation: "Honesty is rarer in first contact than vocabulary.",
          next: "archive",
        },
      ],
    },

    archive: {
      phase: "Archive",
      tag: "Access Test",
      title: "The Archive Does Not Open For Demand",
      speaker: "Dweller",
      speakerNote: "The records exist. The question is whether you deserve the doorway.",
      body:
        "The Dweller confirms that records connected to The List exist, but warns that no record can be separated from the centuries that make it meaningful. Human command wants coordinates, names, and shortcuts. The Dweller wants to know what kind of mind is asking.\n\nWhat do you ask for?",
      backgroundState: "base",
      portraitState: "reflective",
      choices: [
        {
          label: "Ask for the record itself",
          detail: "Push for direct access to the material linked to The List.",
          log: "You went for the prize instead of the context that makes it legible.",
          effects: { urgency: 18, trust: -15, archive: -4 },
          responseState: "disturbed",
          responseSignal: "extract/extract/error: shell without sea",
          responseTranslation: "You want the answer without the world that keeps it true.",
          next: "pressure",
        },
        {
          label: "Ask for the history around it",
          detail: "Request the older records that explain why the List matters.",
          log: "You treated the archive like a system of memory instead of a loot chest.",
          effects: { urgency: 4, trust: 10, archive: 16 },
          responseState: "reflective",
          responseSignal: "door opens only with its corridors",
          responseTranslation: "You approach knowledge as a place, not a prize.",
          next: "pressure",
        },
        {
          label: "Ask what humans always miss",
          detail: "Invite the Dweller to explain the mistake humans usually make here.",
          log: "You prioritised correction over possession and gave the Dweller room to teach.",
          effects: { urgency: 6, trust: 14, archive: 12 },
          responseState: "amused",
          responseSignal: "laughter = filing system // incomplete human decoding",
          responseTranslation: "Your kind usually mistakes speed for competence and answers for ownership.",
          next: "pressure",
        },
      ],
    },

    pressure: {
      phase: "Pressure",
      tag: "Final Choice",
      title: "Command Wants To Break The Door",
      speaker: "Command / Dweller",
      speakerNote: "Now the archive, the Dweller, and human command are all waiting on you.",
      body: (state) => {
        const trustLine =
          state.trust >= 38
            ? "The Dweller has not withdrawn. It is waiting to see whether you protect the conversation or sell it out."
            : "The Dweller is already losing patience with human behaviour. One wrong move may end the channel outright.";

        return (
          "A secure message flashes across your console: \"Enough. If they won't open the archive, we take it.\"\n\n" +
          "The Dweller then says: \"You are about to decide whether you came here to learn, or merely to carry orders.\"\n\n" +
          trustLine
        );
      },
      backgroundState: "base",
      portraitState: "attentive",
      entryCue: "urgent",
      choices: [
        {
          label: "Back command",
          detail: "Use the human deadline as leverage and demand compliance now.",
          log: "You let political pressure define the encounter at the worst possible moment.",
          effects: { urgency: 22, trust: -20, archive: -2 },
          responseState: "withdrawn",
          responseSignal: "noise over archive // channel cooling",
          responseTranslation: "Then memory matters less to you than obedience.",
          next: "ending",
        },
        {
          label: "Protect the exchange",
          detail: "Reject the forced option and keep the negotiation patient.",
          log: "You chose understanding over command pressure and protected the conversation.",
          effects: { urgency: 8, trust: 12, archive: 10 },
          responseState: "reflective",
          responseSignal: "stillness accepted // translation deepens",
          responseTranslation: "Rare. You defend what you do not yet control.",
          next: "ending",
        },
        {
          label: "Translate the danger honestly",
          detail: "Explain the human threat without turning it into an ultimatum.",
          log: "You converted urgency into context instead of weaponising it.",
          effects: { urgency: 6, trust: 10, archive: 12 },
          responseState: "amused",
          responseSignal: "alarm folded into history // acceptable",
          responseTranslation: "You are still hurried, but no longer entirely shallow.",
          next: "ending",
        },
      ],
    },
  };

  function getEnding(state) {
    if (state.trust >= 40 && state.archive >= 40 && state.urgency <= 30) {
      return {
        title: "Archive Access Granted",
        phase: "Ending",
        tag: "Good Ending",
        speaker: "Dweller Archive",
        speakerNote: "The archive opens because you proved you wanted understanding, not plunder.",
        body:
          "The Dwellers do not hand you The List like a weapon or a prize. Instead, they allow you into the records around it: the histories, echoes, and connections that make it meaningful. You leave with access, context, and a fragile alliance that human command did not think possible.\n\nYou still do not fully understand the Dwellers. But you finally understand why their civilisation cannot be bullied into human tempo without destroying the very knowledge you came for.",
        insight: "You reached the good ending by lowering panic, respecting Dweller behaviour, and treating the archive as memory instead of loot.",
        backgroundState: "good",
        theme: "good",
        cue: "reflective",
        banner: {
          tone: "good",
          eyebrow: "Good Ending",
          title: "Congratulations, you obtained the good ending.",
          note: "The archive opens because you earned trust before command destroyed the conversation.",
        },
      };
    }

    return {
      title: "Archive Lost",
      phase: "Ending",
      tag: "Bad Ending",
      speaker: "Dweller Silence",
      speakerNote: "The signal remains, but the relationship is gone.",
      body:
        "The Dwellers withdraw. Whether human command storms the archive or not no longer matters in the way they hoped, because the meaning of the records has already been lost. At best, humans seize fragments. At worst, they provoke a disaster and call it action.\n\nYou fail not because the translator was weak, but because you never bridged the gap between understanding a language and understanding the civilisation that speaks it.",
      insight: "You reached the bad ending by letting pressure, impatience, or extraction outrun trust and understanding.",
      backgroundState: "bad",
      theme: "bad",
      cue: "withdrawn",
      banner: {
        tone: "bad",
        eyebrow: "Bad Ending",
        title: "Unfortunately, you obtained the bad ending.",
        note: "The archive closes because panic and extraction overran understanding.",
      },
    };
  }

  return {
    initialState,
    scenes,
    getEnding,
  };
})();
