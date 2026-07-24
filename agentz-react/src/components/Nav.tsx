import { ThemeToggle } from './ThemeToggle'

/** Minimal onorca-style sticky top nav. */
export function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <a className="nav-brand" href="#top">
          <span className="nav-mark">Z</span>
          AgentZ
        </a>
        <nav className="nav-links">
          <a href="#platform">Platform</a>
          <a href="#brg">Build · Run · Govern</a>
          <a href="#governance">Governance</a>
          <a href="#faq">FAQ</a>
        </nav>
        <span className="nav-spacer" />
        <ThemeToggle />
        <a className="nav-ghost" href="https://accuknox.com/demo" target="_blank" rel="noopener">
          See the platform
        </a>
        <a
          className="nav-cta"
          href="#waitlist"
          data-tally-open="RGlZ1l"
          data-tally-layout="modal"
          data-tally-width="540"
          data-tally-overlay="1"
          data-tally-emoji-text="👋"
          data-tally-emoji-animation="wave"
        >
          Join the waitlist
        </a>
      </div>
    </header>
  )
}
