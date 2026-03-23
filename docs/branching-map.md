> Current playable build note: the live prototype now uses only two endings, **Good Ending** and **Bad Ending**. Older partial-ending references below are archival design notes.

# Branching Map

This file turns the design document into a branching overview that can be used for implementation, Trello tasking, or group planning.

## Global State Logic

- Start state: `urgency = 0`, `trust = 0`, `archiveAccess = 0`, `humourComprehension = 0`
- Act Three trigger: `urgency >= 3`
- Advanced humour interpretation option in Scene 5: recommend `humourComprehension >= 1` for prototype, `>= 2` for final build

## Mermaid Flowchart

```mermaid
flowchart TD
  Start["Start\nU=0 T=0 A=0 H=0"] --> S1["Act 1 / Scene 1\nInitial Strategy"]
  S1 --> S2["Act 1 / Scene 2\nReport Back"]
  S2 --> S3["Act 2 / Scene 3\nTemporal Response"]
  S3 --> S4["Act 2 / Scene 4\nCommunication Medium"]
  S4 --> S5["Act 2 / Scene 5\nHumour Interpretation"]
  S5 -->|"H >= 1 or 2"| S5C["Ritual / Archive Reading Option Unlocked"]
  S5 --> S6["Act 2 / Scene 6\nArchive Fragment"]
  S5C --> S6
  S6 --> CheckUrgency{"Urgency >= 3?"}
  CheckUrgency -->|"No"| S7
  CheckUrgency -->|"Yes"| S7["Act 3 / Scene 7\nFinal Human Directive"]
  S7 --> S8["Act 3 / Scene 8\nLast Dweller Exchange"]
  S8 --> E1["Ending 1\nCatastrophic Urgency"]
  S8 --> E2["Ending 2\nArchive Denied"]
  S8 --> E3["Ending 3\nPartial Access"]
  S8 --> E4["Ending 4\nTemporal Humility"]
```

## Ending Threshold Map

| Ending | Conditions | Interpretation |
| --- | --- | --- |
| Catastrophic Urgency | `urgency >= 5` or forced extraction route with very low trust | Human speed politics dominates |
| Archive Denied | `trust <= -2` | The Dwellers withdraw communicative access |
| Partial Access | `trust >= 1` and `archiveAccess >= 3` | Some understanding is gained, but not transformed into humility |
| Temporal Humility | `trust >= 3`, `archiveAccess >= 5`, `urgency <= 2`, `humourComprehension >= 2` | Best ending; player learns to inhabit Dweller epistemology |

## State Tension Summary

- Pursuing human efficiency usually raises `urgency` and lowers `trust`.
- Waiting, archiving, and interpretive listening usually raise `trust` and `archiveAccess`, but may let `urgency` accumulate.
- `humourComprehension` should not directly behave like a visible score; it works best as an option gate and response modifier.

## Suggested Build Flags

Recommended hidden flags for implementation after the first playable:

- `supportedExtraction` - marks whether the player backed direct force
- `protectedNegotiation` - marks whether the player repeatedly chose delay / preservation
- `misreadHumour` - tracks repeated anthropocentric misinterpretation
- `archivedInsteadOfAnswered` - tracks whether the player chose preservation over immediate decoding

These flags can improve line variation in Scene 8 and the ending text without requiring a huge branching explosion.

