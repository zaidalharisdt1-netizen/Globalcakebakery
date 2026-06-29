import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

interface CookieConsentProps {
  consent: 'accepted' | 'declined' | null;
  onAccept: () => void;
  onDecline: () => void;
  forceShow?: boolean;
  onClose?: () => void;
}

export default function CookieConsent({
  consent,
  onAccept,
  onDecline,
  forceShow = false,
  onClose,
}: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (forceShow) {
      setIsVisible(true);
    } else if (consent === null) {
      // Delay showing to not immediately popup
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [consent, forceShow]);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center px-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 fade-in">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-1 tap-highlight"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-[#E84C3D]/10 flex items-center justify-center">
            <Cookie className="w-7 h-7 text-[#E84C3D]" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-center text-[#2D2D2D] mb-2">
          Setting Cookies
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 text-center leading-relaxed mb-5">
          Kami menggunakan cookies untuk menjaga fungsi dasar situs dan menganalisis
          penggunaan situs agar kami dapat meningkatkan layanan. Dengan mengklik
          &quot;Terima&quot;, Anda menyetujui penggunaan cookies sesuai dengan{' '}
          <a href="#" className="text-[#E84C3D] underline">
            Kebijakan Privasi
          </a>
          .
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              onDecline();
              handleClose();
            }}
            className="flex-1 py-3 border-2 border-gray-300 text-gray-600 font-medium rounded-xl text-sm tap-highlight"
          >
            Tolak
          </button>
          <button
            onClick={() => {
              onAccept();
              handleClose();
            }}
            className="flex-1 py-3 bg-[#E84C3D] text-white font-medium rounded-xl text-sm tap-highlight"
          >
            Terima
          </button>
        </div>
      </div>
    </div>
  );
}
