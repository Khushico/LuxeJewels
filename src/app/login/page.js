'use client'
import { useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, EyeOff, Mail, Phone, Lock, ArrowRight, Star, ShoppingBag, Heart, Crown, Shield, Sparkles } from 'lucide-react'

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState('email') // 'email' or 'phone'
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: ''
  })

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      // Handle login logic here
      console.log('Login attempt:', formData)
    }, 2000)
  }

  const benefits = [
    {
      icon: ShoppingBag,
      title: "Exclusive Access",
      description: "Get early access to new collections and limited editions"
    },
    {
      icon: Heart,
      title: "Wishlist & Favorites",
      description: "Save your favorite pieces and get notified about sales"
    },
    {
      icon: Crown,
      title: "VIP Treatment",
      description: "Enjoy personalized recommendations and priority support"
    },
    {
      icon: Shield,
      title: "Secure Shopping",
      description: "Your purchases and personal data are always protected"
    }
  ]

  const previousPurchases = [
    {
      id: 1,
      name: "Diamond Solitaire Ring",
      image: "/api/placeholder/80/80",
      price: 125000,
      date: "Dec 2024"
    },
    {
      id: 2,
      name: "Pearl Necklace Set",
      image: "/api/placeholder/80/80",
      price: 45000,
      date: "Nov 2024"
    },
    {
      id: 3,
      name: "Gold Bracelet",
      image: "/api/placeholder/80/80",
      price: 85000,
      date: "Oct 2024"
    }
  ]

  // Show loading state until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 via-elegant-50 to-rose-gold-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-gold-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-elegant-50 to-rose-gold-50 flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-gold-500 to-champagne-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl font-serif">G</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-serif font-bold gradient-text tracking-wide">LuxeJewels</span>
                <span className="text-xs text-elegant-500 font-light tracking-widest uppercase">Fine Jewelry</span>
              </div>
            </Link>
          </div>

          {/* Welcome Message */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-elegant-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-elegant-600 leading-relaxed">
              Sign in to access your jewelry collection and exclusive benefits
            </p>
          </div>

          {/* Login Method Toggle */}
          <div className="flex bg-white rounded-xl p-1 mb-6 shadow-lg border border-elegant-100">
            <button
              onClick={() => setLoginMethod('email')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                loginMethod === 'email'
                  ? 'bg-gradient-to-r from-rose-gold-600 to-champagne-600 text-white shadow-lg'
                  : 'text-elegant-600 hover:bg-elegant-50'
              }`}
            >
              <Mail size={18} />
              <span>Email</span>
            </button>
            <button
              onClick={() => setLoginMethod('phone')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                loginMethod === 'phone'
                  ? 'bg-gradient-to-r from-rose-gold-600 to-champagne-600 text-white shadow-lg'
                  : 'text-elegant-600 hover:bg-elegant-50'
              }`}
            >
              <Phone size={18} />
              <span>Phone</span>
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email/Phone Input */}
            <div>
              <label className="block text-elegant-700 font-medium mb-2">
                {loginMethod === 'email' ? 'Email Address' : 'Phone Number'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {loginMethod === 'email' ? (
                    <Mail className="h-5 w-5 text-elegant-400" />
                  ) : (
                    <Phone className="h-5 w-5 text-elegant-400" />
                  )}
                </div>
                <input
                  type={loginMethod === 'email' ? 'email' : 'tel'}
                  name={loginMethod}
                  value={formData[loginMethod]}
                  onChange={handleInputChange}
                  placeholder={loginMethod === 'email' ? 'your@email.com' : '+91 98765 43210'}
                  className="w-full pl-10 pr-4 py-3 border-2 border-elegant-200 rounded-xl focus:ring-2 focus:ring-rose-gold-300 focus:border-rose-gold-300 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-elegant-700 font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-elegant-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 border-2 border-elegant-200 rounded-xl focus:ring-2 focus:ring-rose-gold-300 focus:border-rose-gold-300 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-elegant-400 hover:text-elegant-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-rose-gold-600 bg-white border-2 border-elegant-300 rounded focus:ring-rose-gold-500 focus:ring-2"
                />
                <span className="ml-2 text-elegant-600">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-rose-gold-600 hover:text-rose-gold-700 font-medium transition-colors">
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-elegant-800 to-elegant-700 text-white py-4 rounded-xl font-semibold tracking-wide hover:from-rose-gold-600 hover:to-champagne-600 transition-all duration-500 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <span className="uppercase text-sm tracking-widest">Sign In</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-8">
            <p className="text-elegant-600">
              Don't have an account?{' '}
              <Link href="/signup" className="text-rose-gold-600 hover:text-rose-gold-700 font-semibold transition-colors">
                Create Account
              </Link>
            </p>
          </div>

          {/* Social Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-elegant-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gradient-to-br from-cream-50 via-elegant-50 to-rose-gold-50 text-elegant-500">
                  Or continue with
                </span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full flex items-center justify-center px-4 py-3 border-2 border-elegant-200 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white transition-all duration-300 group">
                <span className="text-elegant-700 font-medium group-hover:text-rose-gold-600 transition-colors">Google</span>
              </button>
              <button className="w-full flex items-center justify-center px-4 py-3 border-2 border-elegant-200 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white transition-all duration-300 group">
                <span className="text-elegant-700 font-medium group-hover:text-rose-gold-600 transition-colors">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Benefits & Previous Purchases */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-elegant-800 via-elegant-700 to-rose-gold-600 text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
          <div className="absolute top-32 right-20 w-20 h-20 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-16 h-16 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-40 right-10 w-24 h-24 border border-white/20 rounded-full"></div>
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="text-champagne-300" size={32} />
              <h2 className="text-3xl font-serif font-bold">Login Before You Buy</h2>
            </div>
            <p className="text-white/80 text-lg leading-relaxed">
              Unlock exclusive benefits and personalized shopping experience with your LuxeJewels account
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-6 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                  <benefit.icon size={20} className="text-champagne-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{benefit.title}</h3>
                  <p className="text-white/70 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Previous Purchases */}
        <div className="relative z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h3 className="font-serif font-bold text-xl mb-4 flex items-center gap-2">
              <Star className="text-champagne-300" size={20} />
              Your Recent Purchases
            </h3>
            <div className="space-y-4">
              {previousPurchases.map((item) => (
                <div key={item.id} className="flex items-center gap-3 bg-white/5 rounded-xl p-3 hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-champagne-300 to-rose-gold-300 rounded-lg flex items-center justify-center">
                    <Crown size={16} className="text-elegant-800" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-champagne-300 font-semibold">₹{item.price.toLocaleString('en-IN')}</span>
                      <span className="text-white/60 text-xs">{item.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-champagne-300 hover:text-white font-medium transition-colors text-sm">
              View All Purchases →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}