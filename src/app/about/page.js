'use client'
import Image from 'next/image'
import { Sparkles, Award, Users, Heart, Globe, Shield } from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: Award,
      title: "Exceptional Craftsmanship",
      description: "Every piece is meticulously handcrafted by our master artisans using time-honored techniques."
    },
    {
      icon: Shield,
      title: "Ethical Sourcing",
      description: "We are committed to responsible sourcing, ensuring all our materials are ethically obtained."
    },
    {
      icon: Heart,
      title: "Personal Connection",
      description: "We believe jewelry should tell your story. Each piece is designed to create lasting memories."
    },
    {
      icon: Globe,
      title: "Sustainable Practices",
      description: "Our commitment to the environment drives us to implement sustainable practices throughout our production."
    }
  ]

  const milestones = [
    { year: "2015", title: "LuxeJewels Founded", description: "Elena Martinez establishes LuxeJewels with a small atelier in New York" },
    { year: "2017", title: "First Award", description: "Received the 'Emerging Designer of the Year' at International Jewelry Awards" },
    { year: "2019", title: "Sustainable Initiative", description: "Launched our ethical sourcing and sustainability program" },
    { year: "2021", title: "Global Expansion", description: "Opened flagship stores in London, Paris, and Tokyo" },
    { year: "2023", title: "Digital Innovation", description: "Pioneered virtual try-on technology and custom design platform" },
    { year: "2024", title: "Artisan Partnership", description: "Established partnerships with local artisans worldwide" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-elegant-50">
      {/* Hero Section */}
      <section className="hero-bg py-20 lg:py-32 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="elegant-border pb-12 mb-12">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Sparkles className="text-rose-gold-600" size={24} />
              <span className="text-rose-gold-600 font-medium tracking-widest uppercase text-sm">Our Story</span>
              <Sparkles className="text-rose-gold-600" size={24} />
            </div>
            <h1 className="text-6xl lg:text-8xl font-serif font-light text-elegant-900 mb-8 leading-tight">
              About
              <span className="block gradient-text font-normal italic">Luxe-jewels</span>
            </h1>
            <p className="text-xl lg:text-2xl text-elegant-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Where timeless craftsmanship meets contemporary elegance. 
              We create jewelry that tells your story and celebrates life's most precious moments.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-serif font-light text-elegant-900 mb-6">
                Our <span className="gradient-text italic">Journey</span>
              </h2>
              <p className="text-lg text-elegant-600 leading-relaxed font-light mb-6">
                Founded in 2015 by master jeweler Elena Martinez, Luxe-jewels began as a small atelier in the heart of New York's diamond district. With a passion for creating pieces that transcend trends and time, Elena envisioned a brand that would celebrate the artistry of traditional jewelry making while embracing contemporary design sensibilities.
              </p>
              <p className="text-lg text-elegant-600 leading-relaxed font-light mb-6">
                Today, Luxe-jewels has grown into an internationally recognized brand, yet we remain true to our founding principles: exceptional craftsmanship, ethical sourcing, and creating pieces that tell your unique story.
              </p>
              <p className="text-lg text-elegant-600 leading-relaxed font-light">
                We believe that jewelry is more than just an accessory—it's a form of self-expression, a keeper of memories, and a legacy to be cherished for generations to come.
              </p>
            </div>
            
            <div>
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&h=750&fit=crop&crop=center"
                    alt=" Luxe-jewels Atelier"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-rose-gold-100 to-champagne-100 rounded-full flex items-center justify-center shadow-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-rose-gold-700">9+</div>
                    <div className="text-sm text-rose-gold-600 font-medium">Years</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif font-light text-elegant-900 mb-6">
              Our <span className="gradient-text italic">Values</span>
            </h2>
            <p className="text-xl text-elegant-600 max-w-3xl mx-auto font-light leading-relaxed">
              The principles that guide every decision we make and every piece we create.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={value.title}
                  className="flex gap-6 p-8 bg-gradient-to-br from-cream-50 to-elegant-50 rounded-2xl hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-rose-gold-100 to-champagne-100 rounded-full flex items-center justify-center">
                      <Icon className="text-rose-gold-600" size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-elegant-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-elegant-600 leading-relaxed font-light">
                      {value.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif font-light text-elegant-900 mb-6">
              Our <span className="gradient-text italic">Journey</span>
            </h2>
            <p className="text-xl text-elegant-600 max-w-3xl mx-auto font-light">
              Key milestones that have shaped Luxe-jewels into the brand we are today.
            </p>
          </div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                  <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500">
                    <div className="text-2xl font-bold text-rose-gold-600 mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-serif text-elegant-900 mb-3">
                      {milestone.title}
                    </h3>
                    <p className="text-elegant-600 font-light">
                      {milestone.description}
                    </p>
                  </div>
                </div>
                
                <div className="relative z-10">
                  <div className="w-4 h-4 bg-gradient-to-br from-rose-gold-500 to-champagne-500 rounded-full border-4 border-white shadow-lg"></div>
                </div>
                
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}