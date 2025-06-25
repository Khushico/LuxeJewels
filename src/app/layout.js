import './globals.css'
import { Inter, Playfair_Display } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'
import Providers from './components/Providers'
import JewelryChatWidget from './components/JewelryChatWidget'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap'
})

export const metadata = {
  title: 'LuxeJewels - Premium Jewelry Collection',
  description: 'Discover our exquisite collection of fine jewelry, including rings, necklaces, earrings, and bracelets crafted with the finest materials.',
  keywords: 'jewelry, luxury jewelry, diamond rings, gold necklaces, earrings, bracelets',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-white text-gray-900 font-sans">
        <Providers>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <JewelryChatWidget />
        </Providers>
      </body>
    </html>
  )
}