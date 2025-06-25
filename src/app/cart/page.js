'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  Heart, 
  ArrowRight, 
  Star, 
  Gift, 
  Sparkles, 
  Crown,
  Lock,
  Truck,
  Shield,
  X
} from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { 
    items: cartItems, 
    updateQuantity, 
    removeFromCart, 
    isLoaded,
    getCartTotal 
  } = useCart()

  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState(null)
  const [currentQuote, setCurrentQuote] = useState(0)
  const [showQuote, setShowQuote] = useState(true)

  const romanticQuotes = [
    {
      text: "Like a perfect jewel, we will look stunning together",
      author: "✨ LuxeJewels"
    },
    {
      text: "Every piece you choose reflects your exquisite taste",
      author: "💎 Your Style"
    },
    {
      text: "These treasures are as beautiful as your love story",
      author: "💕 Romance"
    },
    {
      text: "Elegance is choosing pieces that speak to your soul",
      author: "👑 Luxury"
    },
    {
      text: "Like diamonds, your choices shine with brilliance",
      author: "✨ Sparkle"
    },
    {
      text: "Every gem tells a story, yours will be legendary",
      author: "📖 Legacy"
    }
  ]

  const promoCodes = {
    'WELCOME10': { discount: 10, type: 'percentage' },
    'LUXURY50': { discount: 5000, type: 'fixed' },
    'NEWUSER': { discount: 15, type: 'percentage' }
  }

  // Rotate quotes every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % romanticQuotes.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleUpdateQuantity = (item, newQuantity) => {
    updateQuantity(item.id, item.size, item.metal, newQuantity)
  }

  const handleRemoveItem = (item) => {
    removeFromCart(item.id, item.size, item.metal)
  }

  const applyPromoCode = () => {
    if (promoCodes[promoCode.toUpperCase()]) {
      setAppliedPromo({
        code: promoCode.toUpperCase(),
        ...promoCodes[promoCode.toUpperCase()]
      })
      setPromoCode('')
    }
  }

  const removePromoCode = () => {
    setAppliedPromo(null)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  // Loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-elegant-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-gold-600"></div>
      </div>
    )
  }

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-elegant-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-rose-gold-100 to-champagne-100 rounded-full flex items-center justify-center">
                <ShoppingBag size={48} className="text-rose-gold-400" />
              </div>
            </div>
            <h1 className="text-4xl font-serif font-bold text-elegant-800 mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-elegant-600 mb-8 text-lg max-w-md mx-auto leading-relaxed">
              Discover our exquisite collection of fine jewelry and add some sparkle to your life.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-elegant-800 to-elegant-700 text-white px-8 py-4 rounded-full font-medium tracking-wide hover:from-rose-gold-600 hover:to-champagne-600 transition-all duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span className="uppercase text-sm tracking-widest">Start Shopping</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const totalSavings = cartItems.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + ((item.originalPrice - item.price) * item.quantity)
    }
    return sum
  }, 0)

  const shipping = subtotal > 500000 ? 0 : 2000 // Free shipping over ₹5 lakh
  const tax = Math.round(subtotal * 0.03) // 3% tax

  let discount = 0
  if (appliedPromo) {
    discount = appliedPromo.type === 'percentage' 
      ? Math.round(subtotal * appliedPromo.discount / 100)
      : appliedPromo.discount
  }

  const total = subtotal + shipping + tax - discount

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-elegant-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-elegant-800 mb-2">
            Shopping Cart
          </h1>
          <p className="text-elegant-600 text-lg">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} ready to make you shine
          </p>
        </div>

        {/* Romantic Quote Banner */}
        {showQuote && (
          <div className="relative mb-8 bg-gradient-to-r from-rose-gold-600 to-champagne-600 rounded-2xl p-6 text-white overflow-hidden">
            <button
              onClick={() => setShowQuote(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles size={24} />
              </div>
              <div className="flex-1">
                <p className="text-lg font-medium mb-1 transition-all duration-500">
                  {romanticQuotes[currentQuote].text}
                </p>
                <p className="text-white/80 text-sm">
                  {romanticQuotes[currentQuote].author}
                </p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
              <div 
                className="h-full bg-white/40 transition-all duration-5000 ease-linear"
                style={{ width: `${((currentQuote + 1) / romanticQuotes.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item, index) => (
              <div key={`${item.id}-${item.size}-${item.metal}-${index}`} className="bg-white rounded-2xl shadow-lg border border-elegant-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Product Image */}
                    <div className="relative w-full md:w-32 h-32 bg-gradient-to-br from-cream-50 to-elegant-50 rounded-xl overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      {item.originalPrice && (
                        <div className="absolute top-2 left-2 bg-gradient-to-r from-rose-gold-600 to-champagne-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                          {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-serif text-xl text-elegant-800 mb-1">{item.name}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className={`${
                                    i < Math.floor(item.rating || 0)
                                      ? 'text-champagne-500 fill-champagne-500'
                                      : 'text-elegant-200'
                                  }`}
                                />
                              ))}
                            </div>
                            {item.rating && (
                              <span className="text-sm text-elegant-500">
                                {item.rating} ({item.reviews || 0})
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-elegant-600 space-y-1">
                            <p><span className="font-medium">Size:</span> {item.size}</p>
                            <p><span className="font-medium">Metal:</span> {item.metal}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item)}
                          className="text-elegant-400 hover:text-red-500 transition-colors p-2"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      {/* Price and Quantity */}
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-baseline gap-3">
                          <span className="text-2xl font-bold text-elegant-900 font-serif">
                            {formatPrice(item.price)}
                          </span>
                          {item.originalPrice && (
                            <span className="text-lg text-elegant-400 line-through">
                              {formatPrice(item.originalPrice)}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center bg-elegant-50 rounded-full">
                            <button
                              onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                              className="p-2 hover:bg-elegant-100 rounded-full transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-4 py-2 font-medium">{item.quantity}</span>
                            <button
                              onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                              className="p-2 hover:bg-elegant-100 rounded-full transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          {/* Item Total */}
                          <div className="text-right">
                            <p className="text-lg font-bold text-elegant-900">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                            {item.originalPrice && (
                              <p className="text-sm text-green-600 font-medium">
                                Save {formatPrice((item.originalPrice - item.price) * item.quantity)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Promo Code */}
            <div className="bg-white rounded-2xl shadow-lg border border-elegant-100 p-6">
              <h3 className="font-serif font-bold text-xl text-elegant-800 mb-4 flex items-center gap-2">
                <Gift className="text-rose-gold-600" size={20} />
                Promo Code
              </h3>
              {!appliedPromo ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder="Enter code"
                    className="flex-1 px-4 py-3 border-2 border-elegant-200 rounded-xl focus:ring-2 focus:ring-rose-gold-300 focus:border-rose-gold-300 transition-all"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="px-6 py-3 bg-gradient-to-r from-rose-gold-600 to-champagne-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                  >
                    Apply
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl p-4">
                  <div>
                    <p className="font-medium text-green-800">{appliedPromo.code}</p>
                    <p className="text-green-600 text-sm">
                      {appliedPromo.type === 'percentage' 
                        ? `${appliedPromo.discount}% off`
                        : `₹${appliedPromo.discount} off`
                      }
                    </p>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-green-600 hover:text-green-800 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}
              
              <div className="mt-4 text-sm text-elegant-600">
                <p className="font-medium mb-2">Available codes:</p>
                <div className="space-y-1">
                  <p>• WELCOME10 - 10% off</p>
                  <p>• LUXURY50 - ₹5,000 off</p>
                  <p>• NEWUSER - 15% off</p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg border border-elegant-100 p-6">
              <h3 className="font-serif font-bold text-xl text-elegant-800 mb-4 flex items-center gap-2">
                <Crown className="text-rose-gold-600" size={20} />
                Order Summary
              </h3>
              
              <div className="space-y-3 text-elegant-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                
                {totalSavings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>You Save</span>
                    <span>-{formatPrice(totalSavings)}</span>
                  </div>
                )}
                
                {appliedPromo && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo Discount ({appliedPromo.code})</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                
                <div className="border-t border-elegant-200 pt-3">
                  <div className="flex justify-between text-xl font-bold text-elegant-900">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-sm text-elegant-600">
                  <Shield size={16} className="text-green-500" />
                  <span>Secure checkout with SSL encryption</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-elegant-600">
                  <Truck size={16} className="text-blue-500" />
                  <span>{shipping === 0 ? 'Free shipping included' : 'Free shipping on orders over ₹5 lakh'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-elegant-600">
                  <Heart size={16} className="text-red-500" />
                  <span>30-day return guarantee</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="w-full mt-6 bg-gradient-to-r from-elegant-800 to-elegant-700 text-white py-4 rounded-xl font-semibold tracking-wide hover:from-rose-gold-600 hover:to-champagne-600 transition-all duration-500 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <Lock size={18} />
                <span className="uppercase text-sm tracking-widest">Secure Checkout</span>
                <ArrowRight size={18} />
              </button>

              <div className="mt-4 text-center">
                <Link href="/products" className="text-rose-gold-600 hover:text-rose-gold-700 font-medium transition-colors text-sm">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}