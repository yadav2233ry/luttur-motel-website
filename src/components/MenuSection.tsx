import React, { useState, useMemo } from 'react';
import { MENU_ITEMS, MENU_CATEGORIES } from '../data/menuData';
import { MenuItem, MenuCategoryType } from '../types/restaurant';
import { Search, Phone, Plus, Check, Filter, Utensils } from 'lucide-react';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem, portion: 'half' | 'full' | 'regular') => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoryType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedItemIds, setAddedItemIds] = useState<{ [key: string]: boolean }>({});

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.nameHindi && item.nameHindi.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleAdd = (item: MenuItem, portion: 'half' | 'full' | 'regular') => {
    onAddToCart(item, portion);
    const key = `${item.id}-${portion}`;
    setAddedItemIds((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [key]: false }));
    }, 1500);
  };

  return (
    <section id="menu" className="py-24 bg-[#08080b] relative border-t border-[#1a1a24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] text-[#d4af37] uppercase font-semibold mb-3">
            <span className="veg-badge" />
            <span>Printed Restaurant Menu</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f7f5f0] mb-4">
            Pure Vegetarian Menu
          </h2>
          <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed">
            Transcribed directly from the authentic printed tariff at LUTTUR MOTEL, Jalalpur, Jaunpur. All items prepared fresh to order.
          </p>
        </div>

        {/* Search Bar & Stats */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717a]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (e.g., Paneer Butter Masala, Chowmein, Naan, Tea)..."
              className="w-full pl-11 pr-4 py-3 bg-[#121218] border border-[#272730] rounded-lg text-sm text-[#f7f5f0] placeholder-[#71717a] focus:outline-none focus:border-[#d4af37] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#a1a1aa] hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs (Interactive buttons allowed per frontend-design skill) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none no-scrollbar">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === 'All'
                ? 'bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#09090b] font-bold shadow-md shadow-[#d4af37]/20'
                : 'bg-[#121218] text-[#a1a1aa] hover:text-[#f7f5f0] border border-[#272730]'
            }`}
          >
            All Items ({MENU_ITEMS.length})
          </button>
          {MENU_CATEGORIES.map((cat) => {
            const count = MENU_ITEMS.filter((item) => item.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#09090b] font-bold shadow-md shadow-[#d4af37]/20'
                    : 'bg-[#121218] text-[#a1a1aa] hover:text-[#f7f5f0] border border-[#272730]'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Results Count Banner */}
        <div className="flex items-center justify-between text-xs text-[#71717a] mb-6 pb-2 border-b border-[#1c1c24]">
          <div className="flex items-center gap-2">
            <span>Showing {filteredItems.length} items</span>
            {selectedCategory !== 'All' && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-[#d4af37]">{selectedCategory}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-[#16a34a] font-medium">
            <span className="veg-badge" />
            <span>100% Pure Vegetarian Kitchen</span>
          </div>
        </div>

        {/* Menu Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#121218] rounded-lg border border-[#272730]">
            <Utensils className="w-10 h-10 text-[#71717a] mx-auto mb-3" />
            <h3 className="text-base font-semibold text-[#f7f5f0] mb-1">No dishes found</h3>
            <p className="text-xs text-[#a1a1aa] mb-4">
              Try a different search query or clear the filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 bg-[#181822] text-[#d4af37] text-xs font-semibold rounded border border-[#d4af37]/40 hover:bg-[#d4af37] hover:text-[#09090b] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((dish) => {
              const isObjPrice = typeof dish.price === 'object' && dish.price !== null;
              const halfPrice = isObjPrice ? (dish.price as any).half : undefined;
              const fullPrice = isObjPrice ? (dish.price as any).full : undefined;

              return (
                <div
                  key={dish.id}
                  className="bg-[#111117] border border-[#22222c] rounded-lg p-5 flex flex-col justify-between hover:border-[#d4af37]/50 hover:bg-[#14141c] transition-all duration-200 group"
                >
                  <div>
                    {/* Top Row: Category text kicker & veg mark */}
                    <div className="flex items-center justify-between text-[11px] text-[#71717a] mb-2">
                      <span className="tracking-wider uppercase font-medium text-[#d4af37]">
                        {dish.category}
                      </span>
                      <div className="flex items-center gap-2">
                        {dish.isChefSpecial && (
                          <span className="text-[10px] text-[#f59e0b] font-semibold tracking-wider uppercase">
                            Special
                          </span>
                        )}
                        <span className="veg-badge" title="Pure Veg" />
                      </div>
                    </div>

                    {/* Dish Title */}
                    <h3 className="font-display font-bold text-base sm:text-lg text-[#f7f5f0] group-hover:text-[#d4af37] transition-colors mb-0.5">
                      {dish.name}
                    </h3>
                    {dish.nameHindi && (
                      <div className="text-xs text-[#d4af37]/90 font-serif mb-2">
                        {dish.nameHindi}
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-xs text-[#a1a1aa] leading-relaxed mb-4 line-clamp-2">
                      {dish.description}
                    </p>
                  </div>

                  {/* Pricing and Actions */}
                  <div className="pt-3 border-t border-[#1c1c24] flex items-center justify-between gap-2">
                    {/* Prices */}
                    <div>
                      {isObjPrice ? (
                        <div className="flex flex-col text-xs">
                          {halfPrice && (
                            <span className="text-[#a1a1aa]">
                              Half: <strong className="text-[#f7f5f0] font-semibold">₹{halfPrice}</strong>
                            </span>
                          )}
                          <span className="text-[#a1a1aa]">
                            Full: <strong className="text-[#d4af37] font-bold">₹{fullPrice}</strong>
                          </span>
                        </div>
                      ) : (
                        <div className="font-bold text-base text-[#d4af37]">
                          {typeof dish.price === 'number' ? `₹${dish.price}` : String(dish.price)}
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1.5">
                      {isObjPrice ? (
                        <>
                          {halfPrice && (
                            <button
                              onClick={() => handleAdd(dish, 'half')}
                              className="px-2.5 py-1.5 rounded bg-[#181822] hover:bg-[#d4af37] text-[#d4af37] hover:text-[#09090b] border border-[#d4af37]/30 text-xs font-semibold flex items-center gap-1 transition-colors"
                              title="Add Half Portion to Tray"
                            >
                              {addedItemIds[`${dish.id}-half`] ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Plus className="w-3 h-3" />
                              )}
                              <span>Half</span>
                            </button>
                          )}
                          <button
                            onClick={() => handleAdd(dish, 'full')}
                            className="px-2.5 py-1.5 rounded bg-[#181822] hover:bg-[#d4af37] text-[#d4af37] hover:text-[#09090b] border border-[#d4af37]/30 text-xs font-semibold flex items-center gap-1 transition-colors"
                            title="Add Full Portion to Tray"
                          >
                            {addedItemIds[`${dish.id}-full`] ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Plus className="w-3 h-3" />
                            )}
                            <span>Full</span>
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleAdd(dish, 'regular')}
                          className="px-3 py-1.5 rounded bg-[#181822] hover:bg-[#d4af37] text-[#d4af37] hover:text-[#09090b] border border-[#d4af37]/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                          title="Add to Order Tray"
                        >
                          {addedItemIds[`${dish.id}-regular`] ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Plus className="w-3 h-3" />
                          )}
                          <span>Add to Tray</span>
                        </button>
                      )}

                      {/* Direct phone call button */}
                      <a
                        href="tel:8855332641"
                        className="p-1.5 rounded bg-[#181822] text-[#71717a] hover:text-[#d4af37] hover:bg-[#20202c] transition-colors"
                        title="Call to Order"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Menu Notice */}
        <div className="mt-12 text-center bg-[#101015] border border-[#22222a] p-6 rounded-lg max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm text-[#a1a1aa] mb-3">
            Want to confirm special preparation, dietary preferences, or catering for road travelers?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:8855332641"
              className="text-xs font-bold text-[#09090b] bg-[#d4af37] px-4 py-2 rounded-md hover:brightness-110 flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Restaurant Directly: 8855332641</span>
            </a>
            <a
              href="https://wa.me/918855332641"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#86efac] border border-[#16a34a]/40 bg-[#16a34a]/10 px-4 py-2 rounded-md hover:bg-[#16a34a]/20"
            >
              WhatsApp Menu Inquiry
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
