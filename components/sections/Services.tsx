'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Gamepad2, Globe, Palette, Film, CheckCircle2, Clock } from 'lucide-react'

const WHY_MAPX = [
  'Expertise certifiée UEFN.',
  'Livraisons rapides.',
  'Suivi dédié, zéro zone grise.',
  'Résultats concrets, satisfaction garantie.',
]

const ease = [0.16, 1, 0.3, 1] as const

export function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  }
  const item = {
    hidden: { opacity: 0, y: 44, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease } },
  }

  return (
    <section id="services" className="py-24 md:py-32 relative">
      {/* Section ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 50% at 15% 30%, rgba(200,169,110,0.04) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 40% 40% at 90% 70%, rgba(70,90,190,0.025) 0%, transparent 55%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <motion.h2
            className="section-heading mb-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease }}
          >
            Nos Services
          </motion.h2>
          <motion.p
            className="section-subheading max-w-xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5, ease }}
          >
            Des créations sur-mesure pour les marques, influenceurs et studios qui veulent marquer les esprits.
          </motion.p>
        </div>

        {/* Bento grid */}
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-12 gap-4"
        >
          {/* ── Fortnite UEFN — large featured card ── */}
          <motion.div
            variants={item}
            className="md:col-span-7 bento-card-elevated gold-border-gradient p-8 group"
          >
            <div className="flex flex-col h-full gap-6 min-h-[280px]">
              <div className="flex items-start justify-between">
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-2xl"
                  style={{ background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.22)' }}
                >
                  <Gamepad2 size={22} style={{ color: 'var(--gold)' }} />
                </div>
                <span className="gold-badge">Flagship</span>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text)' }}>
                  Expériences Fortnite
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  On prend en charge votre projet Fortnite UEFN de A à Z — du brief initial jusqu&apos;à la publication.
                  Modes de jeu interactifs / Activations de marque / Battle Royale / Nouvelles tendances —
                  on construit l&apos;expérience que vous avez en tête, sans compromis.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-auto">
                {['Modes personnalisés', 'Brand activations', 'Battle Royale islands', 'Événements live', 'Game Jams', 'Nouvelles tendances'].map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--gold)' }} />
                    {feat}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Roblox — Coming soon ── */}
          <motion.div
            variants={item}
            className="md:col-span-5 bento-card p-7 group relative overflow-hidden"
          >
            {/* Dim overlay */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{ background: 'rgba(7,8,15,0.35)' }}
            />

            <div className="relative flex flex-col h-full gap-5 min-h-[280px]">
              <div className="flex items-start justify-between">
                <div
                  className="flex items-center justify-center w-11 h-11 rounded-2xl"
                  style={{ background: 'rgba(200,169,110,0.05)', border: '1px solid rgba(200,169,110,0.1)' }}
                >
                  <Globe size={20} style={{ color: 'rgba(200,169,110,0.45)' }} />
                </div>

                {/* "Prochainement" badge */}
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'var(--text-muted)',
                  }}
                >
                  <Clock size={11} />
                  Prochainement
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'rgba(238,236,230,0.45)' }}>
                  Expériences Roblox
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(99,104,120,0.7)' }}>
                  Jeux complets, mondes de marque et expériences interactives sur Roblox.
                  Bientôt disponible.
                </p>
              </div>

              <div className="flex flex-col gap-2 mt-auto opacity-40">
                {['Jeux & expériences', 'Brand worlds', 'Événements virtuels', 'Systèmes de monétisation'].map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <span className="w-1 h-1 rounded-full" style={{ background: 'var(--gold)' }} />
                    {feat}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Graphisme ── */}
          <motion.div variants={item} className="md:col-span-5 bento-card p-7 group">
            <div className="flex flex-col h-full gap-5 min-h-[240px]">
              <div
                className="flex items-center justify-center w-11 h-11 rounded-2xl"
                style={{ background: 'rgba(200,169,110,0.08)', border: '1px solid rgba(200,169,110,0.14)' }}
              >
                <Palette size={20} style={{ color: 'var(--gold)' }} />
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text)' }}>
                  Graphisme
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Thumbnails impactantes, assets graphiques, UI de jeu et identités visuelles pour valoriser
                  vos créations et booster votre visibilité.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-auto">
                {['Thumbnails', 'Assets & UI', 'Identité visuelle', 'Key visuals'].map((feat) => (
                  <span key={feat} className="tag">{feat}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Trailers — Coming soon ── */}
          <motion.div
            variants={item}
            className="md:col-span-4 bento-card p-7 group relative overflow-hidden"
          >
            {/* Dim overlay to signal "not available yet" */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{ background: 'rgba(7,8,15,0.35)' }}
            />

            <div className="relative flex flex-col h-full gap-5 min-h-[240px]">
              <div className="flex items-start justify-between">
                <div
                  className="flex items-center justify-center w-11 h-11 rounded-2xl"
                  style={{ background: 'rgba(200,169,110,0.05)', border: '1px solid rgba(200,169,110,0.1)' }}
                >
                  <Film size={20} style={{ color: 'rgba(200,169,110,0.45)' }} />
                </div>

                {/* "Prochainement" badge */}
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'var(--text-muted)',
                  }}
                >
                  <Clock size={11} />
                  Prochainement
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'rgba(238,236,230,0.45)' }}>
                  Trailers
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(99,104,120,0.7)' }}>
                  Des vidéos qui donnent envie de jouer avant même d&apos;avoir lancé la map.
                  Trailers cinématiques, trailers de lancement, teasers — bientôt disponible.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-auto opacity-40">
                {['Cinematic trailers', 'Launch films', 'Teasers'].map((feat) => (
                  <span key={feat} className="tag">{feat}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Pourquoi MapX ── */}
          <motion.div
            variants={item}
            className="md:col-span-3 bento-card p-7"
            style={{
              background: 'linear-gradient(145deg, var(--surface-2) 0%, var(--surface) 100%)',
            }}
          >
            <div className="flex flex-col justify-between h-full min-h-[240px]">
              <h3 className="text-base font-bold" style={{ color: 'var(--text)' }}>
                Pourquoi MapX ?
              </h3>

              <div className="flex flex-col gap-4">
                {WHY_MAPX.map((point) => (
                  <div key={point} className="flex items-start gap-2.5">
                    <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--gold)' }} />
                    <span className="text-sm leading-snug font-medium" style={{ color: 'var(--text-soft)' }}>
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
