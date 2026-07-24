import { LogoGrid } from './LogoGrid'

export function Integrations() {
  return (
    <section className="integ" id="integrations">
      <div className="wrap center">
        <h2 className="section-h2 integ-h">Works with the stack you already run.</h2>
        <p className="integ-sub">
          Connect tools, data and models. Bring your own agent framework. AgentZ governs them all through one policy
          edge.
        </p>
      </div>
      <div className="wrap">
        <LogoGrid />
      </div>
    </section>
  )
}
