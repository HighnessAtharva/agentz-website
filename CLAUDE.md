# AgentZ website — design rules

AgentZ is a Zero Trust Agentic AI Security Platform by AccuKnox. It is a **platform**, never a "framework". This repo is a static site: `index.html`, `styles.css`, `script.js`, and `assets/`.

## Never use these (banned slop patterns)

- **Fake browser / mac window containers.** No window chrome with red/yellow/green "traffic light" dots, no fake URL bars, no `.browser` / `.browser-bar` / `.shot` / `.mcard-shot` frames wrapping a screenshot. If a visual needs a container, use a plain rounded panel with a single hairline border. Nothing that imitates an OS window.
- **Floating glass "notification" chips.** No small translucent pills floating over a hero image captioning what a screenshot shows (`.chip` / `.chips` / `.sky-chip`).
- **Glassmorphism by default.** No decorative `backdrop-filter` blur cards. Rare and purposeful, or not at all.
- **Auto-popup modals.** No "get started" modal that opens on a timer.
- **Gradient text**, **side-stripe accent borders**, and the **big-number hero-metric** template.

## Direction

Bold and typographic. High contrast: off-white base, near-black green-tinted ink, deep-green accent (`--accent`), one committed dark zone. Real contrast over pastel washes. References: neatlogs.com, factors.ai (stark type, minimal chrome). Keep the giant `AgentZ` wordmark footer.

## Copy

No em dashes. Direct, specific, no filler.
