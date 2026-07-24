import { ExpandableCards, type ExpandableItem } from './ui/aceternity/ExpandableCards'

const ITEMS: ExpandableItem[] = [
  { title: 'Chat with your agents', description: 'Ask, build, and run workflows in plain language. Files, artifacts, and full run history stay with the agent.', src: './assets/video/0-agentz-chat.mp4', label: 'Chat interface in AgentZ' },
  { title: 'Connect an MCP server', description: 'Pick a provider, authorize once, and watch it go Ready. MCP servers work out of the box.', src: './assets/video/card-mcp-connect.mp4', poster: './assets/video/card-mcp-connect.jpg', label: 'Connecting an MCP server in AgentZ' },
  { title: 'Read a signed trace', description: 'Inspect every span, every model and tool call, down to the token, on a signed and replayable record.', src: './assets/video/card-signed-trace.mp4', poster: './assets/video/card-signed-trace.jpg', label: 'Reading a signed trace in AgentZ' },
  { title: 'Runtime you can see', description: 'Every egress by domain, port and protocol, allowed or blocked at the kernel and recorded. Nothing leaves without a record.', src: './assets/video/runtime-traces-telemetry.mp4', poster: './assets/video/runtime-traces-telemetry.jpg', label: 'Runtime telemetry in AgentZ' },
  { title: 'Schedule an agent', description: 'Set a cron, edit the schedule, timeout and retention in place. No redeploy.', src: './assets/video/card-schedule-cron.mp4', poster: './assets/video/card-schedule-cron.jpg', label: 'Editing a cron schedule in AgentZ' },
  { title: 'Policy at the edge', description: 'Every network call allowed or blocked at the kernel, in one view.', src: './assets/img/dash/network.png', label: 'Network egress allowed or blocked at the kernel' },
]

export function SeeInAction() {
  return (
    <section className="feature alt" id="demos">
      <div className="wrap">
        <div className="fhead center">
          <h2 className="fhead-h">See it in action.</h2>
          <p className="fhead-p">Real workflows from real teams. Tap any card to expand it.</p>
        </div>
        <ExpandableCards items={ITEMS} />
      </div>
    </section>
  )
}
