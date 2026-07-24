import type { ReactNode } from 'react'
import { cn } from '../../../lib/cn'

/**
 * Aceternity UI — Bento Grid (https://ui.aceternity.com/components/bento-grid).
 * MIT-licensed. Restyled to AgentZ tokens (hairline border, token surfaces).
 */
export function BentoGrid({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn('mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3', className)}>
      {children}
    </div>
  )
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string
  title?: ReactNode
  description?: ReactNode
  header?: ReactNode
  icon?: ReactNode
}) {
  return (
    <div
      className={cn(
        'group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl border p-5 transition duration-200 hover:shadow-xl',
        className,
      )}
      style={{ background: 'var(--white)', borderColor: 'var(--line)', boxShadow: '0 1px 2px rgba(0,0,0,.04)' }}
    >
      {header ? <div className="min-h-0 flex-1 overflow-hidden">{header}</div> : null}
      <div className="transition duration-200 group-hover/bento:translate-x-1">
        {icon}
        <div
          className="mt-2 mb-1 font-semibold"
          style={{ fontFamily: 'var(--display)', color: 'var(--ink)', fontSize: '18px' }}
        >
          {title}
        </div>
        <div className="text-sm" style={{ color: 'var(--ink-soft)', lineHeight: 1.5 }}>
          {description}
        </div>
      </div>
    </div>
  )
}
