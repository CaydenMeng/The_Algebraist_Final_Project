const text = document.getElementById("text");
const choices = document.getElementById("choices");

// helper to render buttons
function setChoices(options) {
  choices.innerHTML = "";
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.label;
    btn.onclick = opt.onClick;
    choices.appendChild(btn);
    choices.appendChild(document.createElement("br"));
  });
}

let log = [];
let score = 0;

function start() {
  text.innerText =
    "Context: After the Archimandrite’s campaign destabilised the region, you are tasked to open a channel with the Dwellers to request access to the ancient List.\n\nStage 1: Choose your initial signal.";
  setChoices([
    { label: "Send prime numbers (human universality attempt)", onClick: signalPrime },
    { label: "Send hydrogen-line reference (physics anchor)", onClick: signalHydrogen },
    { label: "Send geometric pattern (shape-based meaning)", onClick: signalGeometry },
  ]);
}

function signalPrime() {
  log.push("Signal: Prime numbers");
  text.innerText =
    "Dweller Transmission: 'We notice patterned repetition. Is this a joke? Or a mating ritual?'\n\nThey do not treat number-patterns as automatically meaningful.\n\nStage 2: The Dwellers request your lifespan scale.";
  setChoices([
    { label: "Assume 80-year human lifespan", onClick: lifeShort },
    { label: "Assume 10,000-year civilisation scale", onClick: lifeMedium },
    { label: "Assume million-year Dweller scale", onClick: lifeLong },
  ]);
}

function signalHydrogen() {
  log.push("Signal: Hydrogen-line reference");
  score += 1;
  text.innerText =
    "Dweller Transmission: 'Energy reference detected. We recognise the physical anchor. Meaning remains uncertain.'\n\nStage 2: The Dwellers request your lifespan scale.";
  setChoices([
    { label: "Assume 80-year human lifespan", onClick: lifeShort },
    { label: "Assume 10,000-year civilisation scale", onClick: lifeMedium },
    { label: "Assume million-year Dweller scale", onClick: lifeLong },
  ]);
}

function signalGeometry() {
  log.push("Signal: Geometric pattern");
  text.innerText =
    "Dweller Transmission: 'We perceive curvature and rhythm. Is this weather data? Orbit data?'\n\nStage 2: The Dwellers request your lifespan scale.";
  setChoices([
    { label: "Assume 80-year human lifespan", onClick: lifeShort },
    { label: "Assume 10,000-year civilisation scale", onClick: lifeMedium },
    { label: "Assume million-year Dweller scale", onClick: lifeLong },
  ]);
}

function lifeShort() {
  log.push("Lifespan: 80 years");
  text.innerText =
    "Dweller Transmission: 'Urgency noted. Your time-frame is… tiny.'\n\nStage 3: Choose how you frame your request for the List.";
  setChoices([
    { label: "Ask directly for 'The List' (human urgency)", onClick: askDirect },
    { label: "Offer a trade: knowledge for stability", onClick: askTrade },
    { label: "Request a slow dialogue over many cycles", onClick: askSlow },
  ]);
}

function lifeMedium() {
  log.push("Lifespan: 10,000 years");
  score += 1;
  text.innerText =
    "Dweller Transmission: 'Your scale is closer to a conversation, not a blink.'\n\nStage 3: Choose how you frame your request for the List.";
  setChoices([
    { label: "Ask directly for 'The List' (human urgency)", onClick: askDirect },
    { label: "Offer a trade: knowledge for stability", onClick: askTrade },
    { label: "Request a slow dialogue over many cycles", onClick: askSlow },
  ]);
}

function lifeLong() {
  log.push("Lifespan: million-year scale");
  score += 2;
  text.innerText =
    "Dweller Transmission: 'Acceptable. Now you are speaking in units that resemble thought.'\n\nStage 3: Choose how you frame your request for the List.";
  setChoices([
    { label: "Ask directly for 'The List' (human urgency)", onClick: askDirect },
    { label: "Offer a trade: knowledge for stability", onClick: askTrade },
    { label: "Request a slow dialogue over many cycles", onClick: askSlow },
  ]);
}

function askDirect() {
  log.push("Request: Direct");
  text.innerText =
    "Dweller Transmission: 'You want a weapon disguised as knowledge.'\n\nOutcome: The Dwellers disengage.";
  end();
}

function askTrade() {
  log.push("Request: Trade");
  score += 1;
  text.innerText =
    "Dweller Transmission: 'Exchange logic recognised. Motives remain unclear.'\n\nOutcome: Partial engagement. They offer a fragment, not the List.";
  end();
}

function askSlow() {
  log.push("Request: Slow dialogue");
  score += 2;
  text.innerText =
    "Dweller Transmission: 'Now you attempt understanding, not extraction.'\n\nOutcome: Dialogue begins. Access to the List remains uncertain, but communication stabilises.";
  end();
}

function end() {
  const verdict =
    score >= 4
      ? "Stable channel (best ending)"
      : score >= 2
      ? "Partial channel (mixed ending)"
      : "Channel collapse (failed ending)";

  text.innerText += `\n\n=== Debrief ===\n${verdict}\n\nYour choices:\n- ${log.join("\n- ")}`;

  setChoices([
    { label: "Restart simulation", onClick: () => { log = []; score = 0; start(); } }
  ]);
}

start();