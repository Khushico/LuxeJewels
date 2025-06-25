'use client'
import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import SearchBar from '../components/Searchbar'
import LoadingSpinner from '../components/Loadingspinner'
import { getProducts } from '../../lib/mockData'
import { Sparkles, Grid, List } from 'lucide-react'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('featured')

  useEffect(() => {
    fetchProducts()
  }, [searchTerm, selectedCategory])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const data = await getProducts(searchTerm, selectedCategory)
      let sortedData = [...data]
      
      switch (sortBy) {
        case 'price-low':
          sortedData.sort((a, b) => a.price - b.price)
          break
        case 'price-high':
          sortedData.sort((a, b) => b.price - a.price)
          break
        case 'rating':
          sortedData.sort((a, b) => b.rating - a.rating)
          break
        case 'newest':
          sortedData.sort((a, b) => b.isNew - a.isNew)
          break
        default:
          break
      }
      
      setProducts(sortedData)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy)
    fetchProducts()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-elegant-50">
      {/* Hero Section */}
      <div className="hero-bg py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&h=1080&fit=crop&crop=center')] bg-cover bg-center opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="elegant-border pb-8 mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-2 h-2 bg-rose-gold-400 rounded-full"></div>
              <span className="text-rose-gold-600 font-medium tracking-widest uppercase text-sm">Premium Collection</span>
              <div className="w-2 h-2 bg-rose-gold-400 rounded-full"></div>
            </div>
            <h1 className="text-5xl lg:text-7xl font-serif font-light text-elegant-900 mb-8 leading-tight">
              Exquisite <span className="gradient-text font-normal italic">Jewelry</span>
              <br />
              <span className="text-4xl lg:text-5xl text-elegant-600 font-light">Collection</span>
            </h1>
            <p className="text-xl text-elegant-600 max-w-3xl mx-auto leading-relaxed font-light">
              Discover our handcrafted jewelry pieces, where timeless elegance meets contemporary design. 
              Each piece is meticulously selected to bring sophistication to your everyday style.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search and Filters */}
        <SearchBar
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
        />

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
          <div className="flex items-center gap-6">
            <span className="text-elegant-600 font-medium tracking-wide">
              {loading ? 'Loading...' : `${products.length} exquisite pieces`}
            </span>
            {searchTerm && (
              <span className="text-sm text-elegant-500 italic">
                for "{searchTerm}"
              </span>
            )}
          </div>

          <div className="flex items-center gap-6">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="px-6 py-3 border-2 border-elegant-200 rounded-full focus:ring-2 focus:ring-rose-gold-300 focus:border-rose-gold-300 bg-white text-elegant-700 font-medium tracking-wide transition-all duration-300"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-elegant-100 rounded-full p-1.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-full transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-white text-rose-gold-600 shadow-md'
                    : 'text-elegant-600 hover:text-elegant-800'
                }`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-full transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'bg-white text-rose-gold-600 shadow-md'
                    : 'text-elegant-600 hover:text-elegant-800'
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {loading ? (
          <LoadingSpinner />
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-32 h-32 bg-gradient-to-br from-elegant-100 to-elegant-200 rounded-full flex items-center justify-center mx-auto mb-8">
              <Sparkles className="text-elegant-400" size={40} />
            </div>
            <h3 className="text-2xl font-serif text-elegant-900 mb-4">No pieces found</h3>
            <p className="text-elegant-600 mb-8 font-light leading-relaxed">
              We couldn't find any jewelry matching your criteria.<br />
              Try adjusting your search or explore our featured collection.
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
              }}
              className="btn-primary"
            >
              Explore All Jewelry
            </button>
          </div>
        ) : (
          <div
            className={`${
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'
                : 'space-y-8'
            } animate-fade-in`}
          >
            {products.map((product, index) => (
              <div
                key={product.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <ProductCard product={product} viewMode={viewMode} />
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {products.length > 0 && !loading && (
          <div className="text-center mt-16">
            <button className="btn-secondary group">
              <span>Discover More Pieces</span>
              <Sparkles size={16} className="ml-2 group-hover:scale-110 transition-transform duration-300" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}