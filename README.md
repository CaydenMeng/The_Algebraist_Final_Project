# The Algebraist Final Project

## Overview

This project is a static web-based interactive prototype inspired by Iain M. Banks' *The Algebraist*. The player takes the role of a human scholar attempting to negotiate with the Dwellers while political urgency threatens to distort the exchange.

The current prototype focuses on three core ideas from the project proposal:

- urgency versus deep time
- trust as a condition of contact
- archival understanding as something different from simple data extraction

## Project Structure

- `index.html` - page structure and script loading order
- `src/script.js` - small browser bootstrap file
- `src/data/story.js` - current scene writing, branching data, and ending text
- `src/game/app.js` - game flow and scene transitions
- `src/game/state.js` - metric updates and state helpers
- `src/game/ui.js` - DOM rendering for scenes, choices, metrics, and logbook
- `src/game/media.js` - background video, portrait video, ending banner, and transition logic
- `src/game/audio.js` - soundtrack themes and Dweller cue sound logic
- `src/style.css` - stylesheet entry file
- `src/styles/base.css` - shared variables, typography, and page-level defaults
- `src/styles/layout.css` - grid layout and responsive structure
- `src/styles/components.css` - cards, buttons, panels, and interface components
- `assets/` - media files such as background images, MP4 loops, portraits, or audio

## Design Docs

These files translate the larger concept into build-ready references for the team:

- `docs/scene-table.md` - scene-by-scene implementation table
- `docs/branching-map.md` - branching logic, thresholds, and ending flow
- `docs/media-cue-plan.md` - future mapping for music, Dweller state sounds, portrait videos, and background videos

## How To Run

Because this is a static HTML, CSS, and JavaScript project, there is no build step.

### Option 1

Open `index.html` directly in a browser.

### Option 2

Run a small local server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Suggested Team Split

- one person can work in `src/data/story.js` on writing, branching, and endings
- one person can work in `src/styles/` on interface design and media presentation
- one person can use the `docs/` files to convert the design into tasks, thresholds, cue sheets, and implementation notes
- shared logic changes usually belong in `src/game/app.js`, `src/game/state.js`, or `src/game/ui.js`

## Recommended Media Placement

Suggested organisation inside `assets/`:

- `assets/backgrounds/` for page background images
- `assets/characters/` for Dweller portraits or character loops
- `assets/video/` for cinematic or ambient MP4 backgrounds
- `assets/audio/` for music or sound effects

Path reminder:

- inside `index.html`, use paths like `./assets/video/scene-loop.mp4`
- inside `src/styles/*.css`, use paths like `../../assets/backgrounds/archive-bg.jpg`

## Next Direction

The current playable is still a simplified implementation. The new docs define the richer target version with eight scenes, a hidden humour variable, clearer emotional states, and more differentiated endings. The next major step is to align the live game logic with those docs and then plug in the full media pack.


