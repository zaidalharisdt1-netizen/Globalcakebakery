import { useEffect, useState } from 'react';
import { X, Download } from 'lucide-react';

interface InstallBannerProps {
  onInstall: (prompt: any) => void;
}

export default function InstallBanner({ onInstall }: InstallBannerProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show banner after a delay
      setTimeout(() => setIsVisible(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Check if app was installed
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setIsVisible(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setIsVisible(false);
    }
    onInstall(deferredPrompt);
  };

  const handleClose = () => {
    setIsVisible(false);
    // Don't show again for 24 hours
    localStorage.setItem('installBannerDismissed', Date.now().toString());
  };

  // Check if recently dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem('installBannerDismissed');
    if (dismissed) {
      const hoursSince = (Date.now() - parseInt(dismissed)) / (1000 * 60 * 60);
      if (hoursSince < 24) {
        setIsVisible(false);
      }
    }
  }, []);

  if (!isVisible || isInstalled) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.15)] rounded-t-2xl p-4 install-prompt safe-bottom">
      <div className="flex items-start gap-3">
        {/* App Icon */}
        <div className="w-12 h-12 rounded-xl bg-[#E84C3D] flex items-center justify-center flex-shrink-0">
          <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="45" r="28" fill="#F5DEB3"/>
            <ellipse cx="50" cy="40" rx="18" ry="14" fill="#D4A574"/>
            <circle cx="42" cy="38" r="3" fill="#8B4513" opacity="0.6"/>
            <circle cx="55" cy="36" r="2.5" fill="#8B4513" opacity="0.5"/>
            <rect x="35" y="70" width="30" height="4" rx="2" fill="#D4A574"/>
          </svg>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-sm font-bold text-[#2D2D2D]">Global Cake & Bakery</h4>
              <p className="text-xs text-gray-500 mt-0.5">
                Install aplikasi untuk pengalaman terbaik
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-1 -mt-1 -mr-1 tap-highlight"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Install Button */}
          <button
            onClick={handleInstall}
            className="mt-3 w-full py-2.5 bg-[#E84C3D] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 tap-highlight"
          >
            <Download className="w-4 h-4" />
            Install Aplikasi
          </button>
        </div>
      </div>
    </div>
  );
}
