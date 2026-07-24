import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Icon } from './ui/Icon'

const ROLES = [
  {
    name: 'Security',
    dot: 'd-a',
    perm: 'run · read · quarantine',
    users: [{ av: 'AN', name: 'Ana' }, { av: 'BE', name: 'Ben' }],
  },
  {
    name: 'DevOps',
    dot: 'd-b',
    perm: 'deploy · rollback',
    users: [{ av: 'CA', name: 'Cara' }, { av: 'DV', name: 'Dev', req: true }],
  },
  {
    name: 'Data',
    dot: 'd-c',
    perm: 'query · export',
    users: [{ av: 'EV', name: 'Eve' }],
  },
]

type Line = { d: string; delay: number }

export function OrgChart() {
  const reduce = useReducedMotion()
  const treeRef = useRef<HTMLDivElement>(null)
  const adminRef = useRef<HTMLDivElement>(null)
  const roleRefs = useRef<Array<HTMLDivElement | null>>([])
  const userRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const [lines, setLines] = useState<Line[]>([])
  const [box, setBox] = useState({ w: 0, h: 0 })

  const measure = useCallback(() => {
    const tree = treeRef.current
    const admin = adminRef.current
    if (!tree || !admin) return
    const base = tree.getBoundingClientRect()
    setBox({ w: base.width, h: base.height })

    // center-x, top and bottom edges relative to the tree box
    const geo = (el: HTMLElement) => {
      const r = el.getBoundingClientRect()
      return { x: r.left - base.left + r.width / 2, top: r.top - base.top, bottom: r.bottom - base.top }
    }
    // rounded right-angle elbow: down, across, down — the pulse rides this exact path
    const rr = 8
    const elbow = (x1: number, y1: number, x2: number, y2: number) => {
      if (Math.abs(x2 - x1) < 2) return `M ${x1} ${y1} L ${x2} ${y2}`
      const midY = (y1 + y2) / 2
      const s = x2 > x1 ? 1 : -1
      return `M ${x1} ${y1} L ${x1} ${midY - rr} Q ${x1} ${midY} ${x1 + s * rr} ${midY} L ${x2 - s * rr} ${midY} Q ${x2} ${midY} ${x2} ${midY + rr} L ${x2} ${y2}`
    }

    const a = geo(admin)
    const next: Line[] = []
    ROLES.forEach((role, i) => {
      const el = roleRefs.current[i]
      if (!el) return
      const r = geo(el)
      next.push({ d: elbow(a.x, a.bottom, r.x, r.top), delay: i * 0.4 })
      role.users.forEach((_, j) => {
        const uel = userRefs.current[`${i}-${j}`]
        if (!uel) return
        const u = geo(uel)
        next.push({ d: elbow(r.x, r.bottom, u.x, u.top), delay: 1 + i * 0.3 + j * 0.3 })
      })
    })
    setLines(next)
  }, [])

  useLayoutEffect(() => {
    measure()
  }, [measure])

  useEffect(() => {
    const onResize = () => measure()
    window.addEventListener('resize', onResize)
    // re-measure after fonts/layout settle
    const t = window.setTimeout(measure, 300)
    return () => {
      window.removeEventListener('resize', onResize)
      window.clearTimeout(t)
    }
  }, [measure])

  const nodeReveal = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-40px' },
          transition: { duration: 0.5, delay },
        }

  return (
    <section className="org" id="governance">
      <div className="wrap">
        <div className="org-head">
          <div>
            <h2 className="section-h2 org-h">
              Govern every agent. <span className="ital">Trust none by default</span>.
            </h2>
          </div>
          <p className="org-lead">
            Admins set roles and provision for the team. People request the exact access they need. Fine-grained RBAC
            gates every agent action, and a signed trace records all of it.
          </p>
        </div>

        <div className="org-canvas">
          <div className="tree" ref={treeRef}>
            {/* single connector system: elbows Admin → roles → users, with pulses riding the same paths */}
            {lines.length > 0 && (
              <svg className="tree-flow" viewBox={`0 0 ${box.w} ${box.h}`} preserveAspectRatio="none">
                {lines.map((ln, i) => (
                  <path key={`l${i}`} className="flow-line" d={ln.d} />
                ))}
                {!reduce &&
                  lines.map((ln, i) => (
                    <motion.path
                      key={`p${i}`}
                      d={ln.d}
                      className="flow-pulse"
                      fill="none"
                      initial={{ pathLength: 0.06, pathOffset: 0, opacity: 0 }}
                      animate={{ pathLength: 0.06, pathOffset: [0, 0.94], opacity: [0, 1, 1, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 3.0, delay: ln.delay, ease: 'easeInOut' }}
                    />
                  ))}
              </svg>
            )}

            <ul>
              <li>
                <motion.div className="node node-admin" ref={adminRef} {...nodeReveal(0)}>
                  <span className="node-ico"><Icon name="guardrails" /></span>
                  <div className="node-body">
                    <b>Admin</b>
                    <span>Sets roles. Provisions on behalf of the team.</span>
                  </div>
                  <div className="node-tags">
                    <span className="ntag"><Icon name="key" className="ico-sm" />credentials</span>
                    <span className="ntag"><Icon name="context" className="ico-sm" />environments</span>
                    <span className="ntag"><Icon name="workflows" className="ico-sm" />workflows</span>
                  </div>
                </motion.div>
                <ul>
                  {ROLES.map((role, i) => (
                    <li key={role.name}>
                      <motion.div
                        className="node node-role"
                        ref={(el) => {
                          roleRefs.current[i] = el
                        }}
                        {...nodeReveal(0.25 + i * 0.12)}
                      >
                        <span className={`role-dot ${role.dot}`}></span>
                        <b>{role.name}</b>
                        <span className="node-perm">{role.perm}</span>
                      </motion.div>
                      <ul>
                        {role.users.map((u, j) => (
                          <li key={u.name}>
                            <motion.div
                              className={u.req ? 'uchip uchip-req' : 'uchip'}
                              ref={(el) => {
                                userRefs.current[`${i}-${j}`] = el
                              }}
                              {...nodeReveal(0.5 + i * 0.12 + j * 0.08)}
                            >
                              <span className="ava">{u.av}</span>
                              {u.name}
                              {u.req && <span className="req-pill">requests prod access</span>}
                            </motion.div>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>

          <div className="org-facts">
            <div className="ofact"><span className="ofact-ico"><Icon name="shield" /></span><div><b>Fine-grained RBAC</b><span>Roles gate every agent action, down to the tool call.</span></div></div>
            <div className="ofact"><span className="ofact-ico"><Icon name="audit" /></span><div><b>Full trace log</b><span>Every action lands in a signed, replayable record.</span></div></div>
            <div className="ofact"><span className="ofact-ico"><Icon name="eye" /></span><div><b>Browser sandbox</b><span>Agents run in an isolated, governed workspace.</span></div></div>
          </div>
        </div>
      </div>
    </section>
  )
}
