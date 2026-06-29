import { X, ChevronRight, Cookie } from 'lucide-react';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCookieSettings: () => void;
}

const menuItems = [
  { label: 'Beranda', href: '#' },
  { label: 'Snack Box', href: '#snackbox' },
  {
    label: 'Menu',
    href: '#',
    children: [
      { label: 'Breads', href: '#category' },
      { label: 'Cakes', href: '#category' },
      { label: 'Traditional Snacks', href: '#category' },
      { label: 'Donuts', href: '#category' },
      { label: 'Pastry', href: '#category' },
    ],
  },
  { label: 'Social', href: '#social' },
  { label: 'Store', href: '#store' },
  { label: 'News & Promo', href: '#promo' },
  { label: 'Choose Your Moment', href: '#moments' },
  { label: 'Career', href: '#career' },
  { label: 'FAQ', href: '#faq' },
  { label: 'About Us', href: '#about' },
];

export default function MenuDrawer({ isOpen, onClose, onCookieSettings }: MenuDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 drawer-overlay"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute left-0 top-0 bottom-0 w-[85%] max-w-[320px] bg-white slide-up flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b safe-top">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#E84C3D] flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="45" r="28" fill="#F5DEB3"/>
                <ellipse cx="50" cy="40" rx="18" ry="14" fill="#D4A574"/>
              </svg>
            </div>
            <span className="font-bold text-[#2D2D2D]">Menu</span>
          </div>
          <button
            onClick={onClose}
            className="touch-target p-2 tap-highlight"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-[#E84C3D]" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto no-scrollbar py-2">
          {menuItems.map((item, index) => (
            <div key={item.label}>
              {item.children ? (
                <div>
                  <button className="w-full flex items-center justify-between px-5 py-3.5 text-left tap-highlight">
                    <span className="text-sm font-medium text-[#2D2D2D]">{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                  <div className="pl-8 bg-gray-50">
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="block px-5 py-2.5 text-sm text-gray-600 hover:text-[#E84C3D] transition-colors"
                        onClick={onClose}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  href={item.href}
                  className="flex items-center justify-between px-5 py-3.5 tap-highlight"
                  onClick={onClose}
                >
                  <span className="text-sm font-medium text-[#2D2D2D]">{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </a>
              )}
              {index < menuItems.length - 1 && (
                <div className="mx-5 border-b border-gray-100" />
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t p-4 safe-bottom">
          <button
            onClick={() => {
              onCookieSettings();
              onClose();
            }}
            className="flex items-center gap-2 text-sm text-gray-600 tap-highlight"
          >
            <Cookie className="w-4 h-4" />
            Pengaturan Cookies
          </button>
        </div>
      </div>
    </div>
  );
}
