import { Icon } from './ui/Icon'

const DOMAINS = [
  { icon: 'server', h: 'IT and DevOps', p: 'Triage alerts, run remediations, and automate routine ops on a schedule.' },
  { icon: 'secops', h: 'Security operations', p: 'Enrich incidents and run guarded response workflows over real tools.' },
  { icon: 'chart', h: 'Data and reporting', p: 'Pull, summarize, and distribute recurring reports across systems.' },
  { icon: 'headset', h: 'Customer ops', p: 'Resolve tickets and update records with auditable, scoped access.' },
  { icon: 'receipt', h: 'Back office', p: 'Automate finance, HR, and procurement tasks under tight controls.' },
  { icon: 'workflows', h: 'Custom workflows', p: 'Compose your own agents from marketplace building blocks.' },
]

export function Domains() {
  return (
    <section className="feature" id="domains">
      <div className="wrap">
        <div className="fhead">
          <h2 className="fhead-h">
            Point an agent at the <span className="hl hl-b">work you already do</span>.
          </h2>
        </div>
        <div className="dmn-grid">
          {DOMAINS.map((d) => (
            <div className="dmn" key={d.h}>
              <div className="dmn-head">
                <span className="dmn-ico"><Icon name={d.icon} /></span>
                <h3>{d.h}</h3>
              </div>
              <p>{d.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
