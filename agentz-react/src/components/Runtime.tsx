import { Icon } from './ui/Icon'

export function Runtime() {
  return (
    <section className="runtime" id="f-edge">
      <div className="wrap runtime-grid">
        <div className="runtime-copy">
          <p className="section-eyebrow">Runtime intelligence</p>
          <h2>
            Understand <span className="ital">everything</span> your agent does.
          </h2>
          <p>
            Runtime telemetry logs every egress by domain, port and protocol. Each connection is allowed or blocked at
            the kernel and recorded, so nothing leaves without a record.
          </p>
          <a className="link-arrow" href="https://accuknox.com/demo" target="_blank" rel="noopener">
            See the platform <Icon name="arrow" className="ico-sm" />
          </a>
        </div>
        <div className="runtime-media">
          <div className="vw vw-wide">
            <video
              src="./assets/video/runtime-traces-telemetry.mp4"
              poster="./assets/video/runtime-traces-telemetry.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Reading a signed trace in AgentZ: span tree, durations, token counts and network events"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
