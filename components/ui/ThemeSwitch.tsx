'use client'

import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

interface ThemeSwitchProps {
  className?: string
}

export function ThemeSwitch({ className }: ThemeSwitchProps) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      className={cn(
        'relative flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-200',
        'hover:bg-white/8',
        className,
      )}
      style={{ color: 'var(--text-muted)' }}
    >
      <motion.div
        key={isDark ? 'moon' : 'sun'}
        initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
        animate={{ rotate: 0,   opacity: 1, scale: 1 }}
        exit={{    rotate:  30, opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {isDark ? (
          <Moon size={17} strokeWidth={1.8} />
        ) : (
          <Sun size={17} strokeWidth={1.8} />
        )}
      </motion.div>
    </motion.button>
  )
}
