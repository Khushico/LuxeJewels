
'use client'
import { useState, useEffect, useContext } from 'react'
import { Search, X, Filter, Star } from 'lucide-react'
import { categories } from '../../lib/mockData'

export default function Searchbar({ 
  onSearch, 
  onCategoryChange, 
  searchTerm, 
  selectedCategory,
  showAdvancedFilters = false,
  onPriceRangeChange,
  onRatingFilter 
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [selectedRating, setSelectedRating] = useState(0)

  // If you have a SearchContext, you can use it like this:
  // const { recentSearches, addToRecentSearches, popularSearches } = useContext(SearchContext)

  useEffect(() => {
    setLocalSearchTerm(searchTerm)
  }, [searchTerm])

  const handleSearchChange = (e) => {
    const value = e.target.value
    setLocalSearchTerm(value)
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      onSearch(value)
      // If you have SearchContext: addToRecentSearches(value)
    }, 300)
    
    return () => clearTimeout(timeoutId)
  }

  const clearSearch = () => {
    setLocalSearchTerm('')
    onSearch('')
  }

  const handlePriceRangeChange = (type, value) => {
    const newRange = { ...priceRange, [type]: value }
    setPriceRange(newRange)
    
    // Apply price filter after user stops typing
    const timeoutId = setTimeout(() => {
      if (onPriceRangeChange) {
        onPriceRangeChange(newRange)
      }
    }, 500)
    
    return () => clearTimeout(timeoutId)
  }

  const handleRatingFilter = (rating) => {
    setSelectedRating(rating)
    if (onRatingFilter) {
      onRatingFilter(rating)
    }
  }

  const clearAllFilters = () => {
    setLocalSearchTerm('')
    setPriceRange({ min: '', max: '' })
    setSelectedRating(0)
    onSearch('')
    onCategoryChange('all')
    if (onPriceRangeChange) onPriceRangeChange({ min: '', max: '' })
    if (onRatingFilter) onRatingFilter(0)
  }

  const activeFiltersCount = [
    localSearchTerm,
    selectedCategory !== 'all' ? selectedCategory : null,
    priceRange.min || priceRange.max,
    selectedRating > 0 ? selectedRating : null
  ].filter(Boolean).length

  return (
    <div className="glass-effect rounded-3xl shadow-lg border border-white/20 p-8 mb-12 backdrop-blur-md">
      <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-elegant-400" />
            <input
              type="text"
              placeholder="Search for exquisite jewelry..."
              value={localSearchTerm}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-12 py-4 border-2 border-elegant-200 rounded-2xl focus:ring-2 focus:ring-rose-gold-300 focus:border-rose-gold-300 transition-all duration-300 bg-white/50 backdrop-blur-sm font-light tracking-wide"
            />
            {localSearchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-elegant-400 hover:text-elegant-600 transition-colors p-1 hover:bg-elegant-100 rounded-full"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Filter Toggle Button */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="lg:hidden flex items-center gap-3 px-6 py-4 bg-elegant-100 text-elegant-700 rounded-2xl hover:bg-elegant-200 transition-all duration-300 font-medium tracking-wide relative"
        >
          <Filter size={18} />
          Categories
          {activeFiltersCount > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-rose-gold-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {/* Advanced Filters Toggle */}
        {showAdvancedFilters && (
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="hidden lg:flex items-center gap-3 px-6 py-4 bg-elegant-100 text-elegant-700 rounded-2xl hover:bg-elegant-200 transition-all duration-300 font-medium tracking-wide"
          >
            <Filter size={18} />
            Advanced
          </button>
        )}

        {/* Desktop Category Filters */}
        <div className="hidden lg:flex items-center gap-3 flex-wrap">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 tracking-wide ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-rose-gold-600 to-champagne-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-elegant-700 hover:bg-elegant-50 border border-elegant-200 hover:border-elegant-300'
              }`}
            >
              {category.name}
              <span className="ml-2 text-xs opacity-75 font-light">({category.count})</span>
            </button>
          ))}
        </div>

        {/* Clear All Filters */}
        {activeFiltersCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="hidden lg:flex items-center gap-2 px-4 py-3 text-elegant-600 hover:text-rose-gold-600 transition-all duration-300 font-medium"
          >
            <X size={16} />
            Clear All
          </button>
        )}
      </div>

      {/* Advanced Filters Section */}
      {showAdvanced && showAdvancedFilters && (
        <div className="mt-6 pt-6 border-t border-elegant-200 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-elegant-700 mb-3">Price Range</label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                  className="flex-1 px-3 py-2 border border-elegant-200 rounded-lg focus:ring-2 focus:ring-rose-gold-300 focus:border-rose-gold-300 transition-all duration-300"
                />
                <span className="text-elegant-400">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                  className="flex-1 px-3 py-2 border border-elegant-200 rounded-lg focus:ring-2 focus:ring-rose-gold-300 focus:border-rose-gold-300 transition-all duration-300"
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-elegant-700 mb-3">Minimum Rating</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleRatingFilter(rating)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                      selectedRating === rating
                        ? 'bg-rose-gold-100 text-rose-gold-700 border border-rose-gold-300'
                        : 'bg-white text-elegant-600 border border-elegant-200 hover:bg-elegant-50'
                    }`}
                  >
                    <Star size={16} className={selectedRating === rating ? 'fill-current' : ''} />
                    {rating}+
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Category Filters */}
      {isFilterOpen && (
        <div className="lg:hidden mt-6 pt-6 border-t border-elegant-200 animate-fade-in">
          <div className="grid grid-cols-2 gap-3 mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  onCategoryChange(category.id)
                  setIsFilterOpen(false)
                }}
                className={`px-4 py-3 rounded-2xl font-medium transition-all duration-300 text-sm tracking-wide ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-rose-gold-600 to-champagne-600 text-white shadow-lg'
                    : 'bg-white text-elegant-700 hover:bg-elegant-50 border border-elegant-200'
                }`}
              >
                {category.name}
                <span className="ml-1 text-xs opacity-75 font-light">({category.count})</span>
              </button>
            ))}
          </div>

          {/* Mobile Clear All */}
          {activeFiltersCount > 0 && (
            <button
              onClick={() => {
                clearAllFilters()
                setIsFilterOpen(false)
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-elegant-100 text-elegant-700 rounded-xl hover:bg-elegant-200 transition-all duration-300 font-medium"
            >
              <X size={16} />
              Clear All Filters
            </button>
          )}
        </div>
      )}

      {/* Active Filters Display */}
      {(localSearchTerm || selectedCategory !== 'all' || priceRange.min || priceRange.max || selectedRating > 0) && (
        <div className="mt-6 pt-6 border-t border-elegant-200">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm text-elegant-600 font-medium tracking-wide">Active filters:</span>
            
            {localSearchTerm && (
              <span className="bg-cream-100 border border-cream-200 text-elegant-800 px-4 py-2 rounded-full text-sm flex items-center gap-2 font-light">
                Search: "<span className="font-medium">{localSearchTerm}</span>"
                <button onClick={clearSearch} className="hover:text-rose-gold-600 transition-colors">
                  <X size={14} />
                </button>
              </span>
            )}
            
            {selectedCategory !== 'all' && (
              <span className="bg-cream-100 border border-cream-200 text-elegant-800 px-4 py-2 rounded-full text-sm flex items-center gap-2 font-light">
                Category: <span className="font-medium">{categories.find(c => c.id === selectedCategory)?.name}</span>
                <button onClick={() => onCategoryChange('all')} className="hover:text-rose-gold-600 transition-colors">
                  <X size={14} />
                </button>
              </span>
            )}
            
            {(priceRange.min || priceRange.max) && (
              <span className="bg-cream-100 border border-cream-200 text-elegant-800 px-4 py-2 rounded-full text-sm flex items-center gap-2 font-light">
                Price: <span className="font-medium">${priceRange.min || '0'} - ${priceRange.max || '∞'}</span>
                <button 
                  onClick={() => {
                    setPriceRange({ min: '', max: '' })
                    if (onPriceRangeChange) onPriceRangeChange({ min: '', max: '' })
                  }} 
                  className="hover:text-rose-gold-600 transition-colors"
                >
                  <X size={14} />
                </button>
              </span>
            )}
            
            {selectedRating > 0 && (
              <span className="bg-cream-100 border border-cream-200 text-elegant-800 px-4 py-2 rounded-full text-sm flex items-center gap-2 font-light">
                Rating: <span className="font-medium">{selectedRating}+ stars</span>
                <button onClick={() => handleRatingFilter(0)} className="hover:text-rose-gold-600 transition-colors">
                  <X size={14} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}