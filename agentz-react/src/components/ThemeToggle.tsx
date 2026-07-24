import { useTheme } from '../hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'
  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={dark ? 'Light mode' : 'Dark mode'}
    >
      {dark ? (
        // sun
        <svg className="ico" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2.4M12 19.1v2.4M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" />
        </svg>
      ) : (
        // moon
        <svg className="ico" viewBox="0 0 24 24">
          <path d="M20 14.2A8 8 0 1 1 9.8 4a6.4 6.4 0 0 0 10.2 10.2Z" />
        </svg>
      )}
    </button>
  )
}
