import { Icon } from './ui/Icon'

const CARDS = [
  { src: '0-agentz-chat', poster: null, label: 'Chat interface in AgentZ: build and run agents in plain language', title: 'Chat with your agents', sub: 'Ask, build, and run workflows in plain language.' },
  { src: 'card-mcp-connect', poster: 'card-mcp-connect', label: 'Connecting an MCP server in AgentZ', title: 'Connect an MCP server', sub: 'Pick a provider, authorize, watch it go Ready.' },
  { src: 'card-schedule-cron', poster: 'card-schedule-cron', label: 'Editing a cron schedule in AgentZ', title: 'Schedule an agent', sub: 'Set a cron, edit the schedule in place, no redeploy.' },
  { src: 'card-signed-trace', poster: 'card-signed-trace', label: 'Reading a signed trace in AgentZ: span tree, per-call durations and token counts', title: 'Read a signed trace', sub: 'Inspect every span, down to the token.' },
  { src: 'card-mcp-profiling', poster: 'card-mcp-profiling', label: 'Profiling MCP tool calls in AgentZ: a call graph with per-call durations', title: 'Profile MCP calls', sub: "See every tool call's latency in one graph." },
]

export function Videos() {
  return (
    <section className="videos" id="demos">
      <div className="wrap">
        <div className="vid-head">
          <h2 className="section-h2 vid-title">
            See AgentZ in Action <span className="vid-title-sub">Real workflows from teams</span>
          </h2>
          <div className="vid-nav">
            <button className="vid-arrow" data-dir="-1" aria-label="Previous"><Icon name="chev" /></button>
            <button className="vid-arrow" data-dir="1" aria-label="Next"><Icon name="chev" /></button>
          </div>
        </div>
        <div className="vid-track" id="vid-track">
          {CARDS.map((c) => (
            <a className="video-card" href="#waitlist" key={c.src}>
              <div className="vw vw-thumb">
                <video
                  src={`./assets/video/${c.src}.mp4`}
                  poster={c.poster ? `./assets/video/${c.poster}.jpg` : undefined}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={c.label}
                />
              </div>
              <b>{c.title}</b>
              <p>{c.sub}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
