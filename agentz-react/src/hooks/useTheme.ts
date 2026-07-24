import { useCallback, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
const KEY = 'agentz-theme'

/** Persisted light/dark theme, applied as data-theme on <html>. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // The pre-paint script in index.html resolves this and sets data-theme; trust it.
    const attr = typeof document !== 'undefined' ? document.documentElement.getAttribute('data-theme') : null
    if (attr === 'dark' || attr === 'light') return attr
    try {
      return (localStorage.getItem(KEY) as Theme) || 'dark'
    } catch {
      return 'dark'
    }
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.setAttribute('data-theme', 'dark')
    else root.removeAttribute('data-theme')
    try {
      localStorage.setItem(KEY, theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])
  return { theme, toggle }
}
