import type { ReactNode } from 'react'
import { Icon } from './ui/Icon'
import { BentoGrid, BentoGridItem } from './ui/aceternity/BentoGrid'

/* ───────────────────────────────────────────────────────────
   Custom, cohesive bento illustrations. Shared language:
   rounded tiles, hairline borders, electric-blue accents,
   quiet motion. All theme-aware, all reduced-motion safe.
   ─────────────────────────────────────────────────────────── */

/** Skills chained into a workflow — a node pipeline with a scheduled branch. */
function CapWorkflow() {
  const nodes = [
    { icon: 'skills', label: 'Skill' },
    { icon: 'workflows', label: 'Workflow' },
    { icon: 'play', label: 'Run' },
  ]
  return (
    <div className="capx capx-flow">
      {nodes.map((n, i) => (
        <div className="capx-flow-cell" key={n.label}>
          {i > 0 && <span className="capx-wire"><span className="capx-spark" /></span>}
          <div className="capx-node">
            <span className="capx-node-ico"><Icon name={n.icon} /></span>
            <span className="capx-node-label">{n.label}</span>
          </div>
        </div>
      ))}
      <div className="capx-branch">
        <span className="capx-branch-wire" />
        <div className="capx-chip"><Icon name="context" className="ico-sm" />schedule</div>
      </div>
    </div>
  )
}

/** Any model — providers ring a central AgentZ hub. */
function CapModels() {
  const nodes = [
    { file: 'openai', mono: true, cls: 'p1' },
    { file: 'anthropic', mono: true, cls: 'p2' },
    { file: 'gemini', mono: false, cls: 'p3' },
    { file: 'meta', dot: true, cls: 'p4' },
  ]
  return (
    <div className="capx capx-hub">
      <span className="capx-orbit" />
      {nodes.map((n) => (
        <span className={`capx-prov ${n.cls}`} key={n.file}>
          {n.dot ? (
            <span className="capx-oss" />
          ) : (
            <img className={n.mono ? 'logo-img logo-img--mono' : 'logo-img'} src={`./assets/img/logos/${n.file}.svg`} alt="" />
          )}
        </span>
      ))}
      <span className="capx-core">
        <img src="./assets/img/agentz-logo.svg" alt="AgentZ" />
      </span>
    </div>
  )
}

/** Scoped access — a vault key granting per-tool scopes. */
function CapScoped() {
  const scopes = [
    { label: 'read · files', on: true },
    { label: 'call · api', on: true },
    { label: 'write · vault', on: false },
  ]
  return (
    <div className="capx capx-scope">
      <span className="capx-lock"><Icon name="key" /></span>
      <div className="capx-scope-rows">
        {scopes.map((s) => (
          <div className={`capx-scope-row${s.on ? ' is-on' : ''}`} key={s.label}>
            <span className="capx-scope-label">{s.label}</span>
            <span className="capx-scope-dot" />
          </div>
        ))}
      </div>
    </div>
  )
}

/** Signed audit — a span waterfall stamped with a signature seal. */
function CapAudit() {
  const spans = [
    { off: 0, w: 66, t: 'skill.invoke' },
    { off: 14, w: 40, t: 'tool.call' },
    { off: 30, w: 54, t: 'model.respond' },
    { off: 52, w: 30, t: 'trace.sign' },
  ]
  return (
    <div className="capx capx-audit">
      <div className="capx-waterfall">
        {spans.map((s, i) => (
          <div className="capx-span" key={i}>
            <span className="capx-span-t">{s.t}</span>
            <span className="capx-span-track">
              <span className="capx-span-bar" style={{ marginLeft: `${s.off}%`, width: `${s.w}%` }} />
            </span>
          </div>
        ))}
      </div>
      <span className="capx-seal">
        <span className="capx-seal-badge"><Icon name="shield" /></span>
        Signed · sha256
      </span>
    </div>
  )
}

type Tile = { icon: string; h: string; p: string; span: string; art: ReactNode }

const TILES: Tile[] = [
  {
    icon: 'skills',
    h: 'Skills and workflows',
    p: 'Package capabilities as versioned skills, chain them into workflows, schedule them, and hand off cleanly between agents.',
    span: 'md:col-span-2',
    art: <CapWorkflow />,
  },
  {
    icon: 'model',
    h: 'Any model',
    p: 'Model agnostic. Swap providers without touching your agents, on your own key or your subscription.',
    span: '',
    art: <CapModels />,
  },
  {
    icon: 'key',
    h: 'Scoped access',
    p: 'Permissions set per tool call, not per integration. Secrets stay in the vault, the agent never sees the key.',
    span: '',
    art: <CapScoped />,
  },
  {
    icon: 'audit',
    h: 'Signed audit, out of the box',
    p: 'A signed, replayable trace for every run, down to the token. SOC and compliance reviews stop being a project.',
    span: 'md:col-span-2',
    art: <CapAudit />,
  },
]

export function Capabilities() {
  return (
    <section className="feature" id="platform">
      <div className="wrap">
        <div className="fhead center">
          <h2 className="fhead-h">Everything an agent needs to reach production.</h2>
          <p className="fhead-p">
            You focus on skills and workflows. AgentZ handles access, isolation, memory, and audit, the parts that
            usually keep an agent stuck at the demo.
          </p>
        </div>
        <BentoGrid className="md:auto-rows-[21rem]">
          {TILES.map((t) => (
            <BentoGridItem
              key={t.h}
              className={`cap-tile ${t.span}`}
              header={t.art}
              title={t.h}
              description={t.p}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}
