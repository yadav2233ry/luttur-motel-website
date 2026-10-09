import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/galleryData';
import { GalleryItem } from '../types/restaurant';
import { X, ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const handleNext = () => {
    if (!activeItem) return;
    const currentIndex = GALLERY_ITEMS.findIndex((item) => item.id === activeItem.id);
    const nextIndex = (currentIndex + 1) % GALLERY_ITEMS.length;
    setActiveItem(GALLERY_ITEMS[nextIndex]);
  };

  const handlePrev = () => {
    if (!activeItem) return;
    const currentIndex = GALLERY_ITEMS.findIndex((item) => item.id === activeItem.id);
    const prevIndex = (currentIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    setActiveItem(GALLERY_ITEMS[prevIndex]);
  };

  return (
    <section id="gallery" className="py-24 bg-[#09090d] relative border-t border-[#1c1c24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] text-[#d4af37] uppercase font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Culinary Visuals</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f7f5f0] mb-4">
            Restaurant Gallery
          </h2>
          <p className="text-sm sm:text-base text-[#a1a1aa]">
            Freshly baked breads from the clay tandoor, rich paneer gravies, sizzling woks, and comforting North Indian meals.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className={`relative overflow-hidden rounded-lg cursor-pointer group bg-[#15151e] border border-[#272732] hover:border-[#d4af37]/70 transition-all duration-300 ${
                item.featured ? 'sm:col-span-2 sm:row-span-2 aspect-square sm:aspect-auto' : 'aspect-4/3'
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 brightness-95 group-hover:brightness-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/30 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />

              {/* Hover icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#08080a]/80 backdrop-blur-md flex items-center justify-center text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4" />
              </div>

              {/* Bottom Details */}
              <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                <span className="text-[10px] tracking-widest text-[#d4af37] uppercase font-semibold">
                  {item.category}
                </span>
                <h3 className="font-display font-bold text-base sm:text-lg text-[#f7f5f0] mt-0.5">
                  {item.title}
                </h3>
                <p className="text-xs text-[#a1a1aa] mt-1 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#08080a]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#121218] border border-[#2e2e3a] rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#08080a]/80 text-[#e4e4e7] hover:text-white hover:bg-black transition-colors"
              aria-label="Close image lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-[#08080a]/80 text-[#d4af37] hover:bg-black hover:scale-105 transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-[#08080a]/80 text-[#d4af37] hover:bg-black hover:scale-105 transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Image */}
            <div className="relative aspect-16/10 bg-black">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Lightbox Footer */}
            <div className="p-6 bg-[#121218] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#22222e]">
              <div>
                <span className="text-xs text-[#d4af37] font-semibold tracking-wider uppercase">
                  {activeItem.category}
                </span>
                <h4 className="font-display font-bold text-lg text-[#f7f5f0] mt-0.5">
                  {activeItem.title}
                </h4>
                <p className="text-xs text-[#a1a1aa] mt-1">{activeItem.caption}</p>
              </div>
              <a
                href="#menu"
                onClick={() => setActiveItem(null)}
                className="px-4 py-2 rounded bg-[#d4af37] text-[#09090b] text-xs font-bold hover:brightness-110 whitespace-nowrap"
              >
                View on Menu
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
