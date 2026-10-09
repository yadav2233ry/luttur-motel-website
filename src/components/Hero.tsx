import React from 'react';
import { HeroFeast3D } from './3d/HeroFeast3D';
import { Phone, ChevronDown, Utensils, MessageCircle, Sparkles, Compass } from 'lucide-react';

interface HeroProps {
  scrollY: number;
}

export const Hero: React.FC<HeroProps> = ({ scrollY }) => {
  return (
    <section className="relative min-h-[100vh] flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-[#08080a]">
      {/* 3D WebGL Background Canvas */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <HeroFeast3D scrollY={scrollY} />
      </div>

      {/* Atmospheric Vignette & Grain */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-40 z-10" />

      {/* Hero Foreground Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center items-center text-center">
        {/* Verification kicker (Zero-pill discipline: unboxed clean typography) */}
        <div className="inline-flex items-center gap-2 mb-4 text-xs sm:text-sm tracking-[0.25em] text-[#d4af37] uppercase font-semibold">
          <span className="veg-badge" />
          <span>100% Pure Vegetarian</span>
          <span aria-hidden="true" className="text-[#52525b]">·</span>
          <span>Jalalpur, Jaunpur, Uttar Pradesh</span>
        </div>

        {/* Grand Headline with Hindi Script */}
        <div className="relative mb-3">
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#f7f5f0] drop-shadow-2xl">
            LUTTUR MOTEL
          </h1>
          <div className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#d4af37] tracking-widest mt-1 font-medium">
            लुत्तूर मोटल
          </div>
        </div>

        {/* Subtitle */}
        <p className="font-serif italic text-xl sm:text-2xl lg:text-3xl text-[#e4e4e7] max-w-2xl mb-8 leading-relaxed font-light">
          “A Taste of Pure Vegetarian Delight”
        </p>

        {/* Description & Cuisine Snippet */}
        <p className="max-w-xl text-sm sm:text-base text-[#a1a1aa] mb-9 font-light tracking-wide leading-relaxed">
          Authentic North Indian curries, fresh clay tandoor naans, sizzling Indo-Chinese delights, and hearty breakfast specialties crafted with pure ingredients.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full max-w-md">
          {/* Primary CTA: Explore Menu */}
          <a
            href="#menu"
            className="flex-1 min-w-[160px] py-3.5 px-6 rounded-md bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c59c34] text-[#09090b] font-bold text-sm tracking-wide shadow-xl shadow-[#d4af37]/25 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 group"
          >
            <Utensils className="w-4 h-4 text-[#09090b] group-hover:rotate-12 transition-transform" />
            <span>Explore Our Menu</span>
          </a>

          {/* Secondary CTA: Call to Order */}
          <a
            href="tel:8855332641"
            className="flex-1 min-w-[160px] py-3.5 px-6 rounded-md bg-[#18181f]/90 border border-[#d4af37]/50 text-[#f7f5f0] hover:bg-[#23232c] hover:border-[#d4af37] active:scale-95 transition-all text-sm font-semibold tracking-wide flex items-center justify-center gap-2 shadow-lg backdrop-blur-sm"
          >
            <Phone className="w-4 h-4 text-[#d4af37]" />
            <span>Call to Order</span>
          </a>

          {/* WhatsApp Quick CTA */}
          <a
            href="https://wa.me/918855332641?text=Namaste%20Luttur%20Motel,%20I%20would%20like%20to%20inquire%20about%20your%20pure%20vegetarian%20menu."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto py-2.5 px-5 rounded-md bg-[#16a34a]/15 border border-[#16a34a]/40 text-[#86efac] hover:bg-[#16a34a]/25 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Order: 8855332641</span>
          </a>
        </div>

        {/* 3D Interaction Notice */}
        <div className="mt-8 flex items-center gap-2 text-[11px] text-[#71717a] tracking-wider uppercase font-medium bg-[#121217]/60 border border-[#27272a]/60 px-3 py-1 rounded-full">
          <Compass className="w-3 h-3 text-[#d4af37] animate-spin" style={{ animationDuration: '8s' }} />
          <span>Interactive 3D Feast · Move cursor to orbit camera</span>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="relative z-20 flex flex-col items-center justify-center gap-1 text-[#71717a] text-xs pt-4">
        <span className="tracking-widest uppercase text-[10px]">Scroll to Discover</span>
        <a href="#story" aria-label="Scroll down to story" className="animate-bounce p-1 text-[#d4af37]">
          <ChevronDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};
