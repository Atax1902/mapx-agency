'use client'

import { motion } from 'framer-motion'
import { MessageCircle, FileText, Wrench, Rocket } from 'lucide-react'

const STEPS = [
  {
    number: '01',
    title: 'Prise de contact',
    description: 'Échangez avec nous via Discord ou notre formulaire. Nous discutons de votre vision, vos objectifs et votre audience cible.',
    icon: MessageCircle,
  },
  {
    number: '02',
    title: 'Cahier des charges',
    description: 'Nous formalisons ensemble le scope du projet, la timeline détaillée et le devis. Aucune surprise.',
    icon: FileText,
  },
  {
    number: '03',
    title: 'Production',
    description: "Notre équipe développe votre projet de façon itérative avec des points réguliers pour que vous soyez toujours dans la boucle.",
    icon: Wrench,
  },
  {
    number: '04',
    title: 'Livraison',
    description: 'Tests rigoureux, validation finale, publication et support post-lancement. Votre projet est entre de bonnes mains.',
    icon: Rocket,
  },
]

const ease = [0.16, 1, 0.3, 1] as const

export function Method() {
  return (
    <section id="methode" className="py-24 md:py-32 relative">
      {/* Left ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 55% at -5% 55%, rgba(200,169,110,0.05) 0%, transparent 55%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 35% 35% at 105% 80%, rgba(200,169,110,0.025) 0%, transparent 50%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.h2
            className="section-heading mb-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease }}
          >
            Notre Méthode
          </motion.h2>
          <motion.p
            className="section-subheading max-w-xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5, ease }}
          >
            Un processus éprouvé, pensé pour la clarté et la performance.
          </motion.p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 44, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: index * 0.1, duration: 0.65, ease }}
                className="bento-card p-7 flex flex-col gap-5 group gold-border-gradient"
              >
                {/* Top: step number + icon */}
                <div className="flex items-center justify-between">
                  <motion.span
                    className="text-5xl font-black leading-none select-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(200,169,110,0.3), rgba(200,169,110,0.08))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      display: 'inline-block',
                    }}
                    animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.6 }}
                  >
                    {step.number}
                  </motion.span>

                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-2xl transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: 'rgba(200,169,110,0.08)',
                      border: '1px solid rgba(200,169,110,0.15)',
                    }}
                  >
                    <Icon size={18} style={{ color: 'var(--gold)' }} />
                  </div>
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text)' }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {step.description}
                  </p>
                </div>

                {/* Bottom indicator line */}
                <div
                  className="h-px mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }}
                />
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-14 flex justify-center"
        >
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-2xl"
            style={{ background: 'var(--gold)', color: '#07080F' }}
          >
            Démarrer votre projet
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
