'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage on mount (client-side only)
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('luxe-cart')
      if (savedCart) {
        setCartItems(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Save cart to localStorage whenever it changes (only after initial load)
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('luxe-cart', JSON.stringify(cartItems))
      } catch (error) {
        console.error('Error saving cart to localStorage:', error)
      }
    }
  }, [cartItems, isLoaded])

  const addToCart = (product, options = {}) => {
    if (!product || !product.id) {
      console.error('Invalid product data:', product)
      return
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      originalPrice: product.originalPrice,
      rating: product.rating,
      reviews: product.reviews,
      quantity: options.quantity || 1,
      size: options.size || 'Standard',
      metal: options.metal || 'Default',
      addedAt: new Date().toISOString()
    }

    setCartItems(prev => {
      const existingItem = prev.find(item => 
        item.id === product.id && 
        item.size === cartItem.size && 
        item.metal === cartItem.metal
      )
      
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id && 
          item.size === cartItem.size && 
          item.metal === cartItem.metal
            ? { ...item, quantity: item.quantity + cartItem.quantity }
            : item
        )
      }
      
      return [...prev, cartItem]
    })
  }

  const removeFromCart = (id, size, metal) => {
    setCartItems(prev => prev.filter(item => 
      !(item.id === id && item.size === size && item.metal === metal)
    ))
  }

  const updateQuantity = (id, size, metal, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id, size, metal)
      return
    }

    setCartItems(prev => prev.map(item =>
      item.id === id && item.size === size && item.metal === metal
        ? { ...item, quantity: newQuantity }
        : item
    ))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId)
  }

  const value = {
    items: cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartCount,
    getCartTotal,
    isInCart,
    isLoaded
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}