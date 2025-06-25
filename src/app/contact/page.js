'use client'
import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Calendar, Award } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    serviceType: 'general'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      serviceType: 'general'
    })
    setIsSubmitting(false)
    alert('Thank you for your message! We\'ll get back to you within 24 hours.')
  }

  const locations = [
    {
      name: "New York Flagship",
      address: "123 Fifth Avenue, New York, NY 10001",
      phone: "+1 (555) 123-4567",
      email: "ny@giva.com",
      hours: "Mon-Sat: 10AM-8PM, Sun: 12PM-6PM",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&crop=center"
    },
    {
      name: "Beverly Hills Boutique",
      address: "456 Rodeo Drive, Beverly Hills, CA 90210",
      phone: "+1 (555) 987-6543",
      email: "bh@giva.com",
      hours: "Mon-Sat: 10AM-9PM, Sun: 11AM-7PM",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center"
    },
    {
      name: "London Mayfair",
      address: "78 Bond Street, London W1S 1RX, UK",
      phone: "+44 20 7123 4567",
      email: "london@giva.com",
      hours: "Mon-Sat: 10AM-7PM, Sun: 12PM-5PM",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&crop=center"
    }
  ]

  const services = [
    {
      icon: MessageCircle,
      title: "General Inquiry",
      description: "Questions about our collections, policies, or services"
    },
    {
      icon: Calendar,
      title: "Private Consultation",
      description: "Book a one-on-one session with our jewelry experts"
    },
    {
      icon: Award,
      title: "Custom Design",
      description: "Create a unique piece tailored to your vision"
    },
    {
      icon: Phone,
      title: "Jewelry Care",
      description: "Professional cleaning, repair, and maintenance services"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-elegant-50">
      {/* Hero Section */}
      <section className="hero-bg py-20 lg:py-32 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="elegant-border pb-12 mb-12">
            <div className="flex items-center justify-center gap-3 mb-8">
              <MessageCircle className="text-rose-gold-600" size={24} />
              <span className="text-rose-gold-600 font-medium tracking-widest uppercase text-sm">Get in Touch</span>
              <MessageCircle className="text-rose-gold-600" size={24} />
            </div>
            <h1 className="text-6xl lg:text-8xl font-serif font-light text-elegant-900 mb-8 leading-tight">
              Contact
              <span className="block gradient-text font-normal italic">LuxeJewels</span>
            </h1>
            <p className="text-xl lg:text-2xl text-elegant-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              We're here to help you find the perfect piece or answer any questions you may have. 
              Reach out to our expert team today.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
                <h2 className="text-3xl lg:text-4xl font-serif font-light text-elegant-900 mb-6">
                  Send us a <span className="gradient-text italic">Message</span>
                </h2>
                <p className="text-lg text-elegant-600 font-light mb-8">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-elegant-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-elegant-200 rounded-xl focus:ring-2 focus:ring-rose-gold-300 focus:border-rose-gold-300 transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-elegant-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-elegant-200 rounded-xl focus:ring-2 focus:ring-rose-gold-300 focus:border-rose-gold-300 transition-all duration-300"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-elegant-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-elegant-200 rounded-xl focus:ring-2 focus:ring-rose-gold-300 focus:border-rose-gold-300 transition-all duration-300"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="serviceType" className="block text-sm font-medium text-elegant-700 mb-2">
                        Service Type *
                      </label>
                      <select
                        id="serviceType"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-elegant-200 rounded-xl focus:ring-2 focus:ring-rose-gold-300 focus:border-rose-gold-300 transition-all duration-300"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="consultation">Private Consultation</option>
                        <option value="custom">Custom Design</option>
                        <option value="care">Jewelry Care</option>
                        <option value="repair">Repair Service</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-elegant-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-elegant-200 rounded-xl focus:ring-2 focus:ring-rose-gold-300 focus:border-rose-gold-300 transition-all duration-300"
                      placeholder="Brief subject of your inquiry"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-elegant-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-elegant-200 rounded-xl focus:ring-2 focus:ring-rose-gold-300 focus:border-rose-gold-300 transition-all duration-300 resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-elegant-800 to-elegant-700 text-white py-4 rounded-xl font-medium tracking-wide hover:from-rose-gold-600 hover:to-champagne-600 transition-all duration-500 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                
                {/* Quick Contact */}
                <div className="bg-gradient-to-br from-cream-50 to-elegant-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-serif text-elegant-900 mb-6">
                    Quick <span className="text-rose-gold-600 italic">Contact</span>
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-rose-gold-100 rounded-full flex items-center justify-center">
                        <Phone className="text-rose-gold-600" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-elegant-900">Call Us</p>
                        <p className="text-elegant-600">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-rose-gold-100 rounded-full flex items-center justify-center">
                        <Mail className="text-rose-gold-600" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-elegant-900">Email Us</p>
                        <p className="text-elegant-600">hello@luxe.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-rose-gold-100 rounded-full flex items-center justify-center">
                        <Clock className="text-rose-gold-600" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-elegant-900">Hours</p>
                        <p className="text-elegant-600">Mon-Sat: 10AM-8PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-serif text-elegant-900 mb-6">
                    How Can We <span className="text-rose-gold-600 italic">Help?</span>
                  </h3>
                  
                  <div className="space-y-4">
                    {services.map((service, index) => {
                      const Icon = service.icon
                      return (
                        <div key={service.title} className="flex items-start gap-3 p-3 rounded-xl hover:bg-cream-50 transition-colors">
                          <Icon className="text-rose-gold-600 mt-1" size={18} />
                          <div>
                            <p className="font-medium text-elegant-900 text-sm">{service.title}</p>
                            <p className="text-elegant-600 text-xs">{service.description}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Store Locations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif font-light text-elegant-900 mb-6">
              Visit Our <span className="gradient-text italic">Boutiques</span>
            </h2>
            <p className="text-xl text-elegant-600 max-w-3xl mx-auto font-light leading-relaxed">
              Experience our collections in person at one of our elegant boutiques worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <div
                key={location.name}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={location.image}
                    alt={location.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-serif text-elegant-900 mb-4">
                    {location.name}
                  </h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className="text-rose-gold-600 mt-0.5" size={16} />
                      <p className="text-elegant-600">{location.address}</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Phone className="text-rose-gold-600" size={16} />
                      <p className="text-elegant-600">{location.phone}</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Mail className="text-rose-gold-600" size={16} />
                      <p className="text-elegant-600">{location.email}</p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Clock className="text-rose-gold-600 mt-0.5" size={16} />
                      <p className="text-elegant-600">{location.hours}</p>
                    </div>
                  </div>
                  
                  <button className="w-full mt-6 bg-elegant-100 text-elegant-700 py-3 rounded-xl font-medium hover:bg-rose-gold-50 hover:text-rose-gold-700 transition-all duration-300">
                    Get Directions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}