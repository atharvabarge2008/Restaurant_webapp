import './globals.css'
import { Playfair_Display, Cormorant_Garamond, Inter, Noto_Serif_SC } from 'next/font/google'
import { Providers } from './providers'
import Navbar from '@/components/site/Navbar'
import Footer from '@/components/site/Footer'
import SmoothScroll from '@/components/site/SmoothScroll'
import FloatingButtons from '@/components/site/FloatingButtons'
import LoadingScreen from '@/components/premium/LoadingScreen'
import SchemaMarkup from '@/components/site/SchemaMarkup'
import { Toaster } from 'sonner'

const display = Playfair_Display({ subsets: ['latin'], weight: ['500','600','700','800','900'], variable: '--font-display', display: 'swap', preload: true })
const serif = Cormorant_Garamond({ subsets: ['latin'], weight: ['400','500','600','700'], variable: '--font-serif', display: 'swap', preload: false })
const sans = Inter({ subsets: ['latin'], weight: ['300','400','500','600','700'], variable: '--font-sans', display: 'swap', preload: true })
const chinese = Noto_Serif_SC({ subsets: ['latin'], weight: ['400','700','900'], variable: '--font-chinese', display: 'swap', preload: false })

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://shindesh.example.com'

export const metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'Shindesh Chinese Resto — Satara\'s Favourite Indo-Chinese Since 2015',
    template: '%s · Shindesh Chinese Resto'
  },
  description: 'Shindesh Chinese Resto in Guruwar Peth, Satara. Home of the legendary Chicken Dinosaur Rice, Chicken Lollipop, Manchow Soup and Shindeshahi Special Noodles. 4.5\u2605 on Google · 855+ reviews · Order on Zomato & Swiggy.',
  keywords: ['Shindeshahi', 'chinese restaurant satara', 'indo-chinese satara', 'chicken lollipop satara', 'best chinese food satara', 'guruwar peth restaurant', 'shindeshahi chinese restro', 'manchow soup satara', 'chicken dinosaur rice', 'शिंदेशाही'],
  authors: [{ name: 'Shindesh Chinese Resto' }],
  creator: 'Shindesh Chinese Resto',
  publisher: 'Shindesh Chinese Resto',
  alternates: { canonical: '/' },
  formatDetection: { email: false, address: false, telephone: false },
  category: 'restaurant',
  openGraph: {
    type: 'website', locale: 'en_IN', url: BASE, siteName: 'Shindeshahi Chinese Restro',
    title: 'Shindeshahi Chinese Restro — Taste That Wins Hearts',
    description: 'Satara\'s most-loved Indo-Chinese kitchen. Legendary Chicken Dinosaur Rice, Manchurian, Momos & more.',
    images: [{ url: 'https://images.unsplash.com/photo-1603496987351-f84a3ba5ec85?auto=format&fit=crop&w=1200&q=85', width: 1200, height: 630, alt: 'Shindeshahi Chinese Restro' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shindeshahi Chinese Restro — Taste That Wins Hearts',
    description: 'Satara\'s most-loved Indo-Chinese kitchen. Order on Zomato & Swiggy.',
    images: ['https://images.unsplash.com/photo-1603496987351-f84a3ba5ec85?auto=format&fit=crop&w=1200&q=85']
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 }
  },
  icons: {
    icon: [{ url: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'48\' fill=\'%23B71C1C\'/%3E%3Ctext x=\'50\' y=\'70\' font-size=\'62\' text-anchor=\'middle\' font-family=\'serif\' font-weight=\'900\' fill=\'%23FFD700\'%3E王%3C/text%3E%3C/svg%3E' }]
  },
  verification: {}
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#B71C1C' },
    { media: '(prefers-color-scheme: dark)', color: '#111111' }
  ],
  colorScheme: 'dark',
  width: 'device-width', initialScale: 1, viewportFit: 'cover'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${serif.variable} ${sans.variable} ${chinese.variable} dark`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com"/>
        <link rel="preconnect" href="https://images.pexels.com"/>
        <link rel="dns-prefetch" href="https://images.unsplash.com"/>
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
        <SchemaMarkup />
      </head>
      <body className="bg-brand-ink text-brand-cream antialiased overflow-x-hidden">
        {/* Skip to content — a11y */}
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Providers>
          <LoadingScreen />
          <SmoothScroll />
          <Navbar />
          <main id="main-content" className="relative">{children}</main>
          <Footer />
          <FloatingButtons />
          <Toaster theme="dark" position="top-center" toastOptions={{ style: { background: '#111', color: '#FFD700', border: '1px solid rgba(255,215,0,0.3)' } }} />
        </Providers>
      </body>
    </html>
  )
}
