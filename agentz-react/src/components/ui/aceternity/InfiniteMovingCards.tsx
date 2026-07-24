import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '../../../lib/cn'

/**
 * Aceternity UI — Infinite Moving Cards (https://ui.aceternity.com/components/infinite-moving-cards).
 * MIT-licensed. Duplicates its children and marquee-scrolls them forever.
 * Keyframes (`scroll`) + the CSS vars it reads live in globals.css.
 */
type Props = {
  items: ReactNode[]
  direction?: 'left' | 'right'
  speed?: 'fast' | 'normal' | 'slow'
  pauseOnHover?: boolean
  className?: string
}

export function InfiniteMovingCards({
  items,
  direction = 'left',
  speed = 'normal',
  pauseOnHover = true,
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLUListElement>(null)
  const [start, setStart] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    const scroller = scrollerRef.current
    if (!container || !scroller) return

    // duplicate items so the loop is seamless
    Array.from(scroller.children).forEach((item) => {
      scroller.appendChild(item.cloneNode(true))
    })

    container.style.setProperty('--animation-direction', direction === 'left' ? 'forwards' : 'reverse')
    container.style.setProperty(
      '--animation-duration',
      speed === 'fast' ? '20s' : speed === 'normal' ? '40s' : '80s',
    )
    setStart(true)
  }, [direction, speed])

  return (
    <div
      ref={containerRef}
      className={cn('scroller relative z-20 max-w-7xl overflow-hidden', className)}
      style={{
        maskImage: 'linear-gradient(to right, transparent, white 12%, white 88%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, white 12%, white 88%, transparent)',
      }}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          'flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-2',
          start && 'animate-scroll',
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )}
      >
        {items.map((item, i) => (
          <li key={i} className="shrink-0">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
