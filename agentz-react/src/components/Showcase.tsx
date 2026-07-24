export function Showcase() {
  return (
    <section className="showcase">
      <div className="wrap">
        <div className="vw vw-hero">
          <video
            src="./assets/video/hero-workflow-graph.mp4"
            poster="./assets/video/hero-workflow-graph.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="A workflow running live in AgentZ, steps moving through running and succeeded"
          />
        </div>
      </div>
    </section>
  )
}
