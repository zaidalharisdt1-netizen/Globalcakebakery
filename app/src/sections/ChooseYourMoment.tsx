import { moments } from '../hooks/useStore';
import { Cake } from 'lucide-react';

export default function ChooseYourMoment() {
  return (
    <section className="py-6 px-4 bg-white">
      {/* Section Header */}
      <div className="text-center mb-5">
        <div className="flex justify-center mb-2">
          <Cake className="w-8 h-8 text-[#E84C3D]" />
        </div>
        <h2 className="text-xl font-bold text-[#2D2D2D]">Choose Your Moment</h2>
        <p className="text-sm text-gray-500 mt-1">Breads for every occasions</p>
      </div>

      {/* Moments Grid */}
      <div className="grid grid-cols-3 gap-3">
        {moments.map((moment) => (
          <button
            key={moment.id}
            className="group relative aspect-[4/3] rounded-lg overflow-hidden tap-highlight"
          >
            <img
              src={moment.image}
              alt={moment.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            {/* Text */}
            <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm uppercase tracking-wide drop-shadow-lg">
              {moment.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
