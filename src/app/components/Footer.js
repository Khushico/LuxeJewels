import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const footerLinks = {
    'Shop': [
      { name: 'All Jewelry', href: '/products' },
      { name: 'Rings', href: '/products?category=rings' },
      { name: 'Necklaces', href: '/products?category=necklaces' },
      { name: 'Earrings', href: '/products?category=earrings' },
      { name: 'Bracelets', href: '/products?category=bracelets' },
    ],
    'Customer Service': [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Size Guide', href: '/size-guide' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
      { name: 'FAQ', href: '/faq' },
    ],
    'About': [
      { name: 'Our Story', href: '/about' },
      { name: 'Craftsmanship', href: '/craftsmanship' },
      { name: 'Sustainability', href: '/sustainability' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
    ],
    'Legal': [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Accessibility', href: '/accessibility' },
    ],
  }

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'Twitter', href: '#', icon: Twitter },
  ]

  return (
    <footer className="bg-elegant-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-elegant-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="elegant-border pb-8 mb-8">
              <h3 className="text-3xl font-serif font-light mb-6 text-cream-100">
                Stay Updated with Our Latest 
                <span className="block text-champagne-300 italic">Collections</span>
              </h3>
              <p className="text-elegant-300 mb-8 font-light leading-relaxed">
                Be the first to discover new arrivals, exclusive offers, and jewelry care tips. 
                Join our community of jewelry enthusiasts.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 bg-elegant-800 border border-elegant-700 rounded-2xl focus:ring-2 focus:ring-rose-gold-400 focus:border-transparent text-white placeholder-elegant-400 font-light tracking-wide"
              />
              <button className="px-8 py-4 bg-gradient-to-r from-rose-gold-600 to-champagne-600 text-white font-medium rounded-2xl hover:from-rose-gold-700 hover:to-champagne-700 transition-all duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1 tracking-wide">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-gold-500 to-champagne-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg font-serif">G</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-serif font-bold text-white">
                  LuxeJewels
                </span>
                <span className="text-xs text-elegant-400 font-light tracking-widest uppercase">
                  Fine Jewelry
                </span>
              </div>
            </Link>
            <p className="text-elegant-300 mb-8 max-w-sm font-light leading-relaxed">
              Crafting exquisite jewelry pieces with timeless elegance and modern sophistication. 
              Each piece tells a unique story of luxury, artistry, and eternal beauty.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-elegant-300">
                <MapPin size={16} className="text-rose-gold-400" />
                <span className="text-sm font-light">123 Jewelry District, New York, NY 10001</span>
              </div>
              <div className="flex items-center gap-3 text-elegant-300">
                <Phone size={16} className="text-rose-gold-400" />
                <span className="text-sm font-light">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-elegant-300">
                <Mail size={16} className="text-rose-gold-400" />
                <span className="text-sm font-light">hello@luxe.com</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-serif text-lg text-white mb-6 tracking-wide">{category}</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-elegant-300 hover:text-champagne-300 transition-colors duration-300 text-sm font-light tracking-wide hover:translate-x-1 transform inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-elegant-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="text-elegant-400 text-sm font-light tracking-wide">
              © 2024  LuxeJewels Fine Jewelry. All rights reserved.
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-6">
              <span className="text-elegant-400 text-sm font-light tracking-wide">Follow Us</span>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 bg-elegant-800 rounded-full flex items-center justify-center text-elegant-400 hover:text-champagne-300 hover:bg-elegant-700 transition-all duration-300 hover:scale-110"
                      aria-label={social.name}
                    >
                      <Icon size={18} />
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}