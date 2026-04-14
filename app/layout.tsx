import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { MoonLoader } from '@/components/ui/MoonLoader'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MapX Agency | Fortnite UEFN & Roblox Premium Studio',
  description:
    'MapX Agency — Agence spécialisée dans la création UGC sur Fortnite et Roblox pour les marques et créateurs. Expertise, créativité, résultats.',
  keywords: [
    'MapX Agency', 'Fortnite UEFN', 'Roblox', 'création de maps',
    'studio gaming', 'UGC agency', 'expériences Roblox', 'maps personnalisées', 'brand activation',
  ],
  authors: [{ name: 'MapX Agency' }],
  openGraph: {
    title: 'MapX Agency | Fortnite UEFN & Roblox Premium Studio',
    description: 'Studio premium spécialisé en création de Maps Fortnite UEFN et Expériences Roblox.',
    type: 'website',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon-white.png" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/favicon-dark.png"  media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/favicon-white.png" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          <MoonLoader />
          {children}
        </Providers>
      </body>
    </html>
  )
}
