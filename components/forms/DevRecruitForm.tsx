'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const schema = z.object({
  firstName:   z.string().min(2, 'Prénom requis'),
  lastName:    z.string().min(2, 'Nom requis'),
  email:       z.string().email('Email invalide'),
  discord:     z.string().min(2, 'Discord requis'),
  specialty:   z.enum(['Fortnite UEFN', 'Roblox', 'Les deux']),
  experience:  z.string().min(1, 'Requis'),
  portfolioUrl: z
    .string()
    .url('URL invalide (ex: https://monportfolio.com)')
    .or(z.literal('')),
  motivation:  z.string().min(50, 'Message requis (min. 50 caractères)').max(3000),
  website:     z.string().optional(), // honeypot
})

type FormData = z.infer<typeof schema>

export function DevRecruitForm() {
  const [status,   setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const res  = await fetch('/api/recruit-dev', {
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
          Merci pour votre intérêt ! Nous examinerons votre profil et reviendrons vers vous sous quelques jours.
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Spécialité *</label>
          <select {...register('specialty')} className="form-input">
            <option value="">Choisir une option</option>
            <option value="Fortnite UEFN">Fortnite UEFN</option>
            <option value="Roblox">Roblox</option>
            <option value="Les deux">Les deux</option>
          </select>
          {errors.specialty && <p className="form-error">{errors.specialty.message}</p>}
        </div>
        <div>
          <label className="form-label">{"Années d'expérience *"}</label>
          <select {...register('experience')} className="form-input">
            <option value="">Choisir une option</option>
            <option value="< 1 an">{"Moins d'1 an"}</option>
            <option value="1 – 2 ans">1 – 2 ans</option>
            <option value="2 – 4 ans">2 – 4 ans</option>
            <option value="4+ ans">4 ans et plus</option>
          </select>
          {errors.experience && <p className="form-error">{errors.experience.message}</p>}
        </div>
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
          {...register('motivation')}
          placeholder="Parlez-nous de vous, de vos projets, de pourquoi vous voulez rejoindre MapX..."
          rows={5}
          className="form-input resize-none"
        />
        {errors.motivation && <p className="form-error">{errors.motivation.message}</p>}
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
