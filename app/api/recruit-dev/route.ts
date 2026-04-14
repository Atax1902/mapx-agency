import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { logSubmission } from '@/lib/formLogger'
import { checkRateLimit } from '@/lib/rateLimit'

const schema = z.object({
  firstName:    z.string().min(2),
  lastName:     z.string().min(2),
  email:        z.string().email(),
  discord:      z.string().min(2),
  specialty:    z.enum(['Fortnite UEFN', 'Roblox', 'Les deux']),
  experience:   z.string().min(1),
  portfolioUrl: z.string().url().or(z.literal('')),
  motivation:   z.string().min(50).max(3000),
  website:      z.string().optional(),
})

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    '0.0.0.0'
  )
}

function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (body.website && body.website.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Requête invalide.' },
        { status: 400 },
      )
    }

    const ip = getClientIp(req)
    if (!checkRateLimit(ip, 3, 60 * 60 * 1000)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Trop de requêtes. Veuillez réessayer dans une heure.',
        },
        { status: 429 },
      )
    }

    const result = schema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Données invalides. Veuillez vérifier le formulaire.',
          errors:  result.error.flatten().fieldErrors,
        },
        { status: 422 },
      )
    }

    const { website: _honeypot, ...data } = result.data

    await logSubmission({
      id:        generateId(),
      type:      'recruit-dev',
      timestamp: new Date().toISOString(),
      ip,
      data,
    })

    const formspreeId = process.env.FORMSPREE_DEV_ID
    if (formspreeId) {
      const fsRes = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `[MapX] Candidature Développeur — ${data.firstName} ${data.lastName}`,
          Prénom:       data.firstName,
          Nom:          data.lastName,
          Email:        data.email,
          Discord:      data.discord,
          Spécialité:   data.specialty,
          Expérience:   data.experience,
          Portfolio:    data.portfolioUrl || '—',
          Motivation:   data.motivation,
        }),
      })
      if (!fsRes.ok) {
        return NextResponse.json(
          { success: false, message: 'Erreur lors de l\'envoi. Veuillez réessayer.' },
          { status: 502 },
        )
      }
    }

    return NextResponse.json(
      {
        success: true,
        message:
          'Votre candidature développeur a bien été reçue. Nous examinerons votre profil et vous contacterons sous quelques jours.',
      },
      { status: 200 },
    )
  } catch {
    return NextResponse.json(
      { success: false, message: 'Erreur interne. Veuillez réessayer.' },
      { status: 500 },
    )
  }
}
