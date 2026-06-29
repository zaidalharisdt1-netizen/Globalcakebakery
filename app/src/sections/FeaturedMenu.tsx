import { useState } from 'react';
import { products } from '../hooks/useStore';
import type { Product } from '../hooks/useStore';
import { ChevronRight, Star } from 'lucide-react';

interface FeaturedMenuProps {
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  searchQuery: string;
}

const tabs = ['All', 'Breads', 'Traditional Snacks', 'Chiffon & Roll Cakes', 'Donuts', 'Cakes', 'Cookies', 'Pastry and Danish'];

export default function FeaturedMenu({
  onAddToCart,
  onProductClick,
  activeCategory,
  onCategoryChange,
  searchQuery,
}: FeaturedMenuProps) {
  const [visibleTabs, setVisibleTabs] = useState(0);

  const filteredProducts = products.filter((p) => {
    const matchCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const showNextTabs = () => {
    setVisibleTabs((prev) => Math.min(prev + 1, tabs.length - 4));
  };

  return (
    <section className="py-6 bg-white">
      {/* Section Header */}
      <div className="text-center mb-4 px-4">
        <div className="flex justify-center mb-2">
          <svg width="40" height="24" viewBox="0 0 60 36" fill="none">
            <path d="M10 30 Q15 10 30 15 Q45 20 50 5" stroke="#E84C3D" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <circle cx="30" cy="18" r="8" fill="#E84C3D" opacity="0.2"/>
          </svg>
        </div>
        <h2 className="text-xl font-bold text-[#2D2D2D]">Featured Menu</h2>
        <p className="text-sm text-gray-500 mt-1">The best from our kitchen</p>
      </div>

      {/* Category Tabs */}
      <div className="relative mb-4">
        <div className="flex overflow-x-auto no-scrollbar px-4 gap-2">
          {tabs.slice(visibleTabs, visibleTabs + 5).map((tab) => (
            <button
              key={tab}
              onClick={() => onCategoryChange(tab)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap tap-highlight ${
                activeCategory === tab
                  ? 'bg-[#E84C3D] text-white shadow-md'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        {visibleTabs + 5 < tabs.length && (
          <button
            onClick={showNextTabs}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center z-10"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        )}
      </div>

      {/* Product Grid */}
      <div className="px-4">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </div>
            <p className="text-gray-500 text-sm">Produk tidak ditemukan</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onProductClick={onProductClick}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({
  product,
  onAddToCart,
  onProductClick,
}: {
  product: Product;
  onAddToCart: (p: Product) => void;
  onProductClick: (p: Product) => void;
}) {
  return (
    <div className="product-card bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      {/* Product Image */}
      <button
        onClick={() => onProductClick(product)}
        className="w-full aspect-square relative tap-highlight"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Stock badge */}
        {product.stock === 'limited' && (
          <span className="absolute top-2 left-2 px-2 py-0.5 bg-amber-500 text-white text-[9px] font-bold rounded-full">
            STOK TERBATAS
          </span>
        )}
      </button>

      {/* Product Info */}
      <div className="p-3">
        <button onClick={() => onProductClick(product)} className="text-left w-full">
          <h3 className="text-xs font-semibold text-[#2D2D2D] line-clamp-2 min-h-[2rem] leading-tight">
            {product.name}
          </h3>
        </button>

        {/* Price */}
        <div className="mt-1.5">
          <span className="text-[10px] text-gray-400 line-through">
            Rp. {product.originalPrice.toLocaleString('id-ID')}
          </span>
          <p className="text-sm font-bold text-[#E84C3D]">
            Rp. {product.price.toLocaleString('id-ID')}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-0.5 mt-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-3 h-3 ${
                star <= Math.round(product.rating)
                  ? 'fill-[#FFB800] text-[#FFB800]'
                  : 'fill-gray-200 text-gray-200'
              }`}
            />
          ))}
          <span className="text-[10px] text-gray-500 ml-1">{product.rating}</span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(product)}
          className="w-full mt-2.5 py-2 bg-[#E84C3D] text-white text-xs font-semibold rounded-md active:bg-[#c73e32] transition-colors tap-highlight"
        >
          add to cart
        </button>
      </div>
    </div>
  );
}
