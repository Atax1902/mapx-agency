import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mentions Légales — MapX Agency',
  description: 'Mentions légales de MapX Agency — informations juridiques, hébergeur et contact.',
}

const SECTIONS = [
  {
    title: 'Éditeur du site',
    rows: [
      ['Nom commercial',     'MapX Agency'],
      ['Statut juridique',   'Micro-entreprise'],
      ['Siège social',       'France, Var — 83000'],
      ['Numéro SIRET',       '989 245 022 00011'],
      ['Email de contact',   'mapx.studio@outlook.fr'],
    ],
  },
  {
    title: 'Hébergement',
    rows: [
      ['Hébergeur', 'OVH SAS'],
      ['Siège social', '2 rue Kellermann — 59100 Roubaix, France'],
      ['Site web', 'www.ovh.com'],
    ],
  },
  {
    title: 'Propriété intellectuelle',
    text: "L'ensemble des contenus présents sur ce site (textes, images, visuels, logos, vidéos) sont la propriété exclusive de MapX Agency, sauf mentions contraires. Toute reproduction, diffusion ou utilisation sans autorisation écrite préalable est strictement interdite.",
  },
  {
    title: 'Données personnelles',
    text: "Les informations collectées via les formulaires de contact sont utilisées uniquement pour répondre aux demandes des utilisateurs. Elles ne sont ni vendues, ni transmises à des tiers. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données en contactant mapx.studio@outlook.fr.",
  },
  {
    title: 'Cookies',
    text: "Ce site utilise uniquement des cookies techniques nécessaires à son bon fonctionnement. Aucun cookie publicitaire ou de tracking tiers n'est déposé.",
  },
  {
    title: 'Responsabilité',
    text: "MapX Agency s'efforce d'assurer l'exactitude des informations publiées sur ce site. Toutefois, nous ne saurions être tenus responsables des erreurs, omissions ou résultats obtenus par une mauvaise utilisation de ces informations.",
  },
]

export default function MentionsLegales() {
  return (
    <main
      className="min-h-screen py-24 md:py-32 px-6"
      style={{ background: 'var(--bg)' }}
    >
      <div className="max-w-3xl mx-auto">

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm mb-12 transition-colors duration-200"
          style={{ color: 'var(--text-muted)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          Retour
        </Link>

        {/* Heading */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--gold)' }}>
            Avis Juridique
          </p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4" style={{ color: 'var(--text)' }}>
            Mentions Légales
          </h1>
          <div
            className="h-px w-16"
            style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }}
          />
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-10">
          {SECTIONS.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl p-6 md:p-8"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
              }}
            >
              <h2
                className="text-base font-bold mb-5 pb-4"
                style={{
                  color: 'var(--text)',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                {section.title}
              </h2>

              {section.rows && (
                <dl className="flex flex-col gap-3">
                  {section.rows.map(([key, value]) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:gap-8">
                      <dt
                        className="text-xs font-semibold uppercase tracking-wider sm:w-44 flex-shrink-0 mb-0.5 sm:mb-0"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {key}
                      </dt>
                      <dd className="text-sm font-medium" style={{ color: 'var(--text-soft)' }}>
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              {section.text && (
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-soft)' }}>
                  {section.text}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-xs text-center mt-12" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
          Dernière mise à jour : avril 2026
        </p>
      </div>
    </main>
  )
}
