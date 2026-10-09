import React from 'react';
import { Phone, MapPin, MessageCircle, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050507] text-[#a1a1aa] border-t border-[#1a1a22] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="veg-badge" />
              <span className="font-display font-extrabold text-xl text-[#f7f5f0] tracking-wide">
                LUTTUR MOTEL
              </span>
            </div>
            <div className="font-serif text-[#d4af37] text-base">
              लुत्तूर मोटल · शुद्ध शाकाहारी
            </div>
            <p className="text-xs text-[#71717a] leading-relaxed">
              A premier pure vegetarian dining destination in Jalalpur, Jaunpur, Uttar Pradesh. Offering freshly prepared North Indian dishes, tandoor naans, Chinese delights, and hearty beverages.
            </p>
          </div>

          {/* Direct Contact */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-[#f7f5f0] uppercase tracking-wider">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href="tel:8855332641"
                className="flex items-center gap-2 text-[#d4af37] hover:underline font-semibold"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>8855332641</span>
              </a>
              <a
                href="https://wa.me/918855332641"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#86efac] hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp: +91 8855332641</span>
              </a>
              <div className="flex items-start gap-2 text-[#71717a] pt-1">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#d4af37]" />
                <span>Jalalpur, Jaunpur, Uttar Pradesh, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-[#f7f5f0] uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#story" className="hover:text-[#d4af37] transition-colors">
                  Our Story & Philosophy
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#d4af37] transition-colors">
                  Pure Vegetarian Menu
                </a>
              </li>
              <li>
                <a href="#specialties" className="hover:text-[#d4af37] transition-colors">
                  Motel Specialties
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#d4af37] transition-colors">
                  Food Gallery
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#d4af37] transition-colors">
                  Location & Map Directions
                </a>
              </li>
            </ul>
          </div>

          {/* Verified Promise */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-[#f7f5f0] uppercase tracking-wider">
              Culinary Promise
            </h4>
            <p className="text-xs text-[#71717a] leading-relaxed">
              We prepare each order fresh without artificial food colours or preserved gravies. Experience true UP highway hospitality with every meal.
            </p>
            <div className="pt-2">
              <a
                href="tel:8855332641"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#181822] text-[#d4af37] border border-[#d4af37]/40 text-xs font-semibold hover:bg-[#d4af37] hover:text-[#09090b] transition-colors"
              >
                <Phone className="w-3 h-3" />
                <span>Call to Order</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-[#181820] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717a]">
          <div>
            © {new Date().getFullYear()} LUTTUR MOTEL (लुत्तूर मोटल). All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-[11px]">
            <span>Pure Vegetarian Dining</span>
            <span aria-hidden="true">·</span>
            <span>Jalalpur, Jaunpur, Uttar Pradesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
