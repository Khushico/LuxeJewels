import Link from 'next/link'
import { ArrowRight, Sparkles, Shield, Award, Truck } from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Handcrafted with the finest materials and attention to detail'
    },
    {
      icon: Shield,
      title: 'Lifetime Warranty',
      description: 'Comprehensive warranty on all our jewelry pieces'
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Complimentary shipping on orders over $500'
    },
    {
      icon: Sparkles,
      title: 'Custom Design',
      description: 'Bespoke jewelry design services available'
    }
  ]

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 via-white to-elegant-50">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&h=1080&fit=crop&crop=center')] bg-cover bg-center opacity-8"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="elegant-border pb-12 mb-12">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-2 h-2 bg-rose-gold-400 rounded-full"></div>
              <span className="text-rose-gold-600 font-medium tracking-widest uppercase text-sm">Premium Jewelry Collection</span>
              <div className="w-2 h-2 bg-rose-gold-400 rounded-full"></div>
            </div>
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-serif font-light text-elegant-900 mb-8 leading-tight">
            Timeless
            <span className="block gradient-text font-normal italic">Elegance</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-elegant-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Discover our handcrafted collection of exquisite jewelry. From engagement rings to 
            statement necklaces, each piece is designed to celebrate life's most precious moments 
            with unparalleled sophistication.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/products" className="btn-primary group">
              Explore Collection
              <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
            <Link href="/about" className="btn-secondary">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="elegant-border pb-8 mb-8">
              <h2 className="text-4xl lg:text-5xl font-serif font-light text-elegant-900 mb-6">
                Why Choose <span className="gradient-text italic">LuxeJewels</span>?
              </h2>
              <p className="text-xl text-elegant-600 max-w-3xl mx-auto font-light leading-relaxed">
                We're committed to providing exceptional quality and service that exceeds your expectations, 
                creating jewelry that becomes part of your story.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="text-center group animate-fade-in hover:transform hover:-translate-y-2 transition-all duration-500"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-cream-100 to-elegant-100 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:from-rose-gold-100 group-hover:to-champagne-100 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                    <Icon className="text-rose-gold-600 group-hover:scale-110 transition-transform duration-300" size={28} />
                  </div>
                  <h3 className="text-xl font-serif text-elegant-900 mb-4 group-hover:text-rose-gold-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-elegant-600 leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-elegant-900 via-elegant-800 to-elegant-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=1920&h=1080&fit=crop&crop=center')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="elegant-border pb-8 mb-8">
            <h2 className="text-4xl lg:text-5xl font-serif font-light mb-6">
              Ready to Find Your Perfect 
              <span className="block text-champagne-300 italic font-normal">Piece</span>?
            </h2>
            <p className="text-xl text-elegant-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Browse our complete collection and discover jewelry that speaks to your unique style. 
              Each piece tells a story of craftsmanship, elegance, and timeless beauty.
            </p>
          </div>
          <Link href="/products" className="inline-flex items-center gap-3 bg-gradient-to-r from-rose-gold-600 to-champagne-600 text-white px-10 py-5 rounded-full font-medium tracking-wide hover:from-rose-gold-700 hover:to-champagne-700 transition-all duration-500 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 group">
            Shop Our Collection
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>
      </section>
    </div>
  )
}