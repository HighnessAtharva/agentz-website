import { useEffect, useRef } from 'react'

/**
 * honcho.dev-style animated pixel field: a faint grid of cells on near-black,
 * a few of which softly light up in blue and fade. Canvas-based and cheap.
 * Respects prefers-reduced-motion (renders a static sparse grid).
 */
type Props = {
  className?: string
  cell?: number
}

export function NoiseBackground({ className, cell = 26 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf = 0
    let w = 0
    let h = 0
    let cols = 0
    let rows = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    // read colors from CSS tokens so it follows the theme
    const styles = getComputedStyle(document.documentElement)
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light'
    const line = isDark ? 'rgba(150,160,200,0.06)' : 'rgba(30,40,90,0.05)'
    const glow = styles.getPropertyValue('--blue-bright').trim() || '#6c86ff'

    type Spark = { c: number; r: number; life: number; max: number }
    let sparks: Spark[] = []

    function resize() {
      const parent = canvas!.parentElement
      w = parent ? parent.clientWidth : window.innerWidth
      h = parent ? parent.clientHeight : window.innerHeight
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      canvas!.style.width = w + 'px'
      canvas!.style.height = h + 'px'
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(w / cell)
      rows = Math.ceil(h / cell)
    }

    function grid() {
      ctx!.clearRect(0, 0, w, h)
      ctx!.strokeStyle = line
      ctx!.lineWidth = 1
      for (let x = 0; x <= cols; x++) {
        ctx!.beginPath()
        ctx!.moveTo(x * cell + 0.5, 0)
        ctx!.lineTo(x * cell + 0.5, h)
        ctx!.stroke()
      }
      for (let y = 0; y <= rows; y++) {
        ctx!.beginPath()
        ctx!.moveTo(0, y * cell + 0.5)
        ctx!.lineTo(w, y * cell + 0.5)
        ctx!.stroke()
      }
    }

    function hexToRgb(hex: string) {
      const m = hex.replace('#', '')
      const n = parseInt(m.length === 3 ? m.split('').map((c) => c + c).join('') : m, 16)
      return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
    }
    const g = hexToRgb(glow)

    function frame() {
      grid()
      // occasionally spawn a lit cell
      if (sparks.length < 26 && Math.random() < 0.35) {
        sparks.push({
          c: Math.floor(Math.random() * cols),
          r: Math.floor(Math.random() * rows),
          life: 0,
          max: 60 + Math.random() * 90,
        })
      }
      sparks = sparks.filter((s) => {
        s.life++
        const t = s.life / s.max
        const alpha = Math.sin(t * Math.PI) * 0.5 // fade in/out
        if (alpha > 0) {
          ctx!.fillStyle = `rgba(${g.r},${g.g},${g.b},${alpha})`
          ctx!.fillRect(s.c * cell + 1, s.r * cell + 1, cell - 1, cell - 1)
        }
        return s.life < s.max
      })
      raf = requestAnimationFrame(frame)
    }

    resize()
    if (reduce) {
      grid()
    } else {
      frame()
    }
    const onResize = () => resize()
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [cell])

  return <canvas ref={ref} className={className} aria-hidden="true" />
}
