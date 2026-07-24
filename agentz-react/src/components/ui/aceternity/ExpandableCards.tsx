import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Aceternity UI — Expandable Card (https://ui.aceternity.com/components/expandable-card).
 * A grid of cards that expand into a centered modal with a shared layout
 * transition. MIT-licensed. Adapted to AgentZ tokens and video/image media.
 */
export type ExpandableItem = {
  title: string
  description: string
  src: string // video (.mp4) or image path
  poster?: string
  label: string
}

export function ExpandableCards({ items }: { items: ExpandableItem[] }) {
  const [active, setActive] = useState<ExpandableItem | null>(null)
  const id = useId()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setActive(null)
    }
    document.body.style.overflow = active ? 'hidden' : ''
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  const isVideo = (s: string) => s.endsWith('.mp4')

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            className="exp-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <div className="exp-modal-wrap">
            <motion.div layoutId={`card-${active.title}-${id}`} className="exp-modal" ref={ref}>
              <motion.div layoutId={`media-${active.title}-${id}`} className="exp-modal-media">
                {isVideo(active.src) ? (
                  <video src={active.src} poster={active.poster} autoPlay muted loop playsInline aria-label={active.label} />
                ) : (
                  <img src={active.src} alt={active.label} />
                )}
              </motion.div>
              <div className="exp-modal-body">
                <motion.h3 layoutId={`title-${active.title}-${id}`}>{active.title}</motion.h3>
                <motion.p layoutId={`desc-${active.title}-${id}`}>{active.description}</motion.p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ul className="exp-grid">
        {items.map((item) => (
          <motion.li
            layoutId={`card-${item.title}-${id}`}
            key={item.title}
            className="exp-card"
            onClick={() => setActive(item)}
            whileHover={{ y: -3 }}
          >
            <motion.div layoutId={`media-${item.title}-${id}`} className="exp-card-media">
              {isVideo(item.src) ? (
                <video src={item.src} poster={item.poster} autoPlay muted loop playsInline aria-label={item.label} />
              ) : (
                <img src={item.src} alt={item.label} />
              )}
            </motion.div>
            <div className="exp-card-body">
              <motion.h3 layoutId={`title-${item.title}-${id}`}>{item.title}</motion.h3>
              <motion.p layoutId={`desc-${item.title}-${id}`}>{item.description}</motion.p>
            </div>
          </motion.li>
        ))}
      </ul>
    </>
  )
}
