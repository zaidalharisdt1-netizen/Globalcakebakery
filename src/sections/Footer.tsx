import { Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  const links = [
    { label: 'Store Location', href: '#' },
    { label: 'Terms of Use', href: '#' },
    { label: 'About Us', href: '#' },
    { label: 'Disclaimer', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Setting Cookies', href: '#' },
  ];

  return (
    <footer className="bg-[#E84C3D] text-white pt-8 pb-6">
      {/* Links Grid */}
      <div className="grid grid-cols-3 gap-x-4 gap-y-4 px-6 mb-6">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-xs font-medium text-white/90 hover:text-white transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Social Media */}
      <div className="flex justify-center gap-8 mb-5">
        <a
          href="https://instagram.com/globalcakebakery"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <Instagram className="w-5 h-5 text-white" />
        </a>
        <a
          href="https://facebook.com/globalcakebakery"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <Facebook className="w-5 h-5 text-white" />
        </a>
      </div>

      {/* App Download Buttons */}
      <div className="flex justify-center gap-3 mb-5 px-4">
        <button className="flex items-center gap-2 bg-black rounded-lg px-4 py-2.5 tap-highlight">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#fff">
            <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5ZM16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12ZM20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.53 12.9 20.18 13.18L17.89 14.5L15.39 12L17.89 9.5L20.16 10.81ZM6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z"/>
          </svg>
          <div className="text-left">
            <p className="text-[8px] text-white/80 leading-none">GET IT ON</p>
            <p className="text-xs font-bold text-white leading-tight">Google Play</p>
          </div>
        </button>
        <button className="flex items-center gap-2 bg-black rounded-lg px-4 py-2.5 tap-highlight">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#fff">
            <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 16.94 2.94 12.64 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
          </svg>
          <div className="text-left">
            <p className="text-[8px] text-white/80 leading-none">Download on the</p>
            <p className="text-xs font-bold text-white leading-tight">App Store</p>
          </div>
        </button>
      </div>

      {/* Delivery Info */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <svg width="40" height="28" viewBox="0 0 60 40" fill="none">
          <rect x="5" y="15" width="35" height="18" rx="3" fill="white"/>
          <circle cx="15" cy="35" r="5" fill="#333"/>
          <circle cx="35" cy="35" r="5" fill="#333"/>
          <circle cx="15" cy="35" r="2" fill="#666"/>
          <circle cx="35" cy="35" r="2" fill="#666"/>
          <path d="M40 20 L52 20 L55 28 L40 28 Z" fill="white"/>
          <rect x="20" y="8" width="18" height="12" rx="2" fill="white"/>
          <circle cx="29" cy="5" r="3" fill="white"/>
        </svg>
        <div>
          <p className="text-sm font-bold text-white">Global Delivery</p>
          <p className="text-xs text-white/80">021-6918181</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center border-t border-white/20 pt-4 px-4">
        <p className="text-[10px] text-white/70">
          &copy; {new Date().getFullYear()} Global Cake &amp; Bakery. All rights reserved.
        </p>
        <p className="text-[9px] text-white/50 mt-1">
          Jl. Pahlawan Revolusi, Klender, Jakarta Timur
        </p>
      </div>
    </footer>
  );
}
