// Mock jewelry product data with reliable image URLs
export const jewelryProducts = [
  {
    id: 1,
    name: "Diamond Solitaire Ring",
    price: 2999,
    originalPrice: 3999,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=500&fit=crop&crop=center",
    category: "rings",
    rating: 4.8,
    reviews: 124,
    isNew: false,
    isSale: true
  },
  {
    id: 2,
    name: "Gold Pearl Necklace",
    price: 1899,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop&crop=center",
    category: "necklaces",
    rating: 4.9,
    reviews: 89,
    isNew: true,
    isSale: false
  },
  {
    id: 3,
    name: "Rose Gold Bracelet",
    price: 899,
    originalPrice: 1199,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=500&fit=crop&crop=center",
    category: "bracelets",
    rating: 4.7,
    reviews: 67,
    isNew: false,
    isSale: true
  },
  {
    id: 4,
    name: "Emerald Drop Earrings",
    price: 1299,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop&crop=center",
    category: "earrings",
    rating: 4.6,
    reviews: 156,
    isNew: false,
    isSale: false
  },
  {
    id: 5,
    name: "Vintage Diamond Brooch",
    price: 2199,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=500&h=500&fit=crop&crop=center",
    category: "brooches",
    rating: 4.8,
    reviews: 43,
    isNew: true,
    isSale: false
  },
  {
    id: 6,
    name: "Sapphire Tennis Bracelet",
    price: 3499,
    originalPrice: 4299,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop&crop=center",
    category: "bracelets",
    rating: 4.9,
    reviews: 201,
    isNew: false,
    isSale: true
  },
  {
    id: 7,
    name: "White Gold Hoop Earrings",
    price: 799,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=500&h=500&fit=crop&crop=center",
    category: "earrings",
    rating: 4.5,
    reviews: 112,
    isNew: false,
    isSale: false
  },
  {
    id: 8,
    name: "Ruby Heart Pendant",
    price: 1599,
    originalPrice: 1999,
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=500&h=500&fit=crop&crop=center",
    category: "necklaces",
    rating: 4.7,
    reviews: 88,
    isNew: true,
    isSale: true
  },
  {
    id: 9,
    name: "Platinum Wedding Band",
    price: 1999,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&h=500&fit=crop&crop=center",
    category: "rings",
    rating: 4.9,
    reviews: 234,
    isNew: false,
    isSale: false
  },
  {
    id: 10,
    name: "Delicate Chain Necklace",
    price: 599,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop&crop=center",
    category: "necklaces",
    rating: 4.6,
    reviews: 78,
    isNew: false,
    isSale: false
  },
  {
    id: 11,
    name: "Vintage Signet Ring",
    price: 1299,
    originalPrice: 1699,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=500&fit=crop&crop=center",
    category: "rings",
    rating: 4.7,
    reviews: 95,
    isNew: false,
    isSale: true
  },
  {
    id: 12,
    name: "Pearl Drop Earrings",
    price: 899,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=500&h=500&fit=crop&crop=center",
    category: "earrings",
    rating: 4.8,
    reviews: 134,
    isNew: true,
    isSale: false
  }
];

export const categories = [
  { id: 'all', name: 'All Items', count: jewelryProducts.length },
  { id: 'rings', name: 'Rings', count: jewelryProducts.filter(p => p.category === 'rings').length },
  { id: 'necklaces', name: 'Necklaces', count: jewelryProducts.filter(p => p.category === 'necklaces').length },
  { id: 'earrings', name: 'Earrings', count: jewelryProducts.filter(p => p.category === 'earrings').length },
  { id: 'bracelets', name: 'Bracelets', count: jewelryProducts.filter(p => p.category === 'bracelets').length },
  { id: 'brooches', name: 'Brooches', count: jewelryProducts.filter(p => p.category === 'brooches').length },
];

// Simulate API delay
export const getProducts = async (searchTerm = '', category = 'all') => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filtered = jewelryProducts;
  
  if (category !== 'all') {
    filtered = filtered.filter(product => product.category === category);
  }
  
  if (searchTerm) {
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  return filtered;
};