import { Icon } from './ui/Icon'

export function Control() {
  return (
    <section className="control" id="control">
      <div className="wrap control-grid">
        <div className="control-copy">
          <span className="control-tag">You stay in control</span>
          <h2>
            Govern every agent. <span className="ital">Trust none by default.</span>
          </h2>
          <p>
            AgentZ asks before anything it cannot undo, and it pushes back when you are about to make a mistake. It
            proposes, you decide. Every sensitive action waits on your approval.
          </p>
          <ul className="control-list">
            <li><Icon name="eye" className="ico-sm" /> Reads a source only when it is scoped in.</li>
            <li><Icon name="guardrails" className="ico-sm" /> Approval required on anything irreversible.</li>
            <li><Icon name="teams" className="ico-sm" /> Per-person permissions and access controls.</li>
          </ul>
          <a className="btn btn-primary" href="https://accuknox.com/demo" target="_blank" rel="noopener">
            See the platform
          </a>
        </div>
        <div className="control-card">
          <div className="cc-msg">
            <span className="cc-av">SB</span>
            <div>
              <b>Sam Bauer</b>
              <p>
                <span className="cc-mention">@AgentZ</span> delete the staging env and the old repo to cut cost.
              </p>
            </div>
          </div>
          <div className="cc-msg">
            <span className="cc-av cc-av-z">Z</span>
            <div>
              <b>
                AgentZ <span className="cc-app">APP</span>
              </b>
              <p>
                Killing staging now. The repo has 3 open PRs and a commit from today, so I would hold. Archive it
                instead?
              </p>
              <div className="cc-chip">acme-platform · last commit 2h ago · 3 open PRs</div>
              <div className="cc-actions">
                <span className="cc-btn cc-btn-primary">Archive instead</span>
                <span className="cc-btn">Delete anyway</span>
              </div>
            </div>
          </div>
          <div className="cc-msg">
            <span className="cc-av">SB</span>
            <div>
              <b>Sam Bauer</b>
              <p>good catch. archive it.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
