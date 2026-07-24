import { Icon } from './ui/Icon'

export function Statement() {
  return (
    <section className="statement">
      <div className="arc arc-l" aria-hidden="true">
        <span className="arc-ico"><Icon name="claude" /></span>
        <span className="arc-ico"><Icon name="openai" /></span>
        <span className="arc-ico"><Icon name="gemini" /></span>
        <span className="arc-ico"><Icon name="codex" /></span>
        <span className="arc-ico"><Icon name="antigravity" /></span>
      </div>
      <div className="arc arc-r" aria-hidden="true">
        <span className="arc-ico"><Icon name="shield" /></span>
        <span className="arc-ico"><Icon name="lock" /></span>
        <span className="arc-ico"><Icon name="key" /></span>
        <span className="arc-ico"><Icon name="eye" /></span>
        <span className="arc-ico"><Icon name="fingerprint" /></span>
      </div>
      <div className="wrap statement-inner">
        <p className="statement-h">
          <span className="sh-line">Powered by Agentic AI.</span>
          <span className="sh-line ital">Protected by Zero Trust.</span>
        </p>
        <p className="statement-sub">One tool for your organizational AI needs.</p>
      </div>
    </section>
  )
}
