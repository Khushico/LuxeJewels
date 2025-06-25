'use client'
import { useState, useContext } from 'react'
import Link from 'next/link'
import { Search, ShoppingBag, Menu, X, Heart, User } from 'lucide-react'

import { useCart } from '../context/CartContext'
import { UserContext } from '../context/UserContext'
import { useWishlist } from '../context/WishlistContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const { getCartCount } = useCart()
  const userContext = useContext(UserContext)
  const { items: wishlistItems } = useWishlist()

  const cartItemCount = getCartCount() || 0
  const user = userContext?.user || null
  const wishlistCount = wishlistItems?.length || 0

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Collections', href: '/collections' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  const handleUserIconClick = () => {
    return user ? '/profile' : '/login'
  }

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-elegant-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 lg:h-24">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-gold-500 to-champagne-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg font-serif">G</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-serif font-bold gradient-text tracking-wide">LuxeJewels</span>
                <span className="text-xs text-elegant-500 font-light tracking-widest uppercase">Fine Jewelry</span>
              </div>
            </Link>
          </div>

          <nav className="hidden lg:flex space-x-12">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="text-elegant-700 hover:text-rose-gold-600 font-medium transition-all duration-300 relative group tracking-wide text-sm uppercase">
                {item.name}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-rose-gold-600 to-champagne-600 transition-all duration-500 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-6">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-3 text-elegant-600 hover:text-rose-gold-600 transition-all duration-300 hover:bg-cream-50 rounded-full"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <Link 
              href="/wishlist"
              className="p-3 text-elegant-600 hover:text-rose-gold-600 transition-all duration-300 hover:bg-cream-50 rounded-full relative"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-rose-gold-500 to-champagne-500 text-white text-xs rounded-full flex items-center justify-center font-semibold shadow-lg">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link 
              href={handleUserIconClick()}
              className="p-3 text-elegant-600 hover:text-rose-gold-600 transition-all duration-300 hover:bg-cream-50 rounded-full relative group"
              aria-label={user ? "Profile" : "Login"}
            >
              <User size={20} />
              {user && (
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full"></span>
              )}
            </Link>

            <Link 
              href="/cart"
              className="p-3 text-elegant-600 hover:text-rose-gold-600 transition-all duration-300 hover:bg-cream-50 rounded-full relative"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-rose-gold-500 to-champagne-500 text-white text-xs rounded-full flex items-center justify-center font-semibold shadow-lg">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>

          <div className="lg:hidden flex items-center space-x-3">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-3 text-elegant-600 hover:text-rose-gold-600 transition-all duration-300 hover:bg-cream-50 rounded-full"
            >
              <Search size={20} />
            </button>
            <Link 
              href="/cart"
              className="p-3 text-elegant-600 hover:text-rose-gold-600 transition-all duration-300 hover:bg-cream-50 rounded-full relative"
            >
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-rose-gold-500 to-champagne-500 text-white text-xs rounded-full flex items-center justify-center font-semibold shadow-lg">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 text-elegant-600 hover:text-rose-gold-600 transition-all duration-300 hover:bg-cream-50 rounded-full"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="border-t border-elegant-100 pt-4 pb-4 animate-fade-in">
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-elegant-400" />
                <input
                  type="text"
                  placeholder="Search for exquisite jewelry..."
                  className="w-full pl-10 pr-10 py-3 border-2 border-elegant-200 rounded-xl focus:ring-2 focus:ring-rose-gold-300 focus:border-rose-gold-300 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  autoFocus
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-elegant-400 hover:text-elegant-600 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {isMenuOpen && (
          <div className="lg:hidden border-t border-elegant-100 py-6 animate-fade-in glass-effect">
            <nav className="space-y-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-elegant-700 hover:text-rose-gold-600 font-medium transition-all duration-300 py-3 text-center uppercase tracking-wide"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-elegant-100 pt-6 flex justify-center space-x-6">
                <Link 
                  href="/wishlist"
                  className="p-3 text-elegant-600 hover:text-rose-gold-600 transition-all duration-300 hover:bg-cream-50 rounded-full relative"
                >
                  <Heart size={20} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-rose-gold-500 to-champagne-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                <Link 
                  href={handleUserIconClick()}
                  className="p-3 text-elegant-600 hover:text-rose-gold-600 transition-all duration-300 hover:bg-cream-50 rounded-full relative"
                >
                  <User size={20} />
                  {user && (
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full"></span>
                  )}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}