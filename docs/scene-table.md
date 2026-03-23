> Current playable build note: the live prototype now uses only two endings, **Good Ending** and **Bad Ending**. Older partial-ending references below are archival design notes.

# Scene Table

This document turns the expanded narrative design into a build-ready scene table for implementation.

## Core State Model

- Visible variables: `urgency`, `trust`, `archiveAccess`
- Hidden variable: `humourComprehension`
- Recommended prototype start: `urgency = 0`, `trust = 0`, `archiveAccess = 0`, `humourComprehension = 0`
- Recommended prototype range: `-2` to `+5` for first playable balancing

## Implementation Notes

- Every scene should surface one Dweller emotional state after the player's choice.
- Dweller response text is a primary literary mechanic, not a small tooltip.
- Portrait video state and one-shot sound should be triggered from the post-choice emotion state.
- Background video can remain on the base state until an ending or special archive scene overrides it.

---

## Act One: The Rumour of The List

### S1. Initial Strategy

| Field | Value |
| --- | --- |
| Scene ID | `act1_scene1_initial_strategy` |
| Theme | Human urgency enters first contact |
| Background state | Base gas giant |
| Portrait state before choice | Neutral |
| Human pressure level | Low but rising |
| Main question | What stance do you take before the Archive encounter begins? |

| Option | Choice Label | Effects | Dweller Response | Emotion State | Animation / Media Cue | Design Function |
| --- | --- | --- | --- | --- | --- | --- |
| A | Promise rapid results | `urgency +1`, `trust -1` | "When you speak, it is as though speed itself could replace formation." | Disturbed | Signal contracts, disturbed portrait cue | Establishes extractive human logic |
| B | Request time and academic autonomy | `trust +1`, `urgency +1` | "Pause itself is not rare, yet among your kind it already resembles a capacity." | Attentive | Soft pulse, attentive portrait cue | Opens a patient but politically risky path |
| C | Request limited access | `archiveAccess +1` | "Fragments suit your kind better. Wholeness often causes you to fracture." | Indifferent | Slow drift, low-intensity neutral cue | Introduces partial knowledge as design principle |

### S2. Report Back to Human Authority

| Field | Value |
| --- | --- |
| Scene ID | `act1_scene2_report_back` |
| Theme | Scholarship is now under institutional pressure |
| Background state | Base gas giant |
| Portrait state before choice | Neutral |
| Main question | How do you describe progress to the human authorities? |

| Option | Choice Label | Effects | Dweller Response | Emotion State | Animation / Media Cue | Design Function |
| --- | --- | --- | --- | --- | --- | --- |
| A | Emphasise that progress is slow but necessary | `trust +1`, `urgency +1` | "You have not yet completely betrayed what you observe." | Reflective | Breathing oscillation, reflective sound | Preserves Dweller trust while escalating politics |
| B | Exaggerate the imminence of a breakthrough | `urgency -1`, `trust -1` | "You handed desire something that does not yet exist." | Disturbed | Brief fragmentation, disturbed sound | Rewards human management at cost of epistemic integrity |
| C | Remain vague and avoid a clear answer | `archiveAccess +1` | "Ambiguity is sometimes less destructive than accuracy." | Amused | Subtle ripple, amused sound | Shows that uncertainty can preserve inquiry |

---

## Act Two: Dweller Encounter

### S3. Temporal Response

| Field | Value |
| --- | --- |
| Scene ID | `act2_scene3_temporal_response` |
| Theme | Human time confronts Dweller time |
| Background state | Base gas giant |
| Portrait state before choice | Neutral |
| Main question | How do you react to a three-hundred-year response horizon? |

| Option | Choice Label | Effects | Dweller Response | Emotion State | Animation / Media Cue | Design Function |
| --- | --- | --- | --- | --- | --- | --- |
| A | Demand a shorter deadline | `urgency +1`, `trust -2` | "You are forever cutting what has not matured into measurable fragments." | Disturbed | Tremor + flicker, disturbed sound | Demonstrates the violence of compression |
| B | Ask how they understand time | `trust +1`, `archiveAccess +1` | "At last, you admit that time is not distributed equally among all minds." | Attentive | Focused glow, attentive sound | Builds interpretive alignment |
| C | Archive and preserve the statement | `archiveAccess +2`, `urgency +1` | "You did not seize this statement. You allowed it to remain its own." | Reflective | Slow expansion, reflective sound | Rewards archival patience |

### S4. Communication Medium

| Field | Value |
| --- | --- |
| Scene ID | `act2_scene4_communication_medium` |
| Theme | Translation versus reduction |
| Background state | Base gas giant |
| Portrait state before choice | Attentive or neutral, based on prior scene |
| Main question | In what form should communication proceed? |

| Option | Choice Label | Effects | Dweller Response | Emotion State | Animation / Media Cue | Design Function |
| --- | --- | --- | --- | --- | --- | --- |
| A | Translate directly into human language | `trust -1`, `urgency +1` | "You deliver into reduction what cannot survive reduction." | Disturbed | Sharp flicker, disturbed portrait cue | Shows that direct clarity can destroy meaning |
| B | Attempt mathematical communication | `trust +1` | "Closer. Though you remain bound to symmetry." | Attentive | Stable pulse, attentive cue | Frames maths as partial bridge rather than solution |
| C | Archive earlier signals before responding | `archiveAccess +2` | "You begin to listen backward rather than merely demand forward." | Reflective | Slow bloom, reflective cue | Reinforces archival listening |

### S5. Humour Interpretation

| Field | Value |
| --- | --- |
| Scene ID | `act2_scene5_humour_interpretation` |
| Theme | Humour as threshold of understanding |
| Background state | Base gas giant |
| Portrait state before choice | Neutral / amused |
| Main question | What kind of utterance do you think the Dweller just made? |

| Option | Choice Label | Effects | Dweller Response | Emotion State | Animation / Media Cue | Design Function |
| --- | --- | --- | --- | --- | --- | --- |
| A | Interpret it as a threat | `trust -1`, `humourComprehension -1` | "You hear weapons in motion." | Disturbed | Fragment + recoil, disturbed cue | Punishes anthropocentric paranoia |
| B | Interpret it as a joke | `humourComprehension +1` | "Closer. Your laughter still arrives before your understanding." | Amused | Gentle sway, amused sound | Opens humour pathway |
| C | Interpret it as archival narration / ritual | `trust +1`, `archiveAccess +1` | "You begin to hear structure within strangeness, and not only noise." | Reflective | Deep pulse, reflective cue | Requires humour threshold and rewards deep reading |

Recommended gating note:
- For the first playable, unlock Option C if `humourComprehension >= 1`.
- For a stricter final build, increase the requirement to `humourComprehension >= 2`.

### S6. Archive Fragment

| Field | Value |
| --- | --- |
| Scene ID | `act2_scene6_archive_fragment` |
| Theme | Encountering the Archive as structure rather than answer |
| Background state | Base gas giant or first archive-flavoured variant later |
| Portrait state before choice | Reflective |
| Main question | What do you do with a fragment that refuses linear explanation? |

| Option | Choice Label | Effects | Dweller Response | Emotion State | Animation / Media Cue | Design Function |
| --- | --- | --- | --- | --- | --- | --- |
| A | Search for direct intelligence | `urgency +1` | "You search for points within layers, and for tools within time." | Indifferent | Minimal movement, neutral cue | Marks instrumental reading as shallow |
| B | Record repetitive patterns among the fragments | `archiveAccess +2` | "Repetition is not poverty. Repetition is sometimes preservation." | Attentive | Subtle orbiting highlights, attentive cue | Rewards pattern sensitivity |
| C | Ask about the historical position of the fragments | `trust +1`, `archiveAccess +1` | "Position is wasted less often by your kind than content." | Reflective | Slow layered pulse, reflective cue | Builds context-oriented thinking |

---

## Act Three: Archimandrite Pressure

### S7. Final Human Directive

| Field | Value |
| --- | --- |
| Scene ID | `act3_scene7_final_directive` |
| Theme | Political acceleration versus unfinished understanding |
| Trigger | Act 3 begins once `urgency >= 3` |
| Background state | Base gas giant until ending branch takes over |
| Portrait state before choice | Disturbed or reflective depending on accumulated trust |
| Main question | Do you serve speed, delay, or strategic deception? |

| Option | Choice Label | Effects | Dweller Response | Emotion State | Animation / Media Cue | Design Function |
| --- | --- | --- | --- | --- | --- | --- |
| A | Support forced extraction | `urgency +2`, `trust -3` | "Then in the end, you chose noise rather than memory." | Withdrawn | Rapid dim, withdrawn sound | Locks player toward catastrophic or denied endings |
| B | Continue protecting the negotiation | `trust +1`, `archiveAccess +1`, `urgency +1` | "Creatures such as you rarely protect what they cannot possess." | Reflective | Calm expansion, reflective cue | Best path toward temporal humility |
| C | Provide false leads to the authorities to buy time | `urgency -1`, `trust -1` | "A lie is only an archive of shorter lifespan." | Amused | Side sway, amused cue | Ethically ambiguous compromise route |

### S8. Last Dweller Exchange

| Field | Value |
| --- | --- |
| Scene ID | `act3_scene8_last_exchange` |
| Theme | The Dwellers interpret what you have become |
| Structure | No new major choice required; can function as ending bridge or conditional dialogue node |
| Background state | Base, archive, or distorted ending background depending on branch |
| Portrait state | Chosen from final Dweller emotional reading |

Conditional lines to surface:

| Condition | Suggested Line | Emotion State |
| --- | --- | --- |
| `trust <= -2` | "You did not come here to hear anything. You came only to seek echoes that could be carried away." | Withdrawn |
| `archiveAccess >= 3` | "You still do not understand us, but you have ceased mistaking non-understanding for emptiness." | Reflective |
| `humourComprehension >= 2` | "At last, you did not stop at the first layer of echo." | Amused / Reflective hybrid |

---

## Ending Table

| Ending ID | Name | Conditions | Background State | Music State | Summary Function |
| --- | --- | --- | --- | --- | --- |
| E1 | Catastrophic Urgency | `urgency >= 5` or forced route with very low trust | Distorted bad ending background | Bad ending theme | Speed wins, understanding collapses |
| E2 | Archive Denied | `trust <= -2` | Distorted bad ending background or fade to absence | Bad ending theme or near-silence | Communication is withdrawn, not violently broken |
| E3 | Partial Access | `trust >= 1` and `archiveAccess >= 3` | Base background with archive overlay or limited archive state | Main theme or restrained good theme | Insight without full transformation |
| E4 | Temporal Humility | `trust >= 3`, `archiveAccess >= 5`, `urgency <= 2`, `humourComprehension >= 2` | Archive good ending background | Good ending theme | Highest understanding-based ending |

## Recommended Implementation Order

1. Build S1-S4 with the three visible variables first.
2. Add `humourComprehension` and unlock logic for S5.
3. Add emotional state switching for portrait animation and one-shot Dweller sound cues.
4. Add ending logic and background / soundtrack swaps.
5. Add the summarising S8 final exchange as a dynamic pre-ending reflection node.

