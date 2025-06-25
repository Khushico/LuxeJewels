'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag, Star, Trash2, ArrowRight, Grid, List } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import WishlistHeartButton from '../components/WishlistHeartButton'

export default function WishlistPage() {
  const { items: wishlistItems, clearWishlist, isLoaded } = useWishlist()
  const [viewMode, setViewMode] = useState('grid')
  const [selectedItems, setSelectedItems] = useState([])
  const [isSelectMode, setIsSelectMode] = useState(false)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleSelectAll = () => {
    if (selectedItems.length === wishlistItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(wishlistItems.map(item => item.id))
    }
  }

  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const handleAddSelectedToCart = () => {
    // Add logic to add selected items to cart
    console.log('Adding selected items to cart:', selectedItems)
    // Reset selection
    setSelectedItems([])
    setIsSelectMode(false)
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-elegant-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-gold-600"></div>
          </div>
        </div>
      </div>
    )
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-elegant-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-rose-gold-100 to-champagne-100 rounded-full flex items-center justify-center">
                <Heart size={48} className="text-rose-gold-400" />
              </div>
            </div>
            <h1 className="text-4xl font-serif font-bold text-elegant-800 mb-4">
              Your Wishlist is Empty
            </h1>
            <p className="text-elegant-600 mb-8 text-lg max-w-md mx-auto leading-relaxed">
              Save your favorite jewelry pieces to your wishlist and shop them later. 
              Discover our exquisite collection of fine jewelry.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-elegant-800 to-elegant-700 text-white px-8 py-4 rounded-full font-medium tracking-wide hover:from-rose-gold-600 hover:to-champagne-600 transition-all duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span className="uppercase text-sm tracking-widest">Explore Collection</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-elegant-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-elegant-800 mb-2">
                My Wishlist
              </h1>
              <p className="text-elegant-600 text-lg">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-white rounded-full p-1 shadow-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    viewMode === 'grid' 
                      ? 'bg-gradient-to-r from-rose-gold-600 to-champagne-600 text-white shadow-lg' 
                      : 'text-elegant-600 hover:bg-elegant-50'
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    viewMode === 'list' 
                      ? 'bg-gradient-to-r from-rose-gold-600 to-champagne-600 text-white shadow-lg' 
                      : 'text-elegant-600 hover:bg-elegant-50'
                  }`}
                >
                  <List size={18} />
                </button>
              </div>

              {/* Select Mode Toggle */}
              <button
                onClick={() => {
                  setIsSelectMode(!isSelectMode)
                  setSelectedItems([])
                }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  isSelectMode
                    ? 'bg-gradient-to-r from-rose-gold-600 to-champagne-600 text-white shadow-lg'
                    : 'bg-white text-elegant-700 border border-elegant-200 hover:bg-elegant-50'
                }`}
              >
                {isSelectMode ? 'Cancel Selection' : 'Select Items'}
              </button>

              {/* Clear All Button */}
              <button
                onClick={clearWishlist}
                className="text-red-500 hover:text-red-600 font-medium transition-colors duration-200 px-4 py-2"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Selection Controls */}
          {isSelectMode && (
            <div className="mt-6 p-4 bg-white rounded-2xl shadow-lg border border-elegant-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleSelectAll}
                    className="text-rose-gold-600 hover:text-rose-gold-700 font-medium transition-colors"
                  >
                    {selectedItems.length === wishlistItems.length ? 'Deselect All' : 'Select All'}
                  </button>
                  <span className="text-elegant-600">
                    {selectedItems.length} of {wishlistItems.length} selected
                  </span>
                </div>
                
                {selectedItems.length > 0 && (
                  <button
                    onClick={handleAddSelectedToCart}
                    className="bg-gradient-to-r from-elegant-800 to-elegant-700 text-white px-6 py-3 rounded-full font-medium hover:from-rose-gold-600 hover:to-champagne-600 transition-all duration-300 flex items-center gap-2"
                  >
                    <ShoppingBag size={16} />
                    Add Selected to Cart
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Wishlist Grid/List */}
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-6'
        }`}>
          {wishlistItems.map((product) => (
            <WishlistProductCard 
              key={product.id} 
              product={product} 
              viewMode={viewMode}
              isSelectMode={isSelectMode}
              isSelected={selectedItems.includes(product.id)}
              onSelect={() => handleSelectItem(product.id)}
            />
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="mt-12 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-elegant-800 to-elegant-700 text-white px-8 py-4 rounded-full font-medium tracking-wide hover:from-rose-gold-600 hover:to-champagne-600 transition-all duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span className="uppercase text-sm tracking-widest">Continue Shopping</span>
              <ArrowRight size={18} />
            </Link>
            
            <button
              onClick={() => {
                // Add all wishlist items to cart
                console.log('Adding all items to cart:', wishlistItems)
              }}
              className="inline-flex items-center gap-3 border-2 border-elegant-800 text-elegant-800 px-8 py-4 rounded-full font-medium hover:bg-elegant-800 hover:text-white transition-all duration-300"
            >
              <ShoppingBag size={18} />
              <span className="uppercase text-sm tracking-widest">Add All to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
