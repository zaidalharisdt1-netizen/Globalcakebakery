import { Menu, Search, ShoppingCart, User, Headset } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onMenuOpen: () => void;
  onCartOpen: () => void;
  onSearchOpen: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isSearchOpen: boolean;
  onSearchClose: () => void;
}

export default function Header({
  cartCount,
  onMenuOpen,
  onCartOpen,
  onSearchOpen,
  searchQuery,
  onSearchChange,
  isSearchOpen,
  onSearchClose,
}: HeaderProps) {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm safe-top">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left: Menu Button */}
          <button
            onClick={onMenuOpen}
            className="touch-target flex items-center justify-center p-2 -ml-2 tap-highlight"
            aria-label="Menu"
          >
            <Menu className="w-6 h-6 text-[#2D2D2D]" />
          </button>

          {/* Center: Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#E84C3D] flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="45" r="28" fill="#F5DEB3"/>
                <ellipse cx="50" cy="40" rx="18" ry="14" fill="#D4A574"/>
                <circle cx="42" cy="38" r="3" fill="#8B4513" opacity="0.6"/>
                <circle cx="55" cy="36" r="2.5" fill="#8B4513" opacity="0.5"/>
                <rect x="35" y="70" width="30" height="4" rx="2" fill="#D4A574"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-[#E84C3D] leading-tight">GLOBAL CAKE</span>
              <span className="text-[10px] text-[#666] leading-tight">&amp; BAKERY</span>
            </div>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-1">
            {/* Customer Service */}
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target flex items-center justify-center p-2 tap-highlight"
              aria-label="Customer Service"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center">
                <Headset className="w-4 h-4 text-white" />
              </div>
            </a>

            {/* Search */}
            <button
              onClick={onSearchOpen}
              className="touch-target flex items-center justify-center p-2 tap-highlight"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-[#E84C3D]" />
            </button>

            {/* Cart */}
            <button
              onClick={onCartOpen}
              className="touch-target flex items-center justify-center p-2 relative tap-highlight"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5 text-[#E84C3D]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#E84C3D] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile */}
            <button
              className="touch-target flex items-center justify-center p-2 tap-highlight"
              aria-label="Profile"
            >
              <User className="w-5 h-5 text-[#E84C3D]" />
            </button>
          </div>
        </div>
      </header>

      {/* Search Bar Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] bg-white fade-in">
          <div className="flex items-center gap-2 px-4 py-3 border-b safe-top">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Cari produk..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#E84C3D]"
                autoFocus
              />
            </div>
            <button
              onClick={onSearchClose}
              className="px-3 py-2 text-sm text-[#E84C3D] font-medium tap-highlight"
            >
              Batal
            </button>
          </div>
          <div className="p-4">
            {searchQuery && (
              <p className="text-sm text-gray-500">
                Menampilkan hasil untuk &quot;{searchQuery}&quot;
              </p>
            )}
            {!searchQuery && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Pencarian Populer</p>
                <div className="flex flex-wrap gap-2">
                  {['Roti Tawar', 'Cheese Cake', 'Donut', 'Croissant', 'Bolu Gulung'].map((term) => (
                    <button
                      key={term}
                      onClick={() => onSearchChange(term)}
                      className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-600 tap-highlight"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
