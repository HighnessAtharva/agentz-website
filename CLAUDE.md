# AgentZ website — design rules

AgentZ is a Zero Trust Agentic AI Security Platform by AccuKnox. It is a **platform**, never a "framework". This repo is a static site: `index.html`, `styles.css`, `script.js`, and `assets/`.

## Never use these (banned slop patterns)

- **Fake browser / mac window containers.** No window chrome with red/yellow/green "traffic light" dots, no fake URL bars, no `.browser` / `.browser-bar` / `.shot` / `.mcard-shot` frames wrapping a screenshot. If a visual needs a container, use a plain rounded panel with a single hairline border. Nothing that imitates an OS window.
- **Floating glass "notification" chips.** No small translucent pills floating over a hero image captioning what a screenshot shows (`.chip` / `.chips` / `.sky-chip`).
- **Glassmorphism by default.** No decorative `backdrop-filter` blur cards. Rare and purposeful, or not at all.
- **Auto-popup modals.** No "get started" modal that opens on a timer.
- **Gradient text**, **side-stripe accent borders**, and the **big-number hero-metric** template.

## Direction

Bold and typographic. Blue system: deep navy `#000025` (brand, dark zones, primary buttons) with an electric blue `#2f4bd6` for accents, icons, and highlighter marks. Off-white base, near-black navy ink. No green anywhere. One committed dark navy zone (the Build/Run/Govern stepper). References: neatlogs.com, factors.ai (stark type, minimal chrome). Keep the giant `AgentZ` wordmark footer, fully visible with the copyright left-aligned. `AgentZ` is the first big thing in the hero.

## Icons and placeholders

Icons come from the inline SVG sprite at the top of `index.html` (`<use href="#i-...">`), styled with `currentColor`. Add new icons there, never re-import a separate icon set. Image placeholders use the `.ph` component (dashed border, mono label) so slots are obviously swappable.

## Copy

No em dashes. Direct, specific, no filler.
