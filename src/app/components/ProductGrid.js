'use client'
import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import LoadingSpinner from './Loadingspinner'
import { Sparkles, SlidersHorizontal } from 'lucide-react'

export default function ProductGrid({ 
  products, 
  loading, 
  viewMode = 'grid',
  sortBy,
  onSortChange 
}) {
  const [displayedProducts, setDisplayedProducts] = useState([])
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    if (products) {
      setDisplayedProducts(products)
    }
  }, [products])

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'name', label: 'Name: A-Z' }
  ]

  if (loading) {
    return <LoadingSpinner />
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="w-32 h-32 bg-gradient-to-br from-elegant-100 to-elegant-200 rounded-full flex items-center justify-center mx-auto mb-8">
          <Sparkles className="text-elegant-400" size={40} />
        </div>
        <h3 className="text-2xl font-serif text-elegant-900 mb-4">No pieces found</h3>
        <p className="text-elegant-600 mb-8 font-light leading-relaxed max-w-md mx-auto">
          We couldn't find any jewelry matching your criteria. Try adjusting your search or explore our featured collection.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-gradient-to-r from-rose-gold-600 to-champagne-600 text-white px-8 py-4 rounded-full font-medium tracking-wide hover:from-rose-gold-700 hover:to-champagne-700 transition-all duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Explore All Jewelry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Advanced Toolbar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-elegant-100">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-rose-gold-400 rounded-full"></div>
            <span className="text-elegant-600 font-medium tracking-wide">
              {displayedProducts.length} exquisite {displayedProducts.length === 1 ? 'piece' : 'pieces'}
            </span>
            <div className="w-2 h-2 bg-rose-gold-400 rounded-full"></div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Advanced Sort */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-elegant-600 font-medium tracking-wide">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange && onSortChange(e.target.value)}
              className="px-4 py-2 border-2 border-elegant-200 rounded-xl focus:ring-2 focus:ring-rose-gold-300 focus:border-rose-gold-300 bg-white text-elegant-700 font-medium tracking-wide transition-all duration-300 min-w-[160px]"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all duration-300 ${
              showFilters
                ? 'bg-rose-gold-50 border-rose-gold-200 text-rose-gold-700'
                : 'bg-white border-elegant-200 text-elegant-700 hover:border-elegant-300'
            }`}
          >
            <SlidersHorizontal size={16} />
            <span className="font-medium tracking-wide">Filters</span>
          </button>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="glass-effect rounded-2xl p-8 border border-white/20 animate-fade-in">
          <h3 className="text-lg font-serif text-elegant-900 mb-6">Refine Your Selection</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Price Range */}
            <div>
              <h4 className="font-medium text-elegant-800 mb-4 tracking-wide">Price Range</h4>
              <div className="space-y-3">
                <label className="flex items-center gap-3 text-elegant-600 cursor-pointer hover:text-rose-gold-600 transition-colors">
                  <input type="checkbox" className="rounded border-elegant-300 text-rose-gold-600 focus:ring-rose-gold-300" />
                  <span className="font-light tracking-wide">Under $500</span>
                </label>
                <label className="flex items-center gap-3 text-elegant-600 cursor-pointer hover:text-rose-gold-600 transition-colors">
                  <input type="checkbox" className="rounded border-elegant-300 text-rose-gold-600 focus:ring-rose-gold-300" />
                  <span className="font-light tracking-wide">$500 - $1,000</span>
                </label>
                <label className="flex items-center gap-3 text-elegant-600 cursor-pointer hover:text-rose-gold-600 transition-colors">
                  <input type="checkbox" className="rounded border-elegant-300 text-rose-gold-600 focus:ring-rose-gold-300" />
                  <span className="font-light tracking-wide">$1,000 - $2,500</span>
                </label>
                <label className="flex items-center gap-3 text-elegant-600 cursor-pointer hover:text-rose-gold-600 transition-colors">
                  <input type="checkbox" className="rounded border-elegant-300 text-rose-gold-600 focus:ring-rose-gold-300" />
                  <span className="font-light tracking-wide">Over $2,500</span>
                </label>
              </div>
            </div>

            {/* Material */}
            <div>
              <h4 className="font-medium text-elegant-800 mb-4 tracking-wide">Material</h4>
              <div className="space-y-3">
                <label className="flex items-center gap-3 text-elegant-600 cursor-pointer hover:text-rose-gold-600 transition-colors">
                  <input type="checkbox" className="rounded border-elegant-300 text-rose-gold-600 focus:ring-rose-gold-300" />
                  <span className="font-light tracking-wide">Gold</span>
                </label>
                <label className="flex items-center gap-3 text-elegant-600 cursor-pointer hover:text-rose-gold-600 transition-colors">
                  <input type="checkbox" className="rounded border-elegant-300 text-rose-gold-600 focus:ring-rose-gold-300" />
                  <span className="font-light tracking-wide">Rose Gold</span>
                </label>
                <label className="flex items-center gap-3 text-elegant-600 cursor-pointer hover:text-rose-gold-600 transition-colors">
                  <input type="checkbox" className="rounded border-elegant-300 text-rose-gold-600 focus:ring-rose-gold-300" />
                  <span className="font-light tracking-wide">Silver</span>
                </label>
                <label className="flex items-center gap-3 text-elegant-600 cursor-pointer hover:text-rose-gold-600 transition-colors">
                  <input type="checkbox" className="rounded border-elegant-300 text-rose-gold-600 focus:ring-rose-gold-300" />
                  <span className="font-light tracking-wide">Platinum</span>
                </label>
              </div>
            </div>

            {/* Gemstone */}
            <div>
              <h4 className="font-medium text-elegant-800 mb-4 tracking-wide">Gemstone</h4>
              <div className="space-y-3">
                <label className="flex items-center gap-3 text-elegant-600 cursor-pointer hover:text-rose-gold-600 transition-colors">
                  <input type="checkbox" className="rounded border-elegant-300 text-rose-gold-600 focus:ring-rose-gold-300" />
                  <span className="font-light tracking-wide">Diamond</span>
                </label>
                <label className="flex items-center gap-3 text-elegant-600 cursor-pointer hover:text-rose-gold-600 transition-colors">
                  <input type="checkbox" className="rounded border-elegant-300 text-rose-gold-600 focus:ring-rose-gold-300" />
                  <span className="font-light tracking-wide">Pearl</span>
                </label>
                <label className="flex items-center gap-3 text-elegant-600 cursor-pointer hover:text-rose-gold-600 transition-colors">
                  <input type="checkbox" className="rounded border-elegant-300 text-rose-gold-600 focus:ring-rose-gold-300" />
                  <span className="font-light tracking-wide">Emerald</span>
                </label>
                <label className="flex items-center gap-3 text-elegant-600 cursor-pointer hover:text-rose-gold-600 transition-colors">
                  <input type="checkbox" className="rounded border-elegant-300 text-rose-gold-600 focus:ring-rose-gold-300" />
                  <span className="font-light tracking-wide">Sapphire</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-8 pt-6 border-t border-elegant-200">
            <button
              onClick={() => setShowFilters(false)}
              className="text-elegant-600 hover:text-elegant-800 font-medium tracking-wide transition-colors"
            >
              Clear All Filters
            </button>
            <button
              onClick={() => setShowFilters(false)}
              className="bg-gradient-to-r from-rose-gold-600 to-champagne-600 text-white px-6 py-3 rounded-xl font-medium tracking-wide hover:from-rose-gold-700 hover:to-champagne-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div
        className={`${
          viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'
            : 'space-y-8'
        } animate-fade-in`}
      >
        {displayedProducts.map((product, index) => (
          <div
            key={product.id}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <ProductCard product={product} viewMode={viewMode} />
          </div>
        ))}
      </div>

      {/* Collection Stats */}
      <div className="text-center py-8 border-t border-elegant-100">
        <p className="text-elegant-600 font-light tracking-wide">
          Showing {displayedProducts.length} of our finest pieces
        </p>
        <div className="flex items-center justify-center mt-4 gap-2">
          <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-rose-gold-300 to-transparent"></div>
          <Sparkles className="text-rose-gold-400" size={16} />
          <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-rose-gold-300 to-transparent"></div>
        </div>
      </div>
    </div>
  )
}