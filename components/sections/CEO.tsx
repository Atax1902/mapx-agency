'use client'

import { useRef } from 'react'
import {
  motion, useInView,
  useMotionValue, useSpring, useTransform, useMotionTemplate,
} from 'framer-motion'
import { Quote } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1] as const
const SPRING = { stiffness: 280, damping: 28 } as const

export function CEO() {
  const ref     = useRef(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  // ── 3D tilt ──────────────────────────────────────────────────────
  const rawX    = useMotionValue(0)
  const rawY    = useMotionValue(0)
  const rawGlare = useMotionValue(0)

  const springX = useSpring(rawX, SPRING)
  const springY = useSpring(rawY, SPRING)
  const glareOpacity = useSpring(rawGlare, { stiffness: 200, damping: 25 })

  const rotateY = useTransform(springX, [-0.5, 0.5], [-8,  8])
  const rotateX = useTransform(springY, [-0.5, 0.5], [ 6, -6])

  const glareXPos = useTransform(springX, [-0.5, 0.5], [15, 85])
  const glareYPos = useTransform(springY, [-0.5, 0.5], [15, 85])
  const glareBg   = useMotionTemplate`radial-gradient(circle at ${glareXPos}% ${glareYPos}%, rgba(255,255,255,0.07) 0%, transparent 55%)`

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current
    if (!card) return
    const { left, top, width, height } = card.getBoundingClientRect()
    rawX.set((e.clientX - left) / width  - 0.5)
    rawY.set((e.clientY - top)  / height - 0.5)
    rawGlare.set(1)
  }

  function handleMouseLeave() {
    rawX.set(0)
    rawY.set(0)
    rawGlare.set(0)
  }

  return (
    <section id="ceo" className="py-24 md:py-32 relative">
      {/* Ambient glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 45% 55% at 105% 45%, rgba(200,169,110,0.05) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 35% 35% at 30% 0%, rgba(200,169,110,0.03) 0%, transparent 50%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* ─── Left: Photo ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease }}
            className="relative"
            style={{ perspective: '1000px' }}
          >
            {/* Outer glow frame */}
            <div
              className="absolute -inset-3 rounded-4xl opacity-40 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(200,169,110,0.1) 0%, transparent 60%)',
                border: '1px solid rgba(200,169,110,0.12)',
              }}
            />

            {/* Tilt card */}
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative aspect-[3/4] rounded-3xl overflow-hidden"
              style={{
                rotateX,
                rotateY,
                border: '1px solid var(--border)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
                cursor: 'default',
                willChange: 'transform',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/ceo/photo.png"
                alt="Lisandro — CEO MapX Agency"
                className="w-full h-full object-cover"
              />

              {/* Subtle gold gradient overlay at bottom */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(7,8,15,0.55) 0%, transparent 45%)',
                }}
              />

              {/* Glare overlay — follows mouse */}
              <motion.div
                className="absolute inset-0 pointer-events-none rounded-3xl"
                style={{ background: glareBg, opacity: glareOpacity }}
              />

              {/* Moon decoration — top right corner */}
              <motion.div
                className="absolute top-5 right-5"
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C14.36 21 16.5 20.13 18.16 18.67C16.5 18.67 14.96 18.02 13.86 16.92C12.76 15.82 12.11 14.28 12.11 12.62C12.11 9.42 14.72 6.71 18 6.49C16.48 4.39 14.38 3 12 3Z"
                    fill="rgba(200,169,110,0.22)"
                  />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ─── Right: Content ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.14, duration: 0.65, ease }}
            className="flex flex-col gap-7"
          >
            {/* Label */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5, ease }}
            >
              <div className="h-px w-8 flex-shrink-0" style={{ background: 'var(--gold)' }} />
              <span
                className="text-xs font-semibold tracking-[0.18em] uppercase"
                style={{ color: 'var(--gold)' }}
              >
                Mot du CEO
              </span>
            </motion.div>

            {/* Name */}
            <div className="overflow-hidden">
              <motion.h3
                className="text-3xl md:text-4xl font-bold mb-1.5"
                style={{ color: 'var(--text)' }}
                initial={{ y: '110%' }}
                animate={isInView ? { y: '0%' } : {}}
                transition={{ delay: 0.3, duration: 0.7, ease }}
              >
                Lisandro
              </motion.h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Fondateur &amp; CEO, MapX Agency · <span style={{ color: 'var(--gold)' }}>@LixiTros</span>
              </p>
            </div>

            {/* Bio */}
            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.42, duration: 0.55, ease }}
            >
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-soft)' }}>
                {
                  "Passionné par la création de maps Fortnite depuis 2019, j'ai fondé MapX Agency avec une conviction simple : les jeux vidéo sont le nouveau terrain de jeu des marques et des créateurs qui veulent toucher les nouvelles générations de façon authentique."
                }
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-soft)' }}>
                {
                  "Après plusieurs années à développer des expériences pour des marques sur Fortnite et Roblox, j'ai réuni une équipe d'experts partageant la même exigence de qualité. Aujourd'hui, MapX c'est plus qu'un studio, c'est un partenaire de confiance pour vos projets les plus ambitieux."
                }
              </p>
            </motion.div>

            {/* Highlighted quote */}
            <div
              className="relative p-6 rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(200,169,110,0.05)',
                border: '1px solid rgba(200,169,110,0.15)',
              }}
            >
              <div
                className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
                style={{ background: 'linear-gradient(180deg, var(--gold), transparent)' }}
              />
              <Quote size={18} className="mb-3" style={{ color: 'rgba(200,169,110,0.4)' }} />
              <p
                className="text-base md:text-[17px] font-medium leading-snug italic"
                style={{ color: 'var(--text)' }}
              >
                &ldquo;Mon objectif est simple : faire de MapX Agency LA référence.&rdquo;
              </p>
            </div>

            {/* Signature */}
            <div className="flex items-center gap-4">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-2xl text-sm font-black flex-shrink-0"
                style={{
                  background: 'var(--gold)',
                  color: '#07080F',
                  fontFamily: 'Georgia, serif',
                  fontStyle: 'italic',
                }}
              >
                L
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
                  Lisandro
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  CEO &amp; Fondateur · @LixiTros
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
