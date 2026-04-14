'use client'

import { useEffect, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
  isOpen:    boolean
  onClose:   () => void
  children:  ReactNode
  title?:    string
  className?: string
}

export function Modal({ isOpen, onClose, children, title, className }: ModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)' }}
          >
            {/* Panel */}
            <motion.div
              key="modal-panel"
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1,    y: 0  }}
              exit={{    opacity: 0, scale: 0.95,  y: 10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                'relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl',
                className,
              )}
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              {/* Header */}
              {title && (
                <div
                  className="flex items-center justify-between px-8 py-6 border-b"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <h2 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>
                    {title}
                  </h2>
                  <button
                    onClick={onClose}
                    className="flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:bg-white/8"
                    style={{ color: 'var(--text-muted)' }}
                    aria-label="Fermer"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}

              {/* Close button (no title) */}
              {!title && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:bg-white/10"
                  style={{ color: 'var(--text-muted)' }}
                  aria-label="Fermer"
                >
                  <X size={18} />
                </button>
              )}

              <div className="p-8 md:p-10">{children}</div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
