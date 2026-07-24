import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Icon } from './ui/Icon'

type Variant = 'top' | 'left' | 'right'

type Feature = {
  icon: string
  h: string
  p: string
  vs: string
  variant: Variant
}

const FEATURES: Feature[] = [
  {
    icon: 'model',
    h: 'Model agnostic',
    p: 'Bring any model on your own key or your subscription. Swap OpenAI, Anthropic, Gemini or open source without touching your agents.',
    vs: 'The alternatives lock you to one vendor, or make you bring and wire your own.',
    variant: 'top',
  },
  {
    icon: 'server',
    h: 'Deploy anywhere',
    p: 'On-prem, air-gapped, or SaaS. The same platform runs on your infrastructure, not just someone else’s cloud.',
    vs: 'Not SaaS-only, and no box for you to provision and babysit.',
    variant: 'left',
  },
  {
    icon: 'shield',
    h: 'Zero Trust, default deny',
    p: 'Secure by design, out of the box. Every agent action gates through policy, down to the tool call and the host.',
    vs: 'Not vendor-defined and opaque, not bolt-on, not a rough-UX afterthought.',
    variant: 'right',
  },
  {
    icon: 'bolt',
    h: 'Three steps to first agent',
    p: 'Describe the job, scope its access, run. No assembly required, and no wiring providers, security and MCP by hand.',
    vs: 'No dead ends, and no heavy setup before you fight a sandbox.',
    variant: 'top',
  },
]

/** A wireframe isometric cube. When active it turns blue and pushes its assigned face outward. */
function IsoBox({ active, variant, onClick }: { active: boolean; variant: Variant; onClick: () => void }) {
  const spring = { type: 'spring' as const, stiffness: 240, damping: 22 }
  const top = active && variant === 'top'
  const left = active && variant === 'left'
  const right = active && variant === 'right'
  return (
    <motion.svg
      className={`iso${active ? ' is-active' : ''}`}
      viewBox="0 0 200 160"
      onClick={onClick}
      animate={{ scale: active ? 1.04 : 1 }}
      transition={spring}
      role="presentation"
    >
      {/* right face */}
      <motion.g animate={{ x: right ? 20 : 0, y: right ? 10 : 0 }} transition={spring}>
        <polygon className="iso-face iso-right" points="178,46 100,88 100,154 178,112" />
        <line className="iso-dash" x1="139" y1="67" x2="139" y2="133" />
      </motion.g>
      {/* left face */}
      <motion.g animate={{ x: left ? -20 : 0, y: left ? 10 : 0 }} transition={spring}>
        <polygon className="iso-face iso-left" points="22,46 100,88 100,154 22,112" />
        <line className="iso-dash" x1="61" y1="67" x2="61" y2="133" />
      </motion.g>
      {/* top face + nested inset */}
      <motion.g animate={{ y: top ? -18 : 0 }} transition={spring}>
        <polygon className="iso-face iso-top" points="100,4 178,46 100,88 22,46" />
        <polygon className="iso-inset" points="100,26 139,46 100,66 61,46" />
      </motion.g>
    </motion.svg>
  )
}

export function WhyAgentZ() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setActive((a) => (a + 1) % FEATURES.length), 5000)
    return () => clearInterval(id)
  }, [reduce, active])

  return (
    <section className="why" id="why">
      <div className="wrap">
        <div className="why-head">
          <h2 className="why-title">AgentZ, for winners</h2>
          <p className="why-sub">
            How AgentZ compares to hosted assistants, self-hosted runners, and hardened OSS sandboxes.
          </p>
        </div>

        <div className="why-cols">
          <div className="why-list">
            {FEATURES.map((f, i) => {
              const on = active === i
              return (
                <button
                  type="button"
                  key={f.h}
                  className={`why-feat${on ? ' is-active' : ''}`}
                  onClick={() => setActive(i)}
                  aria-expanded={on}
                >
                  <span className="why-feat-ico"><Icon name={f.icon} /></span>
                  <div className="why-feat-body">
                    <h3 className="why-feat-h">{f.h}</h3>
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.div
                          key="d"
                          className="why-feat-detail"
                          initial={reduce ? false : { height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={reduce ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.32, ease: 'easeInOut' }}
                        >
                          <p className="why-feat-p">{f.p}</p>
                          <p className="why-feat-vs">{f.vs}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="iso-stack" aria-hidden="true">
            {FEATURES.map((f, i) => (
              <IsoBox key={f.h} active={active === i} variant={f.variant} onClick={() => setActive(i)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
