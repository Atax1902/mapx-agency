import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { logSubmission } from '@/lib/formLogger'
import { checkRateLimit } from '@/lib/rateLimit'

const schema = z.object({
  firstName:   z.string().min(2),
  lastName:    z.string().min(2),
  email:       z.string().email(),
  discord:     z.string().min(2),
  projectType: z.enum(['Fortnite UEFN', 'Roblox', 'Graphisme', 'Autre']),
  description: z.string().min(30).max(2000),
  budget:      z.string().min(1),
  deadline:    z.string().min(1),
  website:     z.string().optional(),
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

    try {
      await logSubmission({
        id:        generateId(),
        type:      'project',
        timestamp: new Date().toISOString(),
        ip,
        data,
      })
    } catch { /* filesystem read-only on Vercel */ }

    const formspreeId = process.env.FORMSPREE_PROJECT_ID
    if (formspreeId) {
      const fsRes = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `[MapX] Nouveau projet — ${data.projectType} (${data.firstName} ${data.lastName})`,
          Prénom:         data.firstName,
          Nom:            data.lastName,
          Email:          data.email,
          Discord:        data.discord,
          'Type de projet': data.projectType,
          Description:    data.description,
          Budget:         data.budget,
          Délai:          data.deadline,
        }),
      })
      if (!fsRes.ok) {
        return NextResponse.json(
          { success: false, message: 'Erreur lors de l\'envoi du formulaire. Veuillez réessayer.' },
          { status: 502 },
        )
      }
    }

    return NextResponse.json(
      {
        success: true,
        message:
          'Votre projet a bien été soumis. Notre équipe vous recontactera sous 48h via email ou Discord.',
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
