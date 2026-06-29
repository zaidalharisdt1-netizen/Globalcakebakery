import { X, Minus, Plus, Star, ShoppingCart, Check } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '../hooks/useStore';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [showAdded, setShowAdded] = useState(false);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    // Add multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    setShowAdded(true);
    setTimeout(() => {
      setShowAdded(false);
      onClose();
      setQuantity(1);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 drawer-overlay"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-t-2xl sm:rounded-2xl max-h-[85vh] overflow-y-auto slide-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md tap-highlight"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        {/* Product Image */}
        <div className="w-full aspect-[4/3] bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="p-5">
          {/* Category */}
          <span className="text-xs font-medium text-[#E84C3D] bg-[#E84C3D]/10 px-2.5 py-1 rounded-full">
            {product.category}
          </span>

          {/* Name */}
          <h2 className="text-xl font-bold text-[#2D2D2D] mt-3">
            {product.name}
          </h2>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= Math.round(product.rating)
                    ? 'fill-[#FFB800] text-[#FFB800]'
                    : 'fill-gray-200 text-gray-200'
                }`}
              />
            ))}
            <span className="text-sm text-gray-500 ml-1">{product.rating} ({Math.floor(Math.random() * 200 + 50)} ulasan)</span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mt-3 leading-relaxed">
            {product.description}
          </p>

          {/* Price */}
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#E84C3D]">
              Rp. {product.price.toLocaleString('id-ID')}
            </span>
            <span className="text-sm text-gray-400 line-through">
              Rp. {product.originalPrice.toLocaleString('id-ID')}
            </span>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between mt-5 py-4 border-t border-gray-100">
            <span className="text-sm font-medium text-gray-700">Jumlah</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center tap-highlight"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-9 h-9 rounded-full border-2 border-[#E84C3D] flex items-center justify-center tap-highlight"
              >
                <Plus className="w-4 h-4 text-[#E84C3D]" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={showAdded}
            className={`w-full mt-4 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all tap-highlight ${
              showAdded
                ? 'bg-green-500 text-white'
                : 'bg-[#E84C3D] text-white active:bg-[#c73e32]'
            }`}
          >
            {showAdded ? (
              <>
                <Check className="w-5 h-5" />
                Ditambahkan!
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                Tambah ke Keranjang
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
