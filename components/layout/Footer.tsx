'use client'

import { motion } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Services',  href: '#services'  },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Méthode',   href: '#methode'   },
  { label: 'Avis',      href: '#avis'      },
  { label: 'Contact',   href: '#contact'   },
]

const SOCIAL_LINKS = [
  {
    label: 'Discord',
    href: 'https://discord.gg/5Wf2FD982q',
    primary: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
      </svg>
    ),
  },
  {
    label: 'Mail',
    href: 'mailto:mapx.studio@outlook.fr',
    primary: false,
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="3"/>
        <path d="m2 7 8.586 5.657a2 2 0 0 0 2.828 0L22 7"/>
      </svg>
    ),
  },
  {
    label: 'X (Twitter)',
    href: 'https://x.com/mapx_studio',
    primary: false,
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.261 5.633 5.903-5.633zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@mapx.agency',
    primary: false,
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.73a4.85 4.85 0 0 1-1.01-.04z"/>
      </svg>
    ),
  },
]

function MoonLogo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logolixi.png" alt="MapX Agency logo" width={26} height={26} style={{ objectFit: 'contain' }} />
  )
}

export function Footer() {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <footer
      className="relative border-t pt-16 pb-10 overflow-hidden"
      style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
    >
      {/* Background ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 40% at 50% 100%, rgba(200,169,110,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">

          {/* Brand — 4 cols */}
          <div className="md:col-span-4">
            <a href="#hero" onClick={(e) => handleNav(e, '#hero')} className="inline-flex items-center gap-2 mb-5 group">
              <div className="opacity-80 group-hover:opacity-100 transition-opacity">
                <MoonLogo />
              </div>
              <span className="font-bold text-[15px]" style={{ color: 'var(--text)' }}>MapX</span>
              <span className="font-semibold text-[15px]" style={{ color: 'var(--gold)' }}>Agency</span>
            </a>

            <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-soft)' }}>
              &ldquo;Vos idées méritent mieux&rdquo;
            </p>
            <p className="text-xs leading-relaxed mt-3" style={{ color: 'var(--text-muted)' }}>
              Agence spécialisée dans la création UGC sur Fortnite et Roblox.
            </p>

            {/* Social icons row */}
            <div className="flex items-center gap-2 mt-6">
              {SOCIAL_LINKS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.1, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  className="flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-200"
                  style={{
                    background: s.primary ? 'rgba(200,169,110,0.12)' : 'var(--surface-2)',
                    border: s.primary ? '1px solid rgba(200,169,110,0.22)' : '1px solid var(--border)',
                    color: s.primary ? 'var(--gold)' : 'var(--text-muted)',
                  }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav — 3 cols */}
          <div className="md:col-span-3 md:col-start-6">
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: 'var(--text-muted)' }}>
              Navigation
            </h4>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNav(e, link.href)}
                    className="text-sm transition-colors duration-200"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — 4 cols */}
          <div className="md:col-span-4 md:col-start-9">
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: 'var(--text-muted)' }}>
              Nous rejoindre
            </h4>
            <div className="flex flex-col gap-3">
              {SOCIAL_LINKS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                  className="inline-flex items-center gap-3 text-sm transition-colors duration-200"
                  style={{ color: s.primary ? 'var(--gold)' : 'var(--text-muted)' }}
                >
                  <span
                    className="flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0"
                    style={{
                      background: s.primary ? 'rgba(200,169,110,0.1)' : 'var(--surface-2)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    {s.icon}
                  </span>
                  <span className={s.primary ? 'font-medium' : ''}>
                    {s.label}
                  </span>
                  {s.primary && (
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide"
                      style={{ background: 'rgba(200,169,110,0.12)', color: 'var(--gold)' }}
                    >
                      Principal
                    </span>
                  )}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Gold separator */}
        <div className="gold-line mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
            © {new Date().getFullYear()} MapX Agency. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="/mentions-legales"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
              style={{
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(200,169,110,0.25)'
                e.currentTarget.style.color = 'var(--text-soft)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.color = 'var(--text-muted)'
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
              Mentions légales
            </a>
            <p className="text-xs" style={{ color: 'var(--text-muted)', opacity: 0.4 }}>
              Fait par Pixol pour MapX Agency
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
