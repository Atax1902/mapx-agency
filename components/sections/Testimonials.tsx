'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import type { Testimonial } from '@/types'

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Cocoo',
    role: 'Client MapX',
    initials: 'CO',
    rating: 5,
    quote:
      "Très bon service, map effectuée en moins de 24h. Ils ont répondu à toutes mes attentes et un SAV qualitatif et rapide, merci à l'équipe !",
  },
  {
    id: 'testimonial-2',
    name: 'Tufing',
    role: 'Client MapX',
    initials: 'TU',
    rating: 5,
    quote:
      "Énorme merci à l'équipe MapX ! On a bien compris ce que je voulais et on l'a bien refait, franchement c'est propre.",
  },
  {
    id: 'testimonial-3',
    name: 'Giadjaa',
    role: 'Client MapX',
    initials: 'GI',
    rating: 5,
    quote:
      "Énorme merci à l'équipe MapX ! J'avais demandé 3 maisons pour ma map Party Royale et le rendu est nickel, exactement ce que je voulais. Travail propre, bien pensé, et surtout super rapide. Rien à dire, ça fait plaisir de bosser avec des gens sérieux et efficaces. Je repasserai sûrement 🔥",
  },
  {
    id: 'testimonial-4',
    name: 'Soldastrike',
    role: 'Client MapX',
    initials: 'SO',
    rating: 5,
    quote:
      "Je recommande vivement leurs services : je suis pleinement satisfait du résultat, qui correspond parfaitement à mes attentes. 🙏",
  },
]

const STAR_POSITIONS = [1, 2, 3, 4, 5]

function StarRating({ count }: Readonly<{ count: number }>) {
  return (
    <div className="flex items-center gap-0.5">
      {STAR_POSITIONS.map((pos) => (
        <Star
          key={pos}
          size={12}
          fill={pos <= count ? 'var(--gold)' : 'none'}
          stroke={pos <= count ? 'var(--gold)' : 'var(--text-muted)'}
          strokeWidth={1.5}
        />
      ))}
    </div>
  )
}

const ease = [0.16, 1, 0.3, 1] as const

export function Testimonials() {
  return (
    <section
      id="avis"
      className="py-24 md:py-32 relative section-alt"
    >
      {/* Ambient glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 45% at 10% 50%, rgba(200,169,110,0.04) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 40% 35% at 95% 20%, rgba(200,169,110,0.03) 0%, transparent 55%)',
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
            Ils nous font confiance
          </motion.h2>
          <motion.p
            className="section-subheading max-w-xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5, ease }}
          >
            Ce que nos clients disent de leur expérience avec MapX Agency.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 44, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: index * 0.1, duration: 0.65, ease }}
              className="bento-card p-6 flex flex-col gap-4 group gold-border-gradient"
            >
              {/* Quote mark */}
              <div
                className="flex items-center justify-between"
              >
                <StarRating count={t.rating} />
                <motion.svg
                  width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"
                  animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.6 }}
                >
                  <path
                    d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zm14 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
                    fill="rgba(200,169,110,0.12)"
                  />
                </motion.svg>
              </div>

              {/* Quote text */}
              <blockquote
                className="text-sm leading-relaxed flex-grow"
                style={{ color: 'var(--text-soft)' }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div
                className="flex items-center gap-3 pt-4 border-t"
                style={{ borderColor: 'var(--border)' }}
              >
                {t.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      background: 'rgba(200,169,110,0.1)',
                      border: '1px solid rgba(200,169,110,0.2)',
                      color: 'var(--gold)',
                    }}
                  >
                    {t.initials}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold leading-tight" style={{ color: 'var(--text)' }}>
                    {t.name}
                  </p>
                  <p className="text-xs leading-tight mt-0.5" style={{ color: 'var(--text-muted)' }}>
                    {t.role}{t.company ? ` · ${t.company}` : ''}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
