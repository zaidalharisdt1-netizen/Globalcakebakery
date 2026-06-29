import { ShoppingCart } from 'lucide-react';

interface FloatingCartButtonProps {
  cartCount: number;
  onClick: () => void;
}

export default function FloatingCartButton({ cartCount, onClick }: FloatingCartButtonProps) {
  if (cartCount === 0) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-5 z-50 w-14 h-14 bg-[#E84C3D] text-white rounded-full shadow-lg flex items-center justify-center tap-highlight active:scale-95 transition-transform"
      aria-label="Open Cart"
    >
      <ShoppingCart className="w-6 h-6" />
      <span className="absolute -top-1 -right-1 w-6 h-6 bg-[#D4A853] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
        {cartCount}
      </span>
    </button>
  );
}
