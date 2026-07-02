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
  title: 'ShindeShahi Chinese Resto — Satara\'s Favourite Indo-Chinese Since 2015',
  description: 'ShindeShahi Chinese Resto in Guruwar Peth, Satara. Home of the legendary Chicken Dinosaur Rice, Chicken Lollipop, Manchow Soup and ShindeShahi Special Noodles. 4.5★ on Google · 855+ reviews · Order on Zomato & Swiggy.',
  keywords: ['ShindeShahi', 'chinese restaurant satara', 'indo-chinese satara', 'chicken lollipop satara', 'best chinese food satara', 'guruwar peth restaurant', 'shindeshahi chinese resto', 'manchow soup satara', 'chinese dinosaur rice', 'शिंदेशाही'],
  openGraph: {
    title: 'ShindeShahi Chinese Resto — Taste That Wins Hearts',
    description: 'Satara\'s most-loved Indo-Chinese kitchen. Legendary Chicken Dinosaur Rice, Manchurian, Momos and more. Order online on Zomato & Swiggy.',
    type: 'website',
    locale: 'en_IN'
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
