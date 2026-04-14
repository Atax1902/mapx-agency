'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Users, Palette } from 'lucide-react'
import { ProjectForm } from '@/components/forms/ProjectForm'
import { DevRecruitForm } from '@/components/forms/DevRecruitForm'
import { DesignerRecruitForm } from '@/components/forms/DesignerRecruitForm'

const TABS = [
  {
    id:           'project',
    label:        'Soumettre un projet',
    shortLabel:   'Projet',
    icon:         Send,
    description:  'Vous avez un projet en tête ? Décrivez-le nous et nous reviendrons vers vous rapidement.',
  },
  {
    id:           'dev',
    label:        'Rejoindre — Développeur',
    shortLabel:   'Développeur',
    icon:         Users,
    description:  'Vous êtes développeur UEFN ou Roblox et souhaitez rejoindre notre équipe ?',
  },
  {
    id:           'designer',
    label:        'Rejoindre — Graphiste',
    shortLabel:   'Graphiste',
    icon:         Palette,
    description:  'Vous êtes graphiste et voulez contribuer aux meilleurs projets gaming du marché ?',
  },
] as const

type TabId = typeof TABS[number]['id']

const ease = [0.16, 1, 0.3, 1] as const

export function ContactForms() {
  const [activeTab, setActiveTab] = useState<TabId>('project')

  const activeTabData = TABS.find((t) => t.id === activeTab)!

  return (
    <section
      id="contact"
      className="py-24 md:py-32 relative section-alt"
    >
      {/* Ambient glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 50% at 50% 105%, rgba(200,169,110,0.055) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 40% 40% at 5% 30%, rgba(200,169,110,0.03) 0%, transparent 55%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <motion.h2
            className="section-heading mb-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease }}
          >
            Travaillons ensemble
          </motion.h2>
          <motion.p
            className="section-subheading max-w-xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5, ease }}
          >
            Un projet, une candidature — nous sommes à votre écoute.
          </motion.p>
        </div>

        {/* Tab selector */}
        <div
          className="flex gap-1.5 p-1.5 rounded-3xl mb-6"
          style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
        >
          {TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-medium transition-colors duration-200"
                style={{ color: isActive ? 'var(--text)' : 'var(--text-muted)' }}
              >
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
                    }}
                    transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon size={14} style={isActive ? { color: 'var(--gold)' } : undefined} />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.shortLabel}</span>
                </span>
              </button>
            )
          })}
        </div>

        {/* Form panel */}
        <div
          className="rounded-3xl p-6 md:p-8"
          style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.025)',
          }}
        >
          {/* Tab description row */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-1.5">
              {(() => {
                const Icon = activeTabData.icon
                return (
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(200,169,110,0.08)', border: '1px solid rgba(200,169,110,0.15)' }}
                  >
                    <Icon size={15} style={{ color: 'var(--gold)' }} />
                  </div>
                )
              })()}
              <h3 className="text-base font-semibold" style={{ color: 'var(--text)' }}>
                {activeTabData.label}
              </h3>
            </div>
            <p className="text-sm pl-11" style={{ color: 'var(--text-muted)' }}>
              {activeTabData.description}
            </p>
          </div>

          <div
            className="h-px mb-8"
            style={{ background: 'var(--border)' }}
          />

          {/* Animated form switcher */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              {activeTab === 'project'  && <ProjectForm />}
              {activeTab === 'dev'      && <DevRecruitForm />}
              {activeTab === 'designer' && <DesignerRecruitForm />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Discord CTA */}
        <div
          className="mt-6 flex items-center justify-center gap-2 text-sm"
          style={{ color: 'var(--text-muted)' }}
        >
          <span>Vous préférez le contact direct ?</span>
          <a
            href="https://discord.gg/5Wf2FD982q"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold transition-opacity hover:opacity-80"
            style={{ color: 'var(--gold)' }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
            </svg>
            Rejoindre notre Discord
          </a>
        </div>
      </div>
    </section>
  )
}
