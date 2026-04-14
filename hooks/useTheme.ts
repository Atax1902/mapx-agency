'use client'

import { useTheme as useNextTheme } from 'next-themes'

export type Theme = 'dark' | 'light' | 'system'

export interface UseThemeReturn {
  theme:        string | undefined
  setTheme:     (theme: Theme) => void
  resolvedTheme: string | undefined
  isDark:       boolean
  toggleTheme:  () => void
}

export function useTheme(): UseThemeReturn {
  const { theme, setTheme, resolvedTheme } = useNextTheme()

  const isDark = resolvedTheme === 'dark'

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return {
    theme,
    setTheme: setTheme as (theme: Theme) => void,
    resolvedTheme,
    isDark,
    toggleTheme,
  }
}
