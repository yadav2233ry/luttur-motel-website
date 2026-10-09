import React from 'react';
import { Sparkles, Phone, Plus } from 'lucide-react';
import { MenuItem } from '../types/restaurant';

interface SpecialtiesProps {
  onAddToCart: (item: MenuItem, portion?: 'half' | 'full' | 'regular') => void;
}

export const Specialties: React.FC<SpecialtiesProps> = ({ onAddToCart }) => {
  const spotlightDishes: (MenuItem & { tag: string })[] = [
    {
      id: 'mc-7',
      name: 'Paneer Butter Masala',
      nameHindi: 'पनीर बटर मसाला',
      category: 'Main Course',
      price: { half: 150, full: 220 },
      description:
        'Soft homemade cottage cheese chunks cooked in rich buttery tomato silk gravy infused with kasuri methi.',
      isChefSpecial: true,
      tag: "Chef's Signature",
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'rt-6',
      name: 'Garlic Butter Naan',
      nameHindi: 'गार्लिक बटर नान',
      category: 'Roti',
      price: 45,
      description:
        'Clay tandoor leavened bread generously topped with hand-minced roasted garlic and fresh coriander.',
      isPopular: true,
      tag: 'Tandoor Fresh',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'ch-4',
      name: 'Chilli Paneer Dry',
      nameHindi: 'चिली पनीर ड्राई',
      category: 'Chinese',
      price: { half: 130, full: 200 },
      description:
        'Golden crisp paneer wok-glazed with crunchy bell peppers, onions, and spicy dark soya-chili glaze.',
      isPopular: true,
      tag: 'Wok Specialty',
      image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'dl-1',
      name: 'Dal Makhani',
      nameHindi: 'दाल मखनी',
      category: 'Dal',
      price: 130,
      description:
        'Slow-cooked black lentils and kidney beans simmered overnight with white butter and fresh dairy cream.',
      isChefSpecial: true,
      tag: 'Highway Classic',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section id="specialties" className="py-24 bg-[#0a0a0e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] text-[#d4af37] uppercase font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customer Favourites</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f7f5f0] mb-4">
            Motel Specialties
          </h2>
          <p className="text-sm sm:text-base text-[#a1a1aa]">
            Celebrated vegetarian delicacies loved by highway travelers passing through Jalalpur, Jaunpur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {spotlightDishes.map((dish) => {
            const hasHalfFull = typeof dish.price === 'object' && dish.price !== null;
            return (
              <div
                key={dish.id}
                className="bg-[#121219] border border-[#272730] rounded-lg overflow-hidden group hover:border-[#d4af37] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-[#181822]">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#09090b]/80 backdrop-blur-sm border border-[#d4af37]/40 px-2.5 py-1 rounded text-[11px] font-semibold text-[#d4af37] tracking-wider uppercase">
                    {dish.tag}
                  </div>
                  <div className="absolute top-3 right-3 bg-[#09090b]/80 backdrop-blur-sm p-1.5 rounded">
                    <span className="veg-badge" />
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-display font-bold text-base text-[#f7f5f0] group-hover:text-[#d4af37] transition-colors">
                        {dish.name}
                      </h3>
                    </div>
                    <div className="text-xs text-[#d4af37] font-serif mb-2">{dish.nameHindi}</div>
                    <p className="text-xs text-[#a1a1aa] leading-relaxed mb-4">
                      {dish.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#272730] flex items-center justify-between">
                    <div>
                      {hasHalfFull ? (
                        <div className="text-xs text-[#e4e4e7]">
                          <span className="text-[#a1a1aa]">Half: </span>
                          <span className="font-semibold text-[#d4af37]">₹{(dish.price as any).half}</span>
                          <span className="mx-1 text-[#52525b]">/</span>
                          <span className="text-[#a1a1aa]">Full: </span>
                          <span className="font-semibold text-[#d4af37]">₹{(dish.price as any).full}</span>
                        </div>
                      ) : (
                        <div className="text-sm font-bold text-[#d4af37]">
                          {typeof dish.price === 'number' ? `₹${dish.price}` : String(dish.price)}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => onAddToCart(dish, hasHalfFull ? 'full' : 'regular')}
                      className="px-3 py-1.5 rounded bg-[#181822] hover:bg-[#d4af37] text-[#d4af37] hover:text-[#09090b] border border-[#d4af37]/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      title="Add to Order Tray"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
