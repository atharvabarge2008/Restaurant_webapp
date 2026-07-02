import './globals.css'
import { Playfair_Display, Cormorant_Garamond, Inter, Noto_Serif_SC } from 'next/font/google'
import { Providers } from './providers'
import Navbar from '@/components/site/Navbar'
import Footer from '@/components/site/Footer'
import SmoothScroll from '@/components/site/SmoothScroll'
import { Toaster } from 'sonner'

const display = Playfair_Display({ subsets: ['latin'], weight: ['500','600','700','800','900'], variable: '--font-display', display: 'swap' })
const serif = Cormorant_Garamond({ subsets: ['latin'], weight: ['400','500','600','700'], variable: '--font-serif', display: 'swap' })
const sans = Inter({ subsets: ['latin'], weight: ['300','400','500','600','700'], variable: '--font-sans', display: 'swap' })
const chinese = Noto_Serif_SC({ subsets: ['latin'], weight: ['400','700','900'], variable: '--font-chinese', display: 'swap' })

export const metadata = {
  title: 'Golden Dragon 金龙轩 — Modern Chinese Fine Dining',
  description: 'Golden Dragon is an award-winning modern Chinese fine dining restaurant offering authentic Cantonese, Sichuan and Peking cuisine crafted by master chefs. Reserve your table today.',
  keywords: ['chinese restaurant', 'fine dining', 'peking duck', 'dim sum', 'sichuan', 'cantonese', 'best chinese food', 'golden dragon'],
  openGraph: {
    title: 'Golden Dragon 金龙轩 — Modern Chinese Fine Dining',
    description: 'Authentic Chinese fine dining. Peking duck, dim sum, hand-pulled noodles & signature hot pot.',
    type: 'website'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${sans.variable} ${chinese.variable} dark`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
      </head>
      <body className="bg-brand-ink text-brand-cream antialiased overflow-x-hidden">
        <Providers>
          <SmoothScroll />
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
          <Toaster theme="dark" position="top-center" toastOptions={{ style: { background: '#111', color: '#FFD700', border: '1px solid rgba(255,215,0,0.3)' } }} />
        </Providers>
      </body>
    </html>
  )
}
