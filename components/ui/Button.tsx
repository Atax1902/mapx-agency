'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  Variant
  size?:     Size
  loading?:  boolean
  children:  ReactNode
  className?: string
  icon?:     ReactNode
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-gold text-dark-DEFAULT font-semibold border border-transparent hover:bg-gold-light shadow-lg shadow-gold/10',
  secondary:
    'bg-transparent border font-medium hover:border-gold/60 hover:text-gold transition-colors',
  ghost:
    'bg-transparent border-transparent font-medium hover:bg-white/5 transition-colors',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm rounded-xl gap-1.5',
  md: 'px-6 py-3 text-sm rounded-2xl gap-2',
  lg: 'px-8 py-4 text-base rounded-2xl gap-2.5',
}

export function Button({
  variant  = 'primary',
  size     = 'md',
  loading  = false,
  children,
  className,
  icon,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <motion.button
      whileTap={isDisabled ? undefined : { scale: 0.97 }}
      whileHover={isDisabled ? undefined : { scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      disabled={isDisabled}
      className={cn(
        'inline-flex items-center justify-center transition-all duration-200 select-none',
        variantStyles[variant],
        sizeStyles[size],
        isDisabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
      style={
        variant === 'secondary'
          ? { borderColor: 'var(--border)', color: 'var(--text)' }
          : undefined
      }
      {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {loading ? (
        <>
          <Spinner />
          <span>Chargement...</span>
        </>
      ) : (
        <>
          {icon && <span className="flex-shrink-0">{icon}</span>}
          {children}
        </>
      )}
    </motion.button>
  )
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4 flex-shrink-0"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}
