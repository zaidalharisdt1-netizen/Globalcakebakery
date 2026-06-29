import { categories } from '../hooks/useStore';

interface ShopByCategoriesProps {
  onCategorySelect: (category: string) => void;
}

export default function ShopByCategories({ onCategorySelect }: ShopByCategoriesProps) {
  return (
    <section className="py-6 px-4 bg-white">
      <h2 className="text-xl font-bold text-center text-[#2D2D2D] mb-5">
        Shop By Categories
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategorySelect(cat.name)}
            className="group flex flex-col items-center tap-highlight"
          >
            <div className="w-full aspect-square rounded-lg overflow-hidden shadow-sm border border-gray-100">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <span className="mt-2 text-xs font-medium text-[#2D2D2D] text-center leading-tight">
              {cat.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
