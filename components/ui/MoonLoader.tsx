'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function MoonLoader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="moon-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeOut' } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#0A0A0A' }}
        >
          {/* Moon SVG with glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-6"
          >
            {/* Glow ring */}
            <motion.div
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale:   [1, 1.15, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full blur-2xl"
              style={{
                background: 'radial-gradient(circle, rgba(200,169,110,0.4) 0%, transparent 70%)',
                width:  '120px',
                height: '120px',
                top:    '50%',
                left:   '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />

            {/* Logo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logolixi.png"
              alt="MapX Agency"
              width={80}
              height={80}
              style={{ position: 'relative', zIndex: 1, objectFit: 'contain' }}
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
            className="text-center"
          >
            <span className="text-xl font-bold tracking-tight" style={{ color: '#F5F5F5' }}>
              MapX{' '}
              <span style={{ color: '#C8A96E' }}>Agency</span>
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
