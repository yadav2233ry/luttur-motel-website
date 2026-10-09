import React from 'react';
import { MapPin, Phone, MessageCircle, Navigation, ExternalLink, ShieldCheck } from 'lucide-react';

export const LocationContact: React.FC = () => {
  return (
    <section id="location" className="py-24 bg-[#08080a] relative border-t border-[#1c1c24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] text-[#d4af37] uppercase font-semibold mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Visit Us</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f7f5f0] mb-4">
            Location & Contact
          </h2>
          <p className="text-sm sm:text-base text-[#a1a1aa]">
            Convenient pure vegetarian highway stop in Jalalpur, Jaunpur. Call ahead or visit directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Verified Business Info Card */}
          <div className="lg:col-span-5 bg-[#101017] border border-[#262632] rounded-xl p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="veg-badge" />
                <span className="text-xs font-bold tracking-widest text-[#16a34a] uppercase">
                  100% Pure Vegetarian Restaurant
                </span>
              </div>

              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#f7f5f0] mb-1">
                LUTTUR MOTEL
              </h3>
              <div className="font-serif text-lg text-[#d4af37] mb-6">
                लुत्तूर मोटल
              </div>

              <div className="space-y-4 text-sm text-[#d4d4d8]">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-[#181822] text-[#d4af37] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-[#71717a] uppercase tracking-wider font-medium">
                      Address
                    </div>
                    <div className="font-medium text-[#f7f5f0] mt-0.5">
                      Jalalpur, Jaunpur
                    </div>
                    <div className="text-xs text-[#a1a1aa]">
                      Uttar Pradesh, India
                    </div>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-[#181822] text-[#d4af37] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-[#71717a] uppercase tracking-wider font-medium">
                      Phone Number
                    </div>
                    <a
                      href="tel:8855332641"
                      className="font-bold text-lg text-[#d4af37] hover:underline mt-0.5 block"
                    >
                      8855332641
                    </a>
                    <div className="text-xs text-[#a1a1aa]">
                      Direct motel phone line for orders & inquiries
                    </div>
                  </div>
                </div>

                {/* Cuisine */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-[#181822] text-[#d4af37] shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-[#71717a] uppercase tracking-wider font-medium">
                      Cuisine
                    </div>
                    <div className="text-xs text-[#e4e4e7] mt-0.5 leading-relaxed">
                      Indian Vegetarian, North Indian, Chinese, Tandoori, Breakfast, Snacks, Beverages & Desserts
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-8 border-t border-[#22222e] mt-8 flex flex-col gap-3">
              <a
                href="tel:8855332641"
                className="w-full py-3.5 px-4 rounded-md bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#09090b] font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-98 transition-all shadow-lg shadow-[#d4af37]/20"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now: 8855332641</span>
              </a>

              <a
                href="https://wa.me/918855332641"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-md bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-sm flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md shadow-[#16a34a]/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp: 8855332641</span>
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Luttur+Motel+Jalalpur+Jaunpur+Uttar+Pradesh"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-md bg-[#181822] hover:bg-[#20202d] border border-[#d4af37]/40 text-[#f7f5f0] text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <Navigation className="w-4 h-4 text-[#d4af37]" />
                <span>Get Directions (Google Maps)</span>
                <ExternalLink className="w-3 h-3 text-[#71717a]" />
              </a>
            </div>
          </div>

          {/* Right: Highway Travel Guide & Directions Preview */}
          <div className="lg:col-span-7 bg-[#101017] border border-[#262632] rounded-xl overflow-hidden flex flex-col justify-between shadow-xl">
            {/* Visual map preview container */}
            <div className="relative min-h-[300px] flex-1 bg-[#15151e] flex flex-col items-center justify-center p-8 text-center border-b border-[#22222e]">
              <div className="absolute inset-0 bg-[radial-gradient(#272732_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

              <div className="relative z-10 max-w-md">
                <div className="w-16 h-16 rounded-full bg-[#181824] border-2 border-[#d4af37] flex items-center justify-center text-[#d4af37] mx-auto mb-4 shadow-xl shadow-[#d4af37]/15">
                  <Navigation className="w-8 h-8 animate-pulse" />
                </div>
                <h4 className="font-display font-bold text-xl text-[#f7f5f0] mb-2">
                  Navigation & Highway Guide
                </h4>
                <p className="text-xs sm:text-sm text-[#a1a1aa] mb-6 leading-relaxed">
                  Located in <span className="text-[#f7f5f0] font-semibold">Jalalpur, Jaunpur, Uttar Pradesh</span>. Ideal pit stop for travelers connecting through Jaunpur and neighboring towns.
                </p>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Luttur+Motel+Jalalpur+Jaunpur+Uttar+Pradesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#d4af37] text-[#09090b] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Open in Google Maps App</span>
                </a>
              </div>
            </div>

            {/* Traveler Information Checklist */}
            <div className="p-6 bg-[#0d0d12] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-[#16a34a] mt-1 shrink-0" />
                <div>
                  <div className="font-semibold text-[#f7f5f0]">100% Vegetarian Facility</div>
                  <div className="text-[#71717a] text-[11px]">Strict separate vegetarian culinary standards.</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-[#d4af37] mt-1 shrink-0" />
                <div>
                  <div className="font-semibold text-[#f7f5f0]">Live Clay Tandoor & Woks</div>
                  <div className="text-[#71717a] text-[11px]">Hot rotis and fresh gravies served hot on order.</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-[#38bdf8] mt-1 shrink-0" />
                <div>
                  <div className="font-semibold text-[#f7f5f0]">Highway Stop Friendly</div>
                  <div className="text-[#71717a] text-[11px]">Rest and refresh for families and transit cars.</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-[#f59e0b] mt-1 shrink-0" />
                <div>
                  <div className="font-semibold text-[#f7f5f0]">Call Ahead for Groups</div>
                  <div className="text-[#71717a] text-[11px]">Call 8855332641 for quick meal preparation.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
