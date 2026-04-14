import { NextRequest, NextResponse } from 'next/server'
import { readSubmissions } from '@/lib/formLogger'

export async function GET(req: NextRequest) {
  // ── Auth check ───────────────────────────────────────────────
  const authHeader = req.headers.get('authorization')
  const secret     = process.env.ADMIN_SECRET

  if (!secret) {
    return NextResponse.json(
      { success: false, message: 'ADMIN_SECRET non configuré.' },
      { status: 500 },
    )
  }

  if (!authHeader || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json(
      { success: false, message: 'Non autorisé.' },
      { status: 401 },
    )
  }

  // ── Pagination ───────────────────────────────────────────────
  const { searchParams } = new URL(req.url)
  const page    = Math.max(1, parseInt(searchParams.get('page')    ?? '1',  10))
  const perPage = Math.min(100, parseInt(searchParams.get('perPage') ?? '20', 10))

  // ── Read submissions ─────────────────────────────────────────
  const all     = await readSubmissions()
  const total   = all.length
  const sorted  = [...all].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  )
  const entries = sorted.slice((page - 1) * perPage, page * perPage)

  return NextResponse.json(
    { success: true, data: { entries, total, page, perPage } },
    { status: 200 },
  )
}
