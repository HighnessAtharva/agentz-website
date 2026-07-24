import { Icon } from './ui/Icon'

const ITEMS = [
  { n: '01', q: 'What is AgentZ?', a: 'A Zero Trust platform to build, run and govern agents. Skills, workflows, context and guardrails in one control plane, secure by design.' },
  { n: '02', q: 'How is this different from an agent framework?', a: 'Frameworks help you write an agent. AgentZ runs it in production with policy at the edge, scoped access, and a signed trace for every step.' },
  { n: '03', q: 'How hard is it to get started?', a: 'Describe the job in a sentence. AgentZ writes the skill and wires the steps. Bring any model or framework, no migration.' },
  { n: '04', q: 'Can non-platform teams use it?', a: 'Yes. Roles, teams and shared context let security, ops and back office put agents to work, not just the platform team.' },
]

export function FAQ() {
  return (
    <section className="faq" id="faq">
      <div className="wrap faq-grid">
        <div className="faq-intro">
          <p className="section-eyebrow">FAQ</p>
          <h2 className="section-h2">Common questions.</h2>
          <p className="faq-lead">
            How AgentZ drops into the way your team already ships agents. Here are the answers.
          </p>
        </div>
        <div className="faq-list">
          {ITEMS.map((item, i) => (
            <details className="faq-item" key={item.n} open={i === 0}>
              <summary>
                <span className="faq-n">{item.n}</span>
                <span className="faq-q">{item.q}</span>
                <span className="faq-plus"><Icon name="plus" /></span>
              </summary>
              <div className="faq-a">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
      <div className="wrap">
        <div className="faq-help">
          <div>
            <b>Still need help?</b>
            <p>We're happy to walk your team through it and look at your stack.</p>
          </div>
          <a className="btn btn-line" href="https://agentz.accuknox.com/" target="_blank" rel="noopener">
            See the platform
          </a>
        </div>
      </div>
    </section>
  )
}
