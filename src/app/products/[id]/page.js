'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  Minus, 
  Plus, 
  Share2, 
  ArrowLeft,
  Shield,
  Truck,
  RotateCcw,
  Award,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Check
} from 'lucide-react'
import { jewelryProducts } from '../../../lib/mockData'
import ProductCard from '../../components/ProductCard'
import WishlistHeartButton from '../../components/WishlistHeartButton'
import { useCart } from '../../context/CartContext'

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedMaterial, setSelectedMaterial] = useState('')
  const [relatedProducts, setRelatedProducts] = useState([])
  const [activeTab, setActiveTab] = useState('description')
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const { addToCart } = useCart()

  useEffect(() => {
    if (params.id) {
      const foundProduct = jewelryProducts.find(p => p.id === parseInt(params.id))
      if (foundProduct) {
        const enhancedProduct = {
          ...foundProduct,
          images: [
            foundProduct.image,
            foundProduct.image.replace('w=500&h=500', 'w=800&h=800'),
            foundProduct.image.replace('crop=center', 'crop=top'),
            foundProduct.image.replace('crop=center', 'crop=bottom')
          ],
          description: `Exquisite ${foundProduct.name.toLowerCase()} crafted with meticulous attention to detail. This stunning piece combines timeless elegance with contemporary sophistication, making it perfect for both special occasions and everyday luxury. Each element is carefully selected and masterfully assembled by our skilled artisans.`,
          specifications: {
            material: foundProduct.category === 'rings' ? 'Rose Gold' : 'Sterling Silver',
            gemstone: foundProduct.name.includes('Diamond') ? 'Diamond' : foundProduct.name.includes('Pearl') ? 'Pearl' : 'Gemstone',
            weight: `${Math.floor(Math.random() * 10) + 5}g`,
            dimensions: foundProduct.category === 'rings' ? 'Size 6-8 Available' : '16-18 inch adjustable',
            finish: 'Polished',
            warranty: 'Lifetime Warranty Included'
          },
          sizes: foundProduct.category === 'rings' ? ['5', '6', '7', '8', '9'] : ['One Size'],
          materials: foundProduct.category === 'rings' ? ['Rose Gold', 'White Gold', 'Yellow Gold'] : ['Sterling Silver', 'Gold Plated']
        }
        
        setProduct(enhancedProduct)
        
        // Set default selections
        setSelectedSize(enhancedProduct.sizes[0])
        setSelectedMaterial(enhancedProduct.materials[0])

        // Get related products
        const related = jewelryProducts
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 4)
        setRelatedProducts(related)
      }
    }
  }, [params.id])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change))
  }

  const handleAddToCart = async () => {
    if (!product) return
    
    setIsAddingToCart(true)
    
    // Add to cart with selected options
    addToCart(product, {
      quantity: quantity,
      size: selectedSize,
      metal: selectedMaterial
    })
    
    // Show success feedback
    setTimeout(() => {
      setIsAddingToCart(false)
      setAddedToCart(true)
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setAddedToCart(false)
      }, 3000)
    }, 1000)
  }

  const discountPercentage = product?.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-elegant-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-gold-200 border-t-rose-gold-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-elegant-600 font-light tracking-wide">Loading exquisite details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-elegant-50">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 text-sm">
          <Link href="/" className="text-elegant-600 hover:text-rose-gold-600 transition-colors font-light tracking-wide">
            Home
          </Link>
          <ChevronRight size={16} className="text-elegant-400" />
          <Link href="/products" className="text-elegant-600 hover:text-rose-gold-600 transition-colors font-light tracking-wide">
            Collection
          </Link>
          <ChevronRight size={16} className="text-elegant-400" />
          <span className="text-elegant-800 font-medium tracking-wide">{product.name}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-3xl overflow-hidden shadow-xl">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover transition-all duration-500"
                priority
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : product.images.length - 1)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 glass-effect rounded-full flex items-center justify-center shadow-lg hover:bg-white/40 transition-all duration-300"
              >
                <ChevronLeft size={20} className="text-elegant-700" />
              </button>
              <button
                onClick={() => setSelectedImage(prev => prev < product.images.length - 1 ? prev + 1 : 0)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 glass-effect rounded-full flex items-center justify-center shadow-lg hover:bg-white/40 transition-all duration-300"
              >
                <ChevronRight size={20} className="text-elegant-700" />
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      selectedImage === index ? 'bg-rose-gold-600' : 'bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-2xl overflow-hidden transition-all duration-300 ${
                    selectedImage === index 
                      ? 'ring-2 ring-rose-gold-400 shadow-lg scale-105' 
                      : 'hover:scale-105 hover:shadow-md'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              {/* Badges */}
              <div className="flex gap-3 mb-4">
                {product.isNew && (
                  <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold tracking-wide">
                    New Arrival
                  </span>
                )}
                {product.isSale && (
                  <span className="bg-gradient-to-r from-rose-gold-600 to-champagne-600 text-white px-4 py-2 rounded-full text-sm font-bold tracking-wide">
                    {discountPercentage}% Off
                  </span>
                )}
              </div>

              <h1 className="text-4xl font-serif text-elegant-900 mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`${
                        i < Math.floor(product.rating)
                          ? 'text-champagne-500 fill-champagne-500'
                          : 'text-elegant-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-elegant-600 font-light tracking-wide">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-serif font-bold text-elegant-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-2xl text-elegant-400 line-through font-light">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Product Options */}
            <div className="space-y-6">
              {/* Size Selection */}
              {product.sizes && product.sizes[0] !== 'One Size' && (
                <div>
                  <h3 className="text-lg font-medium text-elegant-800 mb-4 tracking-wide">Size</h3>
                  <div className="flex gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 rounded-xl border-2 font-medium transition-all duration-300 ${
                          selectedSize === size
                            ? 'border-rose-gold-400 bg-rose-gold-50 text-rose-gold-700'
                            : 'border-elegant-200 hover:border-elegant-300 text-elegant-600'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Material Selection */}
              <div>
                <h3 className="text-lg font-medium text-elegant-800 mb-4 tracking-wide">Material</h3>
                <div className="flex gap-3">
                  {product.materials.map((material) => (
                    <button
                      key={material}
                      onClick={() => setSelectedMaterial(material)}
                      className={`px-6 py-3 rounded-xl border-2 font-medium transition-all duration-300 tracking-wide ${
                        selectedMaterial === material
                          ? 'border-rose-gold-400 bg-rose-gold-50 text-rose-gold-700'
                          : 'border-elegant-200 hover:border-elegant-300 text-elegant-600'
                      }`}
                    >
                      {material}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-lg font-medium text-elegant-800 mb-4 tracking-wide">Quantity</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-elegant-200 rounded-xl">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-3 hover:bg-elegant-50 transition-colors rounded-l-xl"
                    >
                      <Minus size={16} className="text-elegant-600" />
                    </button>
                    <span className="px-6 py-3 font-medium text-elegant-800 min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-3 hover:bg-elegant-50 transition-colors rounded-r-xl"
                    >
                      <Plus size={16} className="text-elegant-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button 
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className={`w-full py-5 rounded-2xl font-medium tracking-wide transition-all duration-500 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:cursor-not-allowed disabled:transform-none ${
                  addedToCart 
                    ? 'bg-gradient-to-r from-green-600 to-green-500 text-white'
                    : isAddingToCart
                    ? 'bg-gradient-to-r from-elegant-600 to-elegant-500 text-white opacity-75'
                    : 'bg-gradient-to-r from-elegant-800 to-elegant-700 text-white hover:from-rose-gold-600 hover:to-champagne-600'
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check size={20} />
                    <span className="text-lg">Added to Cart!</span>
                  </>
                ) : isAddingToCart ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span className="text-lg">Adding to Cart...</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={20} />
                    <span className="text-lg">Add to Cart</span>
                  </>
                )}
              </button>

              <div className="flex gap-4">
                <div className="flex-1">
                  <WishlistHeartButton 
                    product={product} 
                    className="w-full py-4 rounded-2xl border-2 border-elegant-200 hover:border-elegant-300 text-elegant-600 font-medium transition-all duration-300 flex items-center justify-center gap-3"
                  />
                </div>

                <button className="flex-1 py-4 rounded-2xl border-2 border-elegant-200 hover:border-elegant-300 text-elegant-600 font-medium transition-all duration-300 flex items-center justify-center gap-3">
                  <Share2 size={18} />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-elegant-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-rose-gold-100 rounded-full flex items-center justify-center">
                  <Shield size={18} className="text-rose-gold-600" />
                </div>
                <div>
                  <p className="font-medium text-elegant-800 text-sm">Lifetime Warranty</p>
                  <p className="text-elegant-600 text-xs font-light">Comprehensive coverage</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-rose-gold-100 rounded-full flex items-center justify-center">
                  <Truck size={18} className="text-rose-gold-600" />
                </div>
                <div>
                  <p className="font-medium text-elegant-800 text-sm">Free Shipping</p>
                  <p className="text-elegant-600 text-xs font-light">On orders over $500</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-rose-gold-100 rounded-full flex items-center justify-center">
                  <RotateCcw size={18} className="text-rose-gold-600" />
                </div>
                <div>
                  <p className="font-medium text-elegant-800 text-sm">Easy Returns</p>
                  <p className="text-elegant-600 text-xs font-light">30-day return policy</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-rose-gold-100 rounded-full flex items-center justify-center">
                  <Award size={18} className="text-rose-gold-600" />
                </div>
                <div>
                  <p className="font-medium text-elegant-800 text-sm">Certified Authentic</p>
                  <p className="text-elegant-600 text-xs font-light">Guaranteed quality</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="mt-24">
          <div className="border-b border-elegant-200 mb-8">
            <div className="flex gap-8">
              {['description', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 font-medium tracking-wide transition-all duration-300 relative ${
                    activeTab === tab
                      ? 'text-rose-gold-600 border-b-2 border-rose-gold-600'
                      : 'text-elegant-600 hover:text-elegant-800'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            {activeTab === 'description' && (
              <div className="prose prose-elegant max-w-none">
                <p className="text-elegant-700 leading-relaxed font-light text-lg">
                  {product.description}
                </p>
                <p className="text-elegant-600 leading-relaxed font-light mt-6">
                  This exceptional piece represents the perfect fusion of traditional craftsmanship and contemporary design. 
                  Our master artisans employ time-honored techniques passed down through generations, ensuring each piece 
                  meets our exacting standards of quality and beauty.
                </p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-3 border-b border-elegant-100">
                    <span className="font-medium text-elegant-800 capitalize tracking-wide">{key}:</span>
                    <span className="text-elegant-600 font-light">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="text-4xl font-serif text-elegant-900 mb-2">{product.rating}</div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={`${
                          i < Math.floor(product.rating)
                            ? 'text-champagne-500 fill-champagne-500'
                            : 'text-elegant-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-elegant-600 font-light">Based on {product.reviews} reviews</p>
                </div>

                <div className="space-y-6">
                  {[
                    { name: 'Sarah M.', rating: 5, comment: 'Absolutely stunning piece! The craftsmanship is exceptional and it arrived beautifully packaged.' },
                    { name: 'Jennifer L.', rating: 5, comment: 'This is even more beautiful in person. The quality is outstanding and I receive compliments every time I wear it.' },
                    { name: 'Maria R.', rating: 4, comment: 'Gorgeous jewelry with excellent attention to detail. Perfect for special occasions.' }
                  ].map((review, index) => (
                    <div key={index} className="border border-elegant-100 rounded-xl p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-rose-gold-100 to-champagne-100 rounded-full flex items-center justify-center">
                          <span className="font-medium text-rose-gold-700">{review.name[0]}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-elegant-800">{review.name}</h4>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={`${
                                  i < review.rating
                                    ? 'text-champagne-500 fill-champagne-500'
                                    : 'text-elegant-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-elegant-700 font-light leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <div className="text-center mb-12">
              <div className="elegant-border pb-8 mb-8">
                <h2 className="text-3xl font-serif text-elegant-900 mb-4">
                  You Might Also <span className="text-rose-gold-600 italic">Love</span>
                </h2>
                <p className="text-elegant-600 font-light tracking-wide max-w-2xl mx-auto">
                  Discover more pieces from our curated collection that complement your style
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <div
                  key={relatedProduct.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <ProductCard product={relatedProduct} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}