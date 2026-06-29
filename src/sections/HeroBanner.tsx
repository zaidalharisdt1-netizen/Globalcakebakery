import { useState, useEffect, useCallback } from 'react';
import { banners } from '../hooks/useStore';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % banners.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  }, []);

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      next();
    }
    if (touchStart - touchEnd < -50) {
      prev();
    }
  };

  const banner = banners[current];

  return (
    <section className="relative w-full overflow-hidden">
      <div
        className="relative w-full aspect-[16/10] max-h-[320px]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Banner Image */}
        <img
          src={banner.image}
          alt={banner.title}
          className="w-full h-full object-cover transition-opacity duration-500"
          loading="eager"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-5 py-6">
          <span
            className="inline-block self-start px-3 py-1 text-[10px] font-bold text-white rounded-full mb-2 fade-in"
            style={{ backgroundColor: banner.color }}
          >
            {banner.tag}
          </span>
          <h2 className="text-white text-2xl font-bold leading-tight mb-1 fade-in drop-shadow-lg">
            {banner.title}
          </h2>
          <p className="text-white/90 text-xl font-bold mb-2 fade-in" style={{ color: banner.color === '#E84C3D' ? '#FFD700' : '#fff' }}>
            {banner.subtitle}
          </p>
          <p className="text-white/80 text-xs max-w-[200px] leading-relaxed fade-in drop-shadow">
            {banner.description}
          </p>
        </div>

        {/* Navigation Arrows (desktop only) */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-md hidden sm:flex"
          aria-label="Previous"
        >
          <ChevronLeft className="w-4 h-4 text-gray-700" />
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-md hidden sm:flex"
          aria-label="Next"
        >
          <ChevronRight className="w-4 h-4 text-gray-700" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? 'w-6 bg-white' : 'w-2 bg-white/50'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
