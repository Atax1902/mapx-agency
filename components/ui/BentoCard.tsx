'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface BentoCardProps {
  children:   ReactNode
  className?: string
  gradient?:  boolean
  onClick?:   () => void
  as?:        'div' | 'article' | 'section'
}

export function BentoCard({
  children,
  className,
  gradient = false,
  onClick,
  as: Tag = 'div',
}: BentoCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.015, y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={cn(
        'bento-card p-6',
        gradient && 'gold-border-gradient',
        onClick && 'cursor-pointer',
        className,
      )}
    >
      {children}
    </motion.div>
  )
}
