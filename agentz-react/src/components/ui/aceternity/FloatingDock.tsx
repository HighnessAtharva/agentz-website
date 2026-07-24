import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'

/**
 * Aceternity UI — Floating Dock (https://ui.aceternity.com/components/floating-dock).
 * macOS-style magnifying dock, pinned bottom-center. MIT-licensed.
 */
export type DockItem = {
  title: string
  icon: ReactNode
  href: string
  onClick?: (e: React.MouseEvent) => void
  className?: string
}

export function FloatingDock({ items }: { items: DockItem[] }) {
  const mouseX = useMotionValue(Infinity)
  return (
    <div className="dock-wrap">
      <div className="dock" onMouseMove={(e) => mouseX.set(e.pageX)} onMouseLeave={() => mouseX.set(Infinity)}>
        {items.map((item) => (
          <DockIcon key={item.title} mouseX={mouseX} {...item} />
        ))}
      </div>
    </div>
  )
}

function DockIcon({ mouseX, title, icon, href, onClick, className }: DockItem & { mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })
  const sizeT = useTransform(distance, [-140, 0, 140], [40, 66, 40])
  const size = useSpring(sizeT, { mass: 0.1, stiffness: 150, damping: 12 })

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      style={{ width: size, height: size }}
      className={className ? `dock-item ${className}` : 'dock-item'}
      aria-label={title}
      title={title}
    >
      {icon}
      <span className="dock-tip">{title}</span>
    </motion.a>
  )
}
