'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const SOFTWARE_OPTIONS = [
  'Photoshop',
  'After Effects',
  'Blender',
  'Cinema 4D',
  'Illustrator',
  'Figma',
  'Autre',
]

const schema = z.object({
  firstName:    z.string().min(2, 'Prénom requis'),
  lastName:     z.string().min(2, 'Nom requis'),
  email:        z.string().email('Email invalide'),
  discord:      z.string().min(2, 'Discord requis'),
  software:     z.array(z.string()).min(1, 'Sélectionnez au moins un logiciel'),
  portfolioUrl: z
    .string()
    .url('URL invalide (ex: https://monportfolio.com)')
    .or(z.literal('')),
  message:      z.string().min(30, 'Message requis (min. 30 caractères)').max(3000),
  website:      z.string().optional(), // honeypot
})

type FormData = z.infer<typeof schema>

export function DesignerRecruitForm() {
  const [status,   setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { software: [] },
  })

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const res  = await fetch('/api/recruit-designer', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) {
        setErrorMsg(json.message || 'Une erreur est survenue.')
        setStatus('error')
      } else {
        setStatus('success')
        reset()
      }
    } catch {
      setErrorMsg('Impossible de joindre le serveur. Réessayez.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4 py-12 text-center"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(200,169,110,0.12)', border: '1px solid rgba(200,169,110,0.25)' }}
        >
          <CheckCircle2 size={28} style={{ color: 'var(--gold)' }} />
        </div>
        <h4 className="text-lg font-bold" style={{ color: 'var(--text)' }}>
          Candidature envoyée !
        </h4>
        <p className="text-sm max-w-sm" style={{ color: 'var(--text-muted)' }}>
          Merci pour votre candidature ! Nous reviendrons vers vous rapidement.
        </p>
        <Button variant="ghost" size="sm" onClick={() => setStatus('idle')}>
          Envoyer une autre candidature
        </Button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {/* Honeypot */}
      <input type="text" tabIndex={-1} aria-hidden="true" className="hidden" {...register('website')} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Prénom *</label>
          <input {...register('firstName')} placeholder="Jean" className="form-input" />
          {errors.firstName && <p className="form-error">{errors.firstName.message}</p>}
        </div>
        <div>
          <label className="form-label">Nom *</label>
          <input {...register('lastName')} placeholder="Dupont" className="form-input" />
          {errors.lastName && <p className="form-error">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Email *</label>
          <input {...register('email')} type="email" placeholder="jean@example.com" className="form-input" />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>
        <div>
          <label className="form-label">Discord *</label>
          <input {...register('discord')} placeholder="votrepseudo" className="form-input" />
          {errors.discord && <p className="form-error">{errors.discord.message}</p>}
        </div>
      </div>

      {/* Software checkboxes */}
      <div>
        <label className="form-label">Logiciels maîtrisés *</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1">
          {SOFTWARE_OPTIONS.map((sw) => (
            <label
              key={sw}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-colors"
              style={{
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
              }}
            >
              <input
                type="checkbox"
                value={sw}
                {...register('software')}
                className="accent-gold-DEFAULT w-3.5 h-3.5 flex-shrink-0"
                style={{ accentColor: 'var(--gold)' }}
              />
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{sw}</span>
            </label>
          ))}
        </div>
        {errors.software && <p className="form-error">{errors.software.message}</p>}
      </div>

      <div>
        <label className="form-label">Portfolio URL</label>
        <input
          {...register('portfolioUrl')}
          type="url"
          placeholder="https://monportfolio.com"
          className="form-input"
        />
        {errors.portfolioUrl && <p className="form-error">{errors.portfolioUrl.message}</p>}
      </div>

      <div>
        <label className="form-label">Message de motivation *</label>
        <textarea
          {...register('message')}
          placeholder="Parlez-nous de votre style graphique, de vos créations, de pourquoi vous aimeriez rejoindre MapX..."
          rows={5}
          className="form-input resize-none"
        />
        {errors.message && <p className="form-error">{errors.message.message}</p>}
      </div>

      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm"
            style={{
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.2)',
              color: '#f87171',
            }}
          >
            <AlertCircle size={16} className="flex-shrink-0" />
            {errorMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={status === 'loading'}
        className="w-full sm:w-auto self-start"
      >
        Envoyer ma candidature
      </Button>
    </form>
  )
}
