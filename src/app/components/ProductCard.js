'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react'
import WishlistHeartButton from './WishlistHeartButton'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product, viewMode = 'grid' }) {
  const [isLiked, setIsLiked] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const { addToCart } = useCart()

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsAddingToCart(true)
    
    // Add to cart
    addToCart(product, {
      quantity: 1,
      size: 'Standard',
      metal: product.category === 'rings' ? 'Rose Gold' : 'Sterling Silver'
    })
    
    console.log('Added to cart:', product.name)
    
    // Reset loading state
    setTimeout(() => {
      setIsAddingToCart(false)
    }, 800)
  }

  return (
    <div 
      className="group relative bg-white rounded-3xl overflow-hidden product-card border border-elegant-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Elegant Badge Container */}
      {(product.isNew || product.isSale) && (
        <div className="absolute top-6 left-6 z-20 flex flex-col gap-3">
          {product.isNew && (
            <div className="glass-effect rounded-full px-4 py-2">
              <span className="text-rose-gold-700 text-xs font-semibold tracking-widest uppercase">
                New
              </span>
            </div>
          )}
          {product.isSale && (
            <div className="bg-gradient-to-r from-rose-gold-600 to-champagne-600 rounded-full px-4 py-2 shadow-lg">
              <span className="text-white text-xs font-bold tracking-widest">
                {discountPercentage}% OFF
              </span>
            </div>
          )}
        </div>
      )}
      <div className="absolute top-4 right-4 z-10">
        <WishlistHeartButton product={product} />
      </div>

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-cream-50 to-elegant-50">
        {!imageLoaded && (
          <div className="absolute inset-0 shimmer bg-gradient-to-r from-elegant-100 to-elegant-200"></div>
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover product-image transition-all duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Elegant Hover Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent transition-all duration-700 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <button className={`glass-effect text-elegant-800 px-8 py-3 rounded-full font-medium shadow-xl transition-all duration-700 hover:bg-white/40 border border-white/20 ${
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              Quick View
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-8">
        {/* Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${
                    i < Math.floor(product.rating)
                      ? 'text-champagne-500 fill-champagne-500'
                      : 'text-elegant-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-elegant-500 font-light">
              {product.rating} ({product.reviews})
            </span>
          </div>
        </div>

        {/* Product Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="font-serif text-xl text-elegant-800 mb-4 hover:text-rose-gold-600 transition-colors duration-300 line-clamp-2 leading-relaxed">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-baseline gap-3 mb-6">
          <span className="text-2xl font-bold text-elegant-900 font-serif">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-elegant-400 line-through font-light">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="w-full bg-gradient-to-r from-elegant-800 to-elegant-700 text-white py-4 rounded-full font-medium tracking-wide hover:from-rose-gold-600 hover:to-champagne-600 transition-all duration-500 flex items-center justify-center gap-3 group/btn shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isAddingToCart ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span className="uppercase text-sm tracking-widest">Adding...</span>
            </>
          ) : (
            <>
              <ShoppingBag size={18} className="group-hover/btn:scale-110 transition-transform duration-300" />
              <span className="uppercase text-sm tracking-widest">Add to Cart</span>
            </>
          )}
        </button>

        {/* Elegant bottom border */}
        <div className="mt-6 pt-6 border-t border-elegant-100">
          <div className="flex items-center justify-center">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-rose-gold-300 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  )
}