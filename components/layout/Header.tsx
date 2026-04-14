'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Services',  href: '#services'  },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Méthode',   href: '#methode'   },
  { label: 'CEO',       href: '#ceo'       },
  { label: 'Avis',      href: '#avis'      },
  { label: 'Contact',   href: '#contact'   },
]

function MoonLogo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logolixi.png" alt="MapX Agency logo" width={28} height={28} style={{ objectFit: 'contain' }} />
  )
}

export function Header() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      )}
      style={{
        background: scrolled
          ? 'rgba(7, 8, 15, 0.85)'
          : 'rgba(7, 8, 15, 0.4)',
        backdropFilter: scrolled ? 'blur(24px) saturate(1.6)' : 'blur(12px)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.055)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-[60px]">

          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNav(e, '#hero')}
            className="flex items-center gap-2 group select-none"
            aria-label="MapX Agency — Accueil"
          >
            <motion.div
              whileHover={{ rotate: -18, scale: 1.15 }}
              transition={{ type: 'spring', stiffness: 260, damping: 14 }}
              className="opacity-90 group-hover:opacity-100 transition-opacity flex-shrink-0 flex items-center"
            >
              <MoonLogo />
            </motion.div>
            <span className="font-bold text-[15px] tracking-tight leading-none" style={{ color: 'var(--text)' }}>
              MapX{' '}
              <span style={{ color: 'var(--gold)' }}>Agency</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Navigation principale">
            {NAV_ITEMS.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNav(e, item.href)}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.055, duration: 0.35 }}
                className="relative px-3.5 py-2 text-[13px] font-medium rounded-xl transition-colors duration-200 group"
                style={{ color: 'var(--text-soft)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-soft)')}
              >
                {item.label}
                {/* Underline hover */}
                <span
                  className="absolute bottom-1 left-3.5 right-3.5 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full"
                  style={{ background: 'var(--gold)' }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Right — CTA + hamburger */}
          <div className="flex items-center gap-3">
            {/* Discord pill (desktop) */}
            <motion.a
              href="https://discord.gg/5Wf2FD982q"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-[13px] font-semibold rounded-2xl transition-all duration-200"
              style={{ background: 'rgba(200,169,110,0.12)', border: '1px solid rgba(200,169,110,0.2)', color: 'var(--gold)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(200,169,110,0.18)'
                e.currentTarget.style.borderColor = 'rgba(200,169,110,0.35)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(200,169,110,0.12)'
                e.currentTarget.style.borderColor = 'rgba(200,169,110,0.2)'
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
              </svg>
              Discord
            </motion.a>

            {/* Submit project (desktop) */}
            <motion.a
              href="#contact"
              onClick={(e) => handleNav(e, '#contact')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="hidden md:inline-flex items-center px-4 py-2 text-[13px] font-semibold rounded-2xl transition-all duration-200"
              style={{ background: 'var(--gold)', color: '#07080F' }}
            >
              Démarrer un projet
            </motion.a>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-[5px] w-9 h-9 items-center justify-center rounded-xl"
              style={{ color: 'var(--text-soft)' }}
              aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="block h-px w-5 rounded"
                style={{ background: 'var(--text)' }}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block h-px w-5 rounded"
                style={{ background: 'var(--text)' }}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="block h-px w-5 rounded"
                style={{ background: 'var(--text)' }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={mobileOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="overflow-hidden md:hidden"
        style={{
          borderTop: '1px solid var(--border)',
          background: 'rgba(7,8,15,0.97)',
          backdropFilter: 'blur(24px)',
        }}
      >
        <nav className="px-6 py-5 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNav(e, item.href)}
              className="px-4 py-3 text-sm rounded-xl transition-colors"
              style={{ color: 'var(--text-soft)' }}
            >
              {item.label}
            </a>
          ))}
          <div className="mt-3 pt-3 flex flex-col gap-2" style={{ borderTop: '1px solid var(--border)' }}>
            <a
              href="https://discord.gg/5Wf2FD982q"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 text-sm font-semibold rounded-2xl text-center flex items-center justify-center gap-2"
              style={{ background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.2)', color: 'var(--gold)' }}
            >
              Discord
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNav(e, '#contact')}
              className="px-4 py-3 text-sm font-semibold rounded-2xl text-center"
              style={{ background: 'var(--gold)', color: '#07080F' }}
            >
              Démarrer un projet
            </a>
          </div>
        </nav>
      </motion.div>
    </motion.header>
  )
}
