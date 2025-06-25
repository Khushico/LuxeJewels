'use client'
import { Heart } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { useState } from 'react'

export default function WishlistHeartButton({ 
  product, 
  size = 20, 
  className = "",
  showTooltip = true 
}) {
  const { isInWishlist, toggleWishlist } = useWishlist()
  const [isAnimating, setIsAnimating] = useState(false)
  
  const isLiked = isInWishlist(product.id)

  const handleToggle = (e) => {
    e.preventDefault() // Prevent navigation if button is inside a link
    e.stopPropagation() // Prevent event bubbling
    
    setIsAnimating(true)
    toggleWishlist(product)
    
    // Reset animation after it completes
    setTimeout(() => setIsAnimating(false), 300)
  }

  return (
    <div className="relative group">
      <button
        onClick={handleToggle}
        className={`
          relative p-2 rounded-full transition-all duration-300 transform
          ${isLiked 
            ? 'bg-red-50 hover:bg-red-100 text-red-500' 
            : 'bg-white/80 hover:bg-white text-gray-600 hover:text-red-500'
          }
          hover:scale-110 shadow-lg backdrop-blur-sm
          ${isAnimating ? 'animate-pulse scale-125' : ''}
          ${className}
        `}
        aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart 
          size={size} 
          className={`
            transition-all duration-300
            ${isLiked ? 'fill-current text-red-500' : 'text-current'}
            ${isAnimating ? 'animate-bounce' : ''}
          `}
        />
        
        {/* Animated heart effect */}
        {isAnimating && isLiked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Heart 
              size={size + 4} 
              className="fill-current text-red-500 animate-ping opacity-75" 
            />
          </div>
        )}
      </button>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            {isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  )
}