import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import type { CartItem } from '../hooks/useStore';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  total: number;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemove,
  total,
}: CartDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 drawer-overlay"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-[400px] bg-white slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b safe-top">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#E84C3D]" />
            <h2 className="text-lg font-bold text-[#2D2D2D]">Keranjang</h2>
            <span className="px-2 py-0.5 bg-[#E84C3D] text-white text-xs rounded-full font-medium">
              {cart.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="touch-target p-2 tap-highlight"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-8">
              <div className="w-24 h-24 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-gray-300" />
              </div>
              <p className="text-center text-gray-500 font-medium">Keranjang masih kosong</p>
              <p className="text-center text-gray-400 text-sm mt-1">Yuk tambahkan produk favoritmu!</p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 bg-[#E84C3D] text-white text-sm font-medium rounded-full tap-highlight"
              >
                Mulai Belanja
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 p-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-[#2D2D2D] line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">{item.category}</p>
                    <p className="text-sm font-bold text-[#E84C3D] mt-1">
                      Rp. {(item.price * item.quantity).toLocaleString('id-ID')}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center tap-highlight"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center tap-highlight"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors tap-highlight"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t bg-white p-4 safe-bottom">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">Subtotal</span>
              <span className="text-lg font-bold text-[#E84C3D]">
                Rp. {total.toLocaleString('id-ID')}
              </span>
            </div>
            <p className="text-[10px] text-gray-400 mb-3">Belum termasuk ongkir</p>
            <button className="w-full py-3.5 bg-[#E84C3D] text-white font-semibold rounded-xl flex items-center justify-center gap-2 active:bg-[#c73e32] transition-colors tap-highlight">
              Checkout
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
