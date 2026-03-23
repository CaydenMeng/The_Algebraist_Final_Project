> Current playable build note: the live prototype now uses only two endings, **Good Ending** and **Bad Ending**. Older partial-ending references below are archival design notes.

# Media Cue Plan

This file maps the future audio and video assets to concrete states in the game so they can be dropped in later without redesigning the system.

## Background Video Plan

| Asset Role | Planned File | When It Plays | Notes |
| --- | --- | --- | --- |
| Base background | `gas-giant.mp4` | Acts 1-3 as default environment | Replaces the current background image as the normal world state |
| Good ending background | `archive.mp4` | Partial Access and Temporal Humility endings | Best used as a slow luminous archive-space reveal |
| Bad ending background | `distorted.mp4` | Catastrophic Urgency and Archive Denied endings | Should feel unstable, broken, or compressed |

## Portrait Video Plan

| Dweller State | Planned Portrait Asset | Trigger |
| --- | --- | --- |
| Neutral | `portrait-neutral.mp4` | Default / pre-choice idle state |
| Attentive | `portrait-attentive.mp4` | Trust-building choices or serious listening |
| Reflective | `portrait-reflective.mp4` | Archive / context / patience choices |
| Amused | `portrait-amused.mp4` | Humour recognition or ironic compromise |
| Disturbed | `portrait-disturbed.mp4` | Forced compression, mistranslation, impatience |
| Withdrawn | `portrait-withdrawn.mp4` | Ending denial or near-termination of contact |

## Music Plan

| Audio Role | Planned File | Usage |
| --- | --- | --- |
| Base main theme | `main-theme.*` | Default loop during the core game |
| Good ending theme | `good-ending-theme.*` | Fade in during Partial Access or full Temporal Humility ending |
| Bad ending theme | `bad-ending-theme.*` | Fade in during Catastrophic Urgency or Archive Denied |

## Dweller One-Shot Sound Plan

| Cue | Planned File | Trigger |
| --- | --- | --- |
| Withdrawn sound | `alien-withdrawn.*` | Withdrawal lines, denied access, fading response |
| Disturbed sound | `alien-disturbed.*` | Compression, impatience, mistranslation, force |
| Amused sound | `alien-amused.*` | Humour recognised but not fully mastered |
| Reflective sound | `alien-reflective.*` | Archive / context / patience responses |
| Urgent sound | `alien-urgent.*` | Human pressure spikes, Archimandrite messages, rising urgency |

## Recommended Trigger Logic

- Background videos should switch only on large state transitions, not after every choice.
- Portrait videos should change after each Dweller emotional response.
- One-shot Dweller sounds should play after the portrait state change, not before it.
- The base soundtrack should duck slightly when a Dweller one-shot sound plays.
- Good or bad ending themes should fade in only after the final Dweller exchange or ending title appears.

## Current Placeholder Mapping

Until the full media pack is ready:

- current portrait image = neutral Dweller placeholder
- current background image = base environment placeholder
- current ambient audio = temporary main theme stand-in

## Future Implementation Priority

1. Replace the base background image with `gas-giant.mp4`.
2. Replace the static portrait with the neutral portrait MP4.
3. Add emotional portrait state switching from scene response metadata.
4. Add Dweller one-shot audio cues tied to emotional states.
5. Add ending-specific background swaps and ending music fades.

