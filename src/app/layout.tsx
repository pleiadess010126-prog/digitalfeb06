import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/lib/auth/AuthContext'
import { OrganizationProvider } from '@/lib/db/OrganizationContext'
import { AffiliateProvider } from '@/lib/affiliate/AffiliateContext'
import ClientLayout from '@/components/ClientLayout'

export const metadata: Metadata = {
  title: {
    default: 'DigitalMEng | Autonomous Organic Marketing Engine',
    template: '%s | DigitalMEng'
  },
  description: 'Deploy an autonomous swarm of AI agents to orchestrate your global marketing. Scale authority and traffic with zero risk and military-grade brand safety.',
  keywords: ['AI Marketing', 'Marketing Automation', 'Organic Growth', 'Autonomous Agents', 'Content Generation', 'SEO Automation', 'DigitalMEng', 'Multi-tenant SaaS'],
  authors: [{ name: 'DigitalMEng Team' }],
  creator: 'DigitalMEng',
  publisher: 'DigitalMEng',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://digitalme.ng',
    siteName: 'DigitalMEng',
    title: 'DigitalMEng - Autonomous Organic Marketing Swarm',
    description: 'The world\'s first autonomous marketing swarm. Beyond generation, beyond translation. Orchestrate your entire global marketing with corporate-grade safety.',
    images: [
      {
        url: '/digitalmeng_global_promo_poster.png',
        width: 1200,
        height: 630,
        alt: 'DigitalMEng - AI Marketing Engine',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DigitalMEng - Autonomous Organic Marketing Swarm',
    description: 'Scale your marketing with an autonomous team of AI agents. Military-grade brand safety and cultural transcreation.',
    images: ['/digitalmeng_global_promo_poster.png'],
    creator: '@digitalmeng',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/favicon.ico',
    apple: '/logo.png',
  },
  alternates: {
    canonical: 'https://digitalme.ng',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <OrganizationProvider>
            <AffiliateProvider>
              <ClientLayout>
                {children}
              </ClientLayout>
            </AffiliateProvider>
          </OrganizationProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
