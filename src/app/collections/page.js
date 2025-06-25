'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles, Crown, Heart, Star } from 'lucide-react'

export default function CollectionsPage() {
  const collections = [
    {
      id: 1,
      name: "Timeless Elegance",
      description: "Classic pieces that transcend trends and time",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop&crop=center",
      itemCount: 24,
      priceRange: "$899 - $4,999",
      featured: true
    },
    {
      id: 2,
      name: "Modern Minimalist",
      description: "Clean lines and contemporary sophistication",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=600&fit=crop&crop=center",
      itemCount: 18,
      priceRange: "$599 - $2,999",
      featured: false
    },
    {
      id: 3,
      name: "Vintage Romance",
      description: "Romantic designs inspired by bygone eras",
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=600&fit=crop&crop=center",
      itemCount: 32,
      priceRange: "$1,299 - $6,999",
      featured: true
    },
    {
      id: 4,
      name: "Bridal Collection",
      description: "Perfect pieces for your special day",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=600&fit=crop&crop=center",
      itemCount: 42,
      priceRange: "$1,999 - $9,999",
      featured: true
    }
  ]

  const featuredCollections = collections.filter(c => c.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-elegant-50">
      {/* Hero Section */}
      <section className="hero-bg py-20 lg:py-32 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="elegant-border pb-12 mb-12">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Crown className="text-rose-gold-600" size={24} />
              <span className="text-rose-gold-600 font-medium tracking-widest uppercase text-sm">Curated Collections</span>
              <Crown className="text-rose-gold-600" size={24} />
            </div>
            <h1 className="text-6xl lg:text-8xl font-serif font-light text-elegant-900 mb-8 leading-tight">
              Our
              <span className="block gradient-text font-normal italic">Collections</span>
            </h1>
            <p className="text-xl lg:text-2xl text-elegant-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Discover thoughtfully curated collections that celebrate every moment, 
              from everyday elegance to life's most precious milestones.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif font-light text-elegant-900 mb-6">
              Featured <span className="gradient-text italic">Collections</span>
            </h2>
            <p className="text-xl text-elegant-600 max-w-3xl mx-auto font-light leading-relaxed">
              Our most beloved collections, each telling a unique story of craftsmanship and elegance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {featuredCollections.map((collection, index) => (
              <div
                key={collection.id}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  
                  {/* Collection Badge */}
                  <div className="absolute top-6 left-6">
                    <div className="glass-effect rounded-full px-4 py-2">
                      <span className="text-white font-medium tracking-wide flex items-center gap-2">
                        <Star size={16} className="text-rose-gold-400" />
                        Featured
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-serif text-elegant-900 mb-3 group-hover:text-rose-gold-600 transition-colors duration-300">
                    {collection.name}
                  </h3>
                  <p className="text-elegant-600 font-light leading-relaxed mb-4">
                    {collection.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-sm text-elegant-500">
                      <span className="font-medium">{collection.itemCount} pieces</span>
                    </div>
                    <div className="text-sm text-elegant-500">
                      <span className="font-medium">{collection.priceRange}</span>
                    </div>
                  </div>

                  <Link 
                    href="/products"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-elegant-800 to-elegant-700 text-white px-6 py-3 rounded-full font-medium tracking-wide hover:from-rose-gold-600 hover:to-champagne-600 transition-all duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Explore Collection
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* All Collections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {collections.map((collection, index) => (
              <div
                key={collection.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-serif text-elegant-900 mb-2 group-hover:text-rose-gold-600 transition-colors">
                    {collection.name}
                  </h3>
                  <p className="text-elegant-600 text-sm font-light mb-4 line-clamp-2">
                    {collection.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-elegant-500 mb-4">
                    <span>{collection.itemCount} pieces</span>
                    <span>{collection.priceRange}</span>
                  </div>

                  <Link 
                    href="/products"
                    className="inline-flex items-center gap-2 text-rose-gold-600 font-medium hover:text-rose-gold-700 transition-colors"
                  >
                    View Collection
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}