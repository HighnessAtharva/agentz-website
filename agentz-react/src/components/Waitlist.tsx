import { useEffect } from 'react'
import { Icon } from './ui/Icon'

declare global {
  interface Window {
    Tally?: { loadEmbeds: () => void }
  }
}

export function Waitlist() {
  // The Tally embed script hydrates iframes with data-tally-src on load. When it
  // arrives after React mounts, nudge it to process our embed.
  useEffect(() => {
    if (window.Tally) window.Tally.loadEmbeds()
  }, [])

  return (
    <section className="demo" id="waitlist">
      <div className="wrap demo-grid">
        <div className="demo-copy">
          <h2>
            Join the <span className="ital">waitlist.</span>
          </h2>
          <p>
            AgentZ is in preview. Tell us about your team and we'll get you in as we open access, build, run and govern,
            end to end.
          </p>
          <ul className="demo-points">
            <li><Icon name="guardrails" className="ico-sm" /> Early access as spots open</li>
            <li><Icon name="audit" className="ico-sm" /> First look at the policy edge and signed traces</li>
            <li><Icon name="skills" className="ico-sm" /> Bring your own model and framework, no migration</li>
          </ul>
        </div>
        <div className="wl-embed">
          <iframe
            data-tally-src="https://tally.so/embed/RGlZ1l?alignLeft=1&hideTitle=1&dynamicHeight=1"
            loading="lazy"
            width="100%"
            height={360}
            frameBorder={0}
            marginHeight={0}
            marginWidth={0}
            title="Join the AgentZ waitlist"
          ></iframe>
        </div>
      </div>
    </section>
  )
}
