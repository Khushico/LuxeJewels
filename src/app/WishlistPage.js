'use client'
import { useWishlist } from '../context/WishlistContext'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart, X, Sparkles } from 'lucide-react'

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist, isLoaded } = useWishlist()

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-8">
            <Heart size={80} className="mx-auto text-gray-300 mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Wishlist is Empty</h1>
            <p className="text-gray-600">Start adding jewelry pieces you love to see them here!</p>
          </div>
          <Link 
            href="/products"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105"
          >
            <Sparkles size={20} />
            Explore Jewelry
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            My Wishlist
            <Heart className="inline-block ml-2 text-red-500 fill-current" size={32} />
          </h1>
          <p className="text-gray-600 mb-6">
            {items.length} {items.length === 1 ? 'item' : 'items'} saved for later
          </p>
          {items.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-gray-500 hover:text-red-500 transition-colors duration-200"
            >
              Clear all items
            </button>
          )}
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {items.map((product) => (
            <div key={product.id} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              {/* Product Image */}
              <div className="relative group">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={product.image || '/placeholder-jewelry.jpg'}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Remove from Wishlist Button */}
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-red-50 transition-colors duration-200 group"
                >
                  <Heart 
                    size={20} 
                    className="text-red-500 fill-current group-hover:scale-110 transition-transform duration-200" 
                  />
                </button>

                {/* Quick Actions Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="space-y-3">
                    <Link
                      href={`/products/${product.id}`}
                      className="block bg-white text-gray-900 px-6 py-2 rounded-full hover:bg-gray-100 transition-colors duration-200 text-center"
                    >
                      View Details
                    </Link>
                    <button className="w-full bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2">
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                
                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-orange-600">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                  )}
                </div>

                {/* Category Badge */}
                {product.category && (
                  <div className="mt-3">
                    <span className="inline-block bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-12">
          <Link 
            href="/products"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105"
          >
            <Sparkles size={20} />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}