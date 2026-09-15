export type Theme = 'dark' | 'light'

export const THEME_STORAGE_KEY = 'hybrid-control-theme'

export function resolveTheme(storedTheme: string | null, prefersLight: boolean): Theme {
  if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme
  return prefersLight ? 'light' : 'dark'
}

export function getNextTheme(theme: Theme): Theme {
  return theme === 'dark' ? 'light' : 'dark'
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme

  const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  themeColor?.setAttribute('content', theme === 'light' ? '#edf4f8' : '#020b1d')
}

export function initializeTheme(): Theme {
  let storedTheme: string | null = null

  try {
    storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  } catch {
    // Storage can be unavailable in privacy-restricted browser contexts.
  }

  const prefersLight = window.matchMedia?.('(prefers-color-scheme: light)').matches ?? false
  const theme = resolveTheme(storedTheme, prefersLight)
  applyTheme(theme)
  return theme
}

export function saveTheme(theme: Theme): void {
  applyTheme(theme)

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // The active theme still applies for this page view when storage is blocked.
  }
}
