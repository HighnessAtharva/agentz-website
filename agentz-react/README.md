# AgentZ — React (static site)

React + TypeScript + Vite port of the AgentZ landing page. Static build; emits a
self-contained `dist/` that can be served from any static host.

## Run

```bash
npm install
npm run dev       # dev server with HMR
npm run build     # tsc + vite build → dist/
npm run preview   # serve the production build locally
npm run lint      # oxlint
```

## Stack

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Framer Motion** — org-chart permission-flow animation, spotlight card

## Structure

```
src/
  App.tsx                  section composition + <IconSprite/> + <ThemeToggle/>
  main.tsx                 entry; imports styles/globals.css
  styles/globals.css       Tailwind + the full ported design system + dark theme + org-anim helpers
  data/svg.ts              verbatim icon sprite + pillar illustration SVGs (injected as HTML)
  hooks/
    useSiteEffects.ts      faithful port of the original script.js (reveal, clips@0.75x,
                           stepper, progress bar, carousels, lightbox)
    useTheme.ts            light/dark toggle, persisted to localStorage + data-theme
  components/
    ui/Icon.tsx            <Icon name="skills"/> + <IconSprite/>
    ui/SpotlightCard.tsx   Aceternity "Card Hover Effect" (cursor spotlight), brand-restrained
    Hero, Showcase, PlatformArch, Stepper, Videos, Screens, OrgChart,
    SecureByDefault, Domains, Pillars, Control, Statement, Runtime,
    Integrations, CtaBanner, FAQ, Waitlist, Footer, ThemeToggle
```

## Notes / parity with the static site

- **Design tokens are unchanged** from the original `styles.css`; they live in
  `globals.css`. The **dark theme** (`[data-theme="dark"]`) maps onorca.dev's neutral
  near-black ramp onto AgentZ's blue accent (see `../marketing/design-system-onorca.md`).
  Toggle with the top-right button, or share a link with `?theme=dark`.
- **Video playback is slowed to 0.75×** in `useSiteEffects.ts`, matching the change made
  to the static site.
- The new **`0-agentz-chat.mp4`** clip is the first card in "See AgentZ in Action".
- Fonts load via `<link>` in `index.html` (General Sans, Instrument Serif, JetBrains
  Mono, and Space Grotesk added as an onorca-inspired display option).
- The **Tally** waitlist embed script is loaded in `index.html`; the modal CTAs keep the
  `data-tally-*` attributes.
- Assets are served from `public/assets/` (copied from the original `assets/`).

## Org-chart animation (OrgChart.tsx)

Nodes fade/slide in with a per-level Framer Motion stagger. An SVG overlay is measured
from the live node geometry (re-measured on resize) and draws faint connectors from the
Admin node down to each role, with pulse dots that travel downstream on a loop —
"permissions flowing from admin". All motion is disabled under
`prefers-reduced-motion`.
