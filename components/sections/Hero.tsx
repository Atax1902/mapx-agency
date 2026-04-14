'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const STATS = [
  { prefix: '+', count: 25,   suffix: '',     label: 'Maps livrées'          },
  { prefix: '',  count: 7400, suffix: 'h',    label: 'Heures de jeu totales' },
  { prefix: '+', count: 5,    suffix: ' ans', label: "D'expertise"           },
]

function CountUp({ to, delay = 0 }: Readonly<{ to: number; delay?: number }>) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))

  useEffect(() => {
    if (!isInView) return
    const controls = animate(count, to, {
      duration: to > 100 ? 1.4 : 0.9,
      delay,
      ease: [0.16, 1, 0.3, 1],
    })
    return controls.stop
  }, [isInView, count, to, delay])

  return <motion.span ref={ref}>{rounded}</motion.span>
}

const PLATFORMS = ['Fortnite UEFN', 'Roblox', 'Graphisme']

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const ease = [0.16, 1, 0.3, 1] as const

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-[60px]"
    >
      {/* ── Background layers ───────────────────────────────── */}

      {/* Fine line grid */}
      <div className="absolute inset-0 line-grid opacity-100 pointer-events-none" />

      {/* Gold ambient center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 75% 55% at 50% 55%, rgba(200,169,110,0.065) 0%, transparent 68%)',
        }}
      />

      {/* Soft blue counter-glow bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(60,80,160,0.05) 0%, transparent 60%)',
        }}
      />

      {/* ── Main content wrapper ─────────────────────────────── */}
      <div className="relative z-10 w-full flex flex-col items-center gap-6 pb-10">

        {/* ── VIDEO FRAME ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, ease }}
          className="w-full px-3 sm:px-5 lg:px-8"
          style={{ maxWidth: '1400px' }}
        >
          {/* Gold frame wrapper */}
          <div
            style={{
              padding: '7px',
              borderRadius: '22px',
              background: 'linear-gradient(135deg, rgba(212,184,130,0.95) 0%, rgba(200,169,110,0.85) 40%, rgba(176,128,62,0.95) 70%, rgba(212,184,130,0.9) 100%)',
              boxShadow: '0 0 55px rgba(200,169,110,0.4), 0 0 120px rgba(200,169,110,0.15), 0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            {/* Inner video container */}
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: '16px',
                aspectRatio: '21/9',
                background: 'linear-gradient(135deg, #07080F 0%, #0E1018 50%, #07080F 100%)',
              }}
            >
              {/* Video */}
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster="/assets/hero/poster.jpg"
              >
                <source src="/assets/hero/hero.webm" type="video/webm" />
                <source src="/assets/hero/hero.mp4"  type="video/mp4" />
              </video>

              {/* Dark overlay for readability */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(7,8,15,0.6) 0%, rgba(7,8,15,0.2) 45%, transparent 70%)',
                }}
              />

              {/* Vignette edges */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 55%, rgba(7,8,15,0.45) 100%)',
                }}
              />

              {/* Platform badges — top left */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5, ease }}
                className="absolute top-4 left-4 sm:top-5 sm:left-5 flex flex-wrap gap-1.5 sm:gap-2"
              >
                {PLATFORMS.map((badge) => (
                  <span
                    key={badge}
                    className="gold-badge"
                    style={{ backdropFilter: 'blur(8px)', background: 'rgba(200,169,110,0.15)' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--gold)' }} />
                    {badge}
                  </span>
                ))}
              </motion.div>

              {/* Headline — center of video */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.65, ease }}
                  className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-black tracking-tight leading-[1.05] text-center"
                  style={{
                    color: '#EEECE6',
                    textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 0 60px rgba(0,0,0,0.4)',
                  }}
                >
                  Vos idées méritent
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42, duration: 0.65, ease }}
                  className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-black tracking-tight leading-[1.05] text-center"
                  style={{
                    color: 'var(--gold)',
                    textShadow: '0 2px 24px rgba(0,0,0,0.9), 0 0 40px rgba(200,169,110,0.3)',
                  }}
                >
                  mieux.
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Below-video content ──────────────────────────────── */}
        <div className="flex flex-col items-center gap-5 px-6 w-full max-w-5xl mx-auto">

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.55, ease }}
            className="text-sm sm:text-base md:text-lg max-w-2xl text-center leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            MapX Agency, le Studio spécialisé en création de Maps Fortnite UEFN, Expériences Roblox
            et Graphismes pour les marques et créateurs.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5, ease }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button size="lg" variant="primary" onClick={() => scrollTo('#contact')} icon={<ArrowRight size={16} />}>
              Soumettre un projet
            </Button>
            <Button size="lg" variant="secondary" onClick={() => scrollTo('#portfolio')}>
              Voir notre portfolio
            </Button>
          </motion.div>

          {/* Stats cards */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.55, ease }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.07, duration: 0.4 }}
                className="flex flex-col items-center px-8 py-4 rounded-2xl relative overflow-hidden"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
                  minWidth: '130px',
                }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200,169,110,0.07) 0%, transparent 70%)',
                  }}
                />
                <span className="relative text-2xl font-black tabular-nums" style={{ color: 'var(--gold)' }}>
                  {stat.prefix}<CountUp to={stat.count} delay={0.85 + i * 0.07} />{stat.suffix}
                </span>
                <span className="relative text-xs mt-1 text-center leading-tight" style={{ color: 'var(--text-muted)' }}>
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: 'var(--text-muted)' }}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ opacity: 0.45 }}>
          Découvrir
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} style={{ opacity: 0.35 }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
