import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '../../../lib/cn'

/**
 * Aceternity UI — Pointer Highlight (https://ui.aceternity.com/components/pointer-highlight).
 * Draws an animated rectangle around the wrapped text with a little cursor at the
 * corner once it scrolls into view. MIT-licensed.
 */
export function PointerHighlight({
  children,
  rectangleClassName,
  pointerClassName,
  containerClassName,
}: {
  children: ReactNode
  rectangleClassName?: string
  pointerClassName?: string
  containerClassName?: string
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const on = seen || reduce

  return (
    <span ref={ref} className={cn('relative inline-block', containerClassName)}>
      {children}
      <motion.span
        aria-hidden="true"
        className={cn('pointer-events-none absolute inset-0 rounded-[6px] border', rectangleClassName)}
        style={{ borderColor: 'var(--blue)' }}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={on ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
      />
      <motion.span
        aria-hidden="true"
        className={cn('pointer-events-none absolute', pointerClassName)}
        style={{ right: -10, bottom: -12, color: 'var(--blue)' }}
        initial={{ opacity: 0, y: -6, x: -6 }}
        animate={on ? { opacity: 1, y: 0, x: 0 } : {}}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.5 }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2 1l11 5.5-4.6 1.2L6 13 2 1z" />
        </svg>
      </motion.span>
    </span>
  )
}
