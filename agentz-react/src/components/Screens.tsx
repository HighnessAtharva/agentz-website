import { Icon } from './ui/Icon'

const SHOTS = [
  { img: 'workflow', alt: 'Edit a workflow and set a schedule from chat', title: 'Workflows in chat', sub: 'Edit steps and set a schedule in plain language.' },
  { img: 'chat', alt: 'Talk to your agent', title: 'Conversational ops', sub: 'Ask, and the agent builds, edits and runs.' },
  { img: 'span-error', alt: 'Span detail with token breakdown', title: 'Signed traces', sub: 'Read every span, down to the token.' },
  { img: 'network', alt: 'Network egress allowed or blocked at the kernel', title: 'Policy edge', sub: 'Every egress allowed or blocked at the kernel.' },
  { img: 'environment', alt: 'A signed environment', title: 'Environments', sub: 'Identity, packages and tools in one signed object.' },
]

export function Screens() {
  return (
    <section className="screens" id="screens">
      <div className="wrap">
        <div className="vid-head">
          <div>
            <p className="section-eyebrow">Inside the product</p>
            <h2 className="section-h2">The real dashboard, screen by screen.</h2>
          </div>
          <div className="vid-nav">
            <button className="vid-arrow" data-dir="-1" aria-label="Previous"><Icon name="chev" /></button>
            <button className="vid-arrow" data-dir="1" aria-label="Next"><Icon name="chev" /></button>
          </div>
        </div>
        <div className="vid-track" id="screens-track">
          {SHOTS.map((s) => (
            <figure className="screen-card" key={s.img}>
              <span className="screen-shot">
                <img src={`./assets/img/dash/${s.img}.png`} alt={s.alt} />
              </span>
              <figcaption>
                <b>{s.title}</b>
                <span>{s.sub}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
