'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const schema = z.object({
  firstName:   z.string().min(2, 'Prénom requis (min. 2 caractères)'),
  lastName:    z.string().min(2, 'Nom requis (min. 2 caractères)'),
  email:       z.string().email('Adresse email invalide'),
  discord:     z.string().min(2, 'Discord requis').regex(/^.{3,32}#[0-9]{4}$|^.{3,32}$/, 'Pseudo Discord invalide'),
  projectType: z.enum(['Fortnite UEFN', 'Roblox', 'Graphisme', 'Autre']),
  description: z.string().min(30, 'Description requise (min. 30 caractères)').max(2000),
  budget:      z.string().min(1, 'Veuillez sélectionner un budget'),
  deadline:    z.string().min(1, 'Veuillez sélectionner un délai'),
  website:     z.string().optional(), // honeypot
})

type FormData = z.infer<typeof schema>

export function ProjectForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/submit-project', {
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
          Projet soumis avec succès !
        </h4>
        <p className="text-sm max-w-sm" style={{ color: 'var(--text-muted)' }}>
          Nous avons bien reçu votre demande. Notre équipe vous recontactera sous 48h via email ou Discord.
        </p>
        <Button variant="ghost" size="sm" onClick={() => setStatus('idle')}>
          Soumettre un autre projet
        </Button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {/* Honeypot — hidden from real users */}
      <input
        type="text"
        tabIndex={-1}
        aria-hidden="true"
        className="hidden"
        {...register('website')}
      />

      {/* Row: First + Last name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Prénom *</label>
          <input
            {...register('firstName')}
            placeholder="Jean"
            className="form-input"
          />
          {errors.firstName && <p className="form-error">{errors.firstName.message}</p>}
        </div>
        <div>
          <label className="form-label">Nom *</label>
          <input
            {...register('lastName')}
            placeholder="Dupont"
            className="form-input"
          />
          {errors.lastName && <p className="form-error">{errors.lastName.message}</p>}
        </div>
      </div>

      {/* Row: Email + Discord */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Email *</label>
          <input
            {...register('email')}
            type="email"
            placeholder="jean@example.com"
            className="form-input"
          />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>
        <div>
          <label className="form-label">Discord *</label>
          <input
            {...register('discord')}
            placeholder="votrepseudo"
            className="form-input"
          />
          {errors.discord && <p className="form-error">{errors.discord.message}</p>}
        </div>
      </div>

      {/* Project type */}
      <div>
        <label className="form-label">Type de projet *</label>
        <select {...register('projectType')} className="form-input">
          <option value="">Choisir une option</option>
          <option value="Fortnite UEFN">Fortnite UEFN</option>
          <option value="Roblox">Roblox</option>
          <option value="Graphisme">Graphisme</option>
          <option value="Autre">Autre</option>
        </select>
        {errors.projectType && <p className="form-error">{errors.projectType.message}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="form-label">Description du projet *</label>
        <textarea
          {...register('description')}
          placeholder="Décrivez votre projet, vos objectifs, votre audience cible..."
          rows={4}
          className="form-input resize-none"
        />
        {errors.description && <p className="form-error">{errors.description.message}</p>}
      </div>

      {/* Row: Budget + Deadline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Budget estimé *</label>
          <select {...register('budget')} className="form-input">
            <option value="">Choisir une option</option>
            <option value="< 1 000€">Moins de 1 000€</option>
            <option value="1 000€ – 3 000€">1 000€ – 3 000€</option>
            <option value="3 000€ – 7 000€">3 000€ – 7 000€</option>
            <option value="7 000€ – 15 000€">7 000€ – 15 000€</option>
            <option value="> 15 000€">Plus de 15 000€</option>
            <option value="À discuter">À discuter</option>
          </select>
          {errors.budget && <p className="form-error">{errors.budget.message}</p>}
        </div>
        <div>
          <label className="form-label">Délai souhaité *</label>
          <select {...register('deadline')} className="form-input">
            <option value="">Choisir une option</option>
            <option value="< 2 semaines">Moins de 2 semaines</option>
            <option value="2 – 4 semaines">2 – 4 semaines</option>
            <option value="1 – 2 mois">1 – 2 mois</option>
            <option value="3+ mois">3 mois ou plus</option>
            <option value="Flexible">Flexible</option>
          </select>
          {errors.deadline && <p className="form-error">{errors.deadline.message}</p>}
        </div>
      </div>

      {/* Error message */}
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
        Soumettre le projet
      </Button>
    </form>
  )
}
