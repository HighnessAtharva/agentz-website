import { Icon } from './ui/Icon'
import { NCARD_ART } from '../data/svg'

const PILLARS = [
  { icon: 'skills', n: '01', hl: 'hl-a', title: 'Skill management', p: 'Package capabilities as reusable skills. Versioned, testable, and shared across every agent your team runs.' },
  { icon: 'teams', n: '02', hl: 'hl-c', title: 'Organizational support', p: 'Roles, teams, and shared context so every function can put agents to work, not just the platform team.' },
  { icon: 'workflows', n: '03', hl: 'hl-b', title: 'Workflow support', p: 'Chain skills into workflows. Trigger on a schedule, an event, or a request. Hand off cleanly between agents.' },
]

export function Pillars() {
  return (
    <section className="feature" id="pillars">
      <div className="wrap">
        <div className="fhead">
          <h2 className="fhead-h">
            A platform for the agents <span className="hl hl-a">your teams already want to build</span>.
          </h2>
          <p className="fhead-p">
            Compose <span className="hl hl-a">skills</span>, wire them into <span className="hl hl-b">workflows</span>, and
            roll them out across your <span className="hl hl-c">organization</span>. Bring any model or framework,
            security stays underneath.
          </p>
        </div>
        <div className="ncards ncards-3">
          {PILLARS.map((p, i) => (
            <article className="ncard" key={p.n}>
              <div className="ncard-top">
                <span className="ncard-ico"><Icon name={p.icon} /></span>
                <span className="ncard-n">{p.n}</span>
              </div>
              <h3><span className={`hl ${p.hl}`}>{p.title}</span></h3>
              <p>{p.p}</p>
              <div className="ncard-art" dangerouslySetInnerHTML={{ __html: NCARD_ART[i] }} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
