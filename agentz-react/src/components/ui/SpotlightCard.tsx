import { useRef, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from 'framer-motion'

/**
 * Aceternity-style "Card Hover Effect": a soft spotlight that follows the
 * cursor. Kept deliberately restrained per the AgentZ brand guide — a low-opacity
 * blue radial, no glass blur, and fully off under reduced-motion. Renders as the
 * same <article> the cards used, so existing CSS classes still apply.
 */
type Props = {
  className?: string
  children: React.ReactNode
}

export function SpotlightCard({ className, children }: Props) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const [hovered, setHovered] = useState(false)

  const background = useMotionTemplate`radial-gradient(220px circle at ${mx}px ${my}px, var(--blue-soft), transparent 72%)`

  function onMove(e: React.MouseEvent<HTMLElement>) {
    if (reduce) return
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }

  return (
    <article
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative' }}
    >
      {!reduce && (
        <motion.span
          aria-hidden="true"
          className="spot-glow"
          style={{ background }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        />
      )}
      {children}
    </article>
  )
}
