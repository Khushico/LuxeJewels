'use client'
import { createContext, useContext, useState, useEffect } from 'react'

export const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load wishlist from localStorage on mount (client-side only)
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem('giva-wishlist')
      if (savedWishlist) {
        setWishlistItems(JSON.parse(savedWishlist))
      }
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Save wishlist to localStorage whenever it changes (only after initial load)
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('giva-wishlist', JSON.stringify(wishlistItems))
      } catch (error) {
        console.error('Error saving wishlist to localStorage:', error)
      }
    }
  }, [wishlistItems, isLoaded])

  const addToWishlist = (product) => {
    if (!product || !product.id) {
      console.error('Invalid product data:', product)
      return
    }
    
    setWishlistItems(prev => {
      const exists = prev.find(item => item.id === product.id)
      if (exists) return prev
      return [...prev, product]
    })
  }

  const removeFromWishlist = (productId) => {
    if (!productId) {
      console.error('Invalid product ID:', productId)
      return
    }
    
    setWishlistItems(prev => prev.filter(item => item.id !== productId))
  }

  const isInWishlist = (productId) => {
    if (!productId) return false
    return wishlistItems.some(item => item.id === productId)
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  const getWishlistCount = () => {
    return wishlistItems.length
  }

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const value = {
    items: wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    getWishlistCount,
    toggleWishlist,
    isLoaded // Useful to show loading states
  }

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}