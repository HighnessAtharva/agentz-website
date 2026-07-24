const STEPS = [
  {
    n: '01 / 03',
    h: 'Build',
    p: 'Describe the job in a sentence. AgentZ writes the skill and wires every step.',
    src: 'build-create-agent',
    label: 'Creating an agent in AgentZ: sandbox, skills, persistent memory and model provider',
  },
  {
    n: '02 / 03',
    h: 'Run',
    p: 'Chat, API, CLI, or a schedule. Any framework, any model, no redeploy.',
    src: 'run-chat-workflows',
    label: 'Running workflows from chat in AgentZ, with the file explorer and run history open',
  },
  {
    n: '03 / 03',
    h: 'Govern',
    p: 'Resolved at the edge, checked at the kernel, stamped to a signed trace.',
    src: 'govern-sandbox-permissions',
    label: 'Scoping a sandbox in AgentZ down to per-tool permissions and allowed hosts',
  },
]

export function Stepper() {
  return (
    <section className="stepper" id="brg">
      <div className="stepper-sticky">
        <div className="wrap steps-wrap">
          <div className="steps">
            {STEPS.map((s, i) => (
              <article className={i === 0 ? 'step is-on' : 'step'} data-step={i} key={s.h}>
                <div className="step-copy">
                  <span className="step-kicker">{s.n}</span>
                  <h2>{s.h}</h2>
                  <p>{s.p}</p>
                </div>
                <div className="step-media">
                  <div className="vw vw-dark vw-step">
                    <video
                      src={`./assets/video/${s.src}.mp4`}
                      poster={`./assets/video/${s.src}.jpg`}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label={s.label}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="step-dots">
            {STEPS.map((s, i) => (
              <button className={i === 0 ? 'step-dot is-on' : 'step-dot'} data-go={i} key={s.h}>
                <span>{String(i + 1).padStart(2, '0')}</span> {s.h}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
