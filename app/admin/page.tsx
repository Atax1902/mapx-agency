'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, ChevronDown, ChevronRight, RefreshCw, Lock } from 'lucide-react'
import type { SubmissionEntry } from '@/types'

const TYPE_LABELS: Record<string, string> = {
  'project':           'Projet',
  'recruit-dev':       'Dev',
  'recruit-designer':  'Graphiste',
}

const TYPE_COLORS: Record<string, string> = {
  'project':           'rgba(200,169,110,0.15)',
  'recruit-dev':       'rgba(99,179,237,0.15)',
  'recruit-designer':  'rgba(154,117,235,0.15)',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('fr-FR', {
    day:    '2-digit',
    month:  '2-digit',
    year:   'numeric',
    hour:   '2-digit',
    minute: '2-digit',
  })
}

function ExpandableRow({ entry }: { entry: SubmissionEntry }) {
  const [expanded, setExpanded] = useState(false)

  // Extract common fields
  const data = entry.data as unknown as Record<string, unknown>
  const name = `${data.firstName ?? ''} ${data.lastName ?? ''}`.trim()

  return (
    <>
      <tr
        className="border-b cursor-pointer transition-colors hover:bg-white/2"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        onClick={() => setExpanded(!expanded)}
      >
        <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-muted)' }}>
          {formatDate(entry.timestamp)}
        </td>
        <td className="px-4 py-3">
          <span
            className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{
              background: TYPE_COLORS[entry.type] ?? 'rgba(255,255,255,0.06)',
              color: 'var(--text)',
            }}
          >
            {TYPE_LABELS[entry.type] ?? entry.type}
          </span>
        </td>
        <td className="px-4 py-3 text-sm" style={{ color: 'var(--text)' }}>{name || '—'}</td>
        <td className="px-4 py-3 text-sm" style={{ color: 'var(--text-muted)' }}>
          {String(data.email ?? '—')}
        </td>
        <td className="px-4 py-3 text-sm" style={{ color: 'var(--text-muted)' }}>
          {String(data.discord ?? '—')}
        </td>
        <td className="px-4 py-3">
          {expanded
            ? <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
            : <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
          }
        </td>
      </tr>
      {expanded && (
        <tr style={{ background: 'rgba(255,255,255,0.015)' }}>
          <td colSpan={6} className="px-6 py-4">
            <pre
              className="text-xs overflow-x-auto rounded-2xl p-4"
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
                fontFamily: 'ui-monospace, monospace',
              }}
            >
              {JSON.stringify(entry.data, null, 2)}
            </pre>
          </td>
        </tr>
      )}
    </>
  )
}

export default function AdminPage() {
  const [secret,      setSecret]      = useState('')
  const [showSecret,  setShowSecret]  = useState(false)
  const [loading,     setLoading]     = useState(false)
  const [error,       setError]       = useState('')
  const [data,        setData]        = useState<{ entries: SubmissionEntry[]; total: number } | null>(null)

  const fetchSubmissions = async () => {
    if (!secret.trim()) {
      setError('Veuillez saisir le mot de passe admin.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/submissions', {
        headers: { Authorization: `Bearer ${secret}` },
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.message || 'Accès refusé.')
        setData(null)
      } else {
        setData(json.data)
      }
    } catch {
      setError('Impossible de joindre le serveur.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen p-6 md:p-10"
      style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-inter)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(200,169,110,0.12)', border: '1px solid rgba(200,169,110,0.2)' }}
            >
              <Lock size={14} style={{ color: 'var(--gold)' }} />
            </div>
            <h1 className="text-xl font-bold">MapX Agency — Dashboard</h1>
          </div>
          <p
            className="text-xs px-3 py-1.5 rounded-full inline-flex items-center gap-2"
            style={{ background: 'rgba(239,68,68,0.08)', color: '#f87171', border: '1px solid rgba(239,68,68,0.15)' }}
          >
            ⚠ Dashboard interne — Ne pas partager
          </p>
        </div>

        {/* Auth form */}
        {!data && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md"
          >
            <div
              className="p-6 rounded-3xl"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <h2 className="text-base font-semibold mb-5" style={{ color: 'var(--text)' }}>
                Authentification
              </h2>

              <div className="flex flex-col gap-4">
                <div className="relative">
                  <label className="form-label">Mot de passe admin</label>
                  <div className="relative">
                    <input
                      type={showSecret ? 'text' : 'password'}
                      value={secret}
                      onChange={(e) => setSecret(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && fetchSubmissions()}
                      placeholder="ADMIN_SECRET"
                      className="form-input pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSecret(!showSecret)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {showSecret ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-xs"
                      style={{ color: '#f87171' }}
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <button
                  onClick={fetchSubmissions}
                  disabled={loading}
                  className="px-5 py-3 text-sm font-semibold rounded-2xl transition-all disabled:opacity-50"
                  style={{ background: 'var(--gold)', color: '#0A0A0A' }}
                >
                  {loading ? 'Chargement...' : 'Accéder au dashboard'}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Dashboard */}
        {data && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Stats bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div
                  className="px-4 py-2 rounded-2xl text-sm"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <span style={{ color: 'var(--text-muted)' }}>Total: </span>
                  <span className="font-semibold" style={{ color: 'var(--gold)' }}>{data.total}</span>
                  <span style={{ color: 'var(--text-muted)' }}> soumissions</span>
                </div>
              </div>

              <button
                onClick={fetchSubmissions}
                className="flex items-center gap-2 px-4 py-2 text-sm rounded-2xl transition-colors"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                }}
              >
                <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
                Actualiser
              </button>
            </div>

            {data.entries.length === 0 ? (
              <div
                className="p-12 rounded-3xl text-center"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <p style={{ color: 'var(--text-muted)' }}>Aucune soumission pour le moment.</p>
              </div>
            ) : (
              <div
                className="rounded-3xl overflow-hidden"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr
                        className="border-b text-left"
                        style={{ borderColor: 'var(--border)', background: 'var(--surface-2)' }}
                      >
                        {['Date', 'Type', 'Nom', 'Email', 'Discord', ''].map((h) => (
                          <th
                            key={h}
                            className="px-4 py-3 text-xs font-medium"
                            style={{ color: 'var(--text-muted)' }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.entries.map((entry) => (
                        <ExpandableRow key={entry.id} entry={entry} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
