import { Icon } from './ui/Icon'
import { SpotlightCard } from './ui/SpotlightCard'

const ARCH = [
  { ico: 't-a', icon: 'skills', h: 'Skills', p: 'Reusable, versioned building blocks.' },
  { ico: 't-b', icon: 'workflows', h: 'Workflows', p: 'Chain steps, schedule, hand off work.' },
  { ico: 't-c', icon: 'context', h: 'Context', p: 'Shared memory, files, and knowledge.' },
  { ico: 't-d', icon: 'teams', h: 'Teams', p: 'Roles, ownership, shared scope.' },
  { ico: 't-a', icon: 'guardrails', h: 'Guardrails', p: 'Secure by default. No standing access.' },
  { ico: 't-b', icon: 'audit', h: 'Audit', p: 'Every step recorded and replayable.' },
]

export function PlatformArch() {
  return (
    <section className="arch" id="platform">
      <div className="wrap">
        <h2 className="section-h2 arch-h">One control plane for every agent, model and team.</h2>
        <div className="arch-frame">
          <span className="arch-label">AgentZ</span>
          <div className="arch-grid">
            {ARCH.map((c, i) => (
              <SpotlightCard className="arch-card" key={`${c.h}-${i}`}>
                <span className="arch-ico"><Icon name={c.icon} /></span>
                <h3>{c.h}</h3>
                <p>{c.p}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
        <div className="arch-rails">
          <div className="arch-rail">
            <span className="rail-label">Your tools &amp; data</span>
            <div className="rail-items">
              <span className="rail-chip"><Icon name="database" />Databases</span>
              <span className="rail-chip"><Icon name="api" />SaaS APIs</span>
              <span className="rail-chip"><Icon name="mcp" />MCP tools</span>
              <span className="rail-chip"><Icon name="files" />Files</span>
            </div>
          </div>
          <div className="arch-rail">
            <span className="rail-label">Any model, any provider</span>
            <div className="rail-items">
              <span className="rail-chip"><img className="logo-img logo-img--mono" src="./assets/img/logos/openai.svg" alt="" />OpenAI</span>
              <span className="rail-chip"><img className="logo-img logo-img--mono" src="./assets/img/logos/anthropic.svg" alt="" />Anthropic</span>
              <span className="rail-chip"><img className="logo-img" src="./assets/img/logos/gemini.svg" alt="" />Gemini</span>
              <span className="rail-chip"><img className="logo-img" src="./assets/img/logos/opensource.svg" alt="" />Open source</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
