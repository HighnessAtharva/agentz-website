import { Icon } from './ui/Icon'

const COLS = [
  { h: 'Platform', links: [['Capabilities', '#platform'], ['Build · Run · Govern', '#brg'], ['See it in action', '#demos'], ['Governance', '#governance']] },
  { h: 'Company', links: [['AccuKnox', 'https://accuknox.com'], ['View on GitHub', 'https://github.com/accuknox/agentZ'], ['Integrations', '#integrations']] },
  { h: 'Get started', links: [['Go to the platform', 'https://agentz.accuknox.com/'], ['Book a demo', 'https://accuknox.com/demo']] },
]

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap foot-cols">
        <div className="foot-lead">
          <div className="foot-brand"><img className="foot-mark" src="./assets/img/agentz-logo.svg" alt="" /> AgentZ</div>
          <p>Zero Trust Agentic AI. Build, run, and govern production agents, secure by design.</p>
          <a className="foot-by" href="https://accuknox.com" target="_blank" rel="noopener">
            <span>A product from</span>
            <img src="./assets/img/accuknox-logo-dark.png" alt="AccuKnox" />
          </a>
        </div>
        {COLS.map((c) => (
          <nav className="foot-col" key={c.h}>
            <span className="foot-col-h">{c.h}</span>
            {c.links.map(([label, href]) => (
              <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener">
                {label}
              </a>
            ))}
          </nav>
        ))}
      </div>
      <div className="wrap foot-bar">
        <p className="foot-copy">© 2026 AccuKnox. All rights reserved.</p>
        <div className="foot-social">
          <a href="https://github.com/accuknox/agentZ" aria-label="GitHub" target="_blank" rel="noopener"><Icon name="github" /></a>
          <a href="https://accuknox.com" aria-label="Website" target="_blank" rel="noopener"><Icon name="api" /></a>
          <a href="https://accuknox.com/demo" aria-label="Demo" target="_blank" rel="noopener"><Icon name="play" /></a>
        </div>
      </div>
      <div className="foot-wordmark-wrap">
        <div className="foot-wordmark">AgentZ</div>
      </div>
    </footer>
  )
}
