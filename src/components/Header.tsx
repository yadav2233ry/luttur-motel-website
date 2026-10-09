import React, { useState, useEffect } from 'react';
import { Phone, UtensilsCrossed, ShoppingBag, Menu, X, MapPin } from 'lucide-react';

interface HeaderProps {
  trayItemCount: number;
  onOpenTray: () => void;
}

export const Header: React.FC<HeaderProps> = ({ trayItemCount, onOpenTray }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Our Story', href: '#story' },
    { name: 'Menu', href: '#menu' },
    { name: 'Specialties', href: '#specialties' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Location & Contact', href: '#location' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#09090b]/92 backdrop-blur-md border-b border-[#27272a]/70 py-3 shadow-xl shadow-black/40'
          : 'bg-gradient-to-b from-[#08080a]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full border border-[#d4af37]/60 flex items-center justify-center bg-[#18181f]/80 group-hover:border-[#d4af37] transition-colors shadow-inner">
            <span className="veg-badge" title="100% Pure Vegetarian" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg sm:text-xl tracking-wider text-[#f7f5f0] group-hover:text-[#d4af37] transition-colors">
                LUTTUR MOTEL
              </span>
              <span className="text-[10px] tracking-widest text-[#d4af37] uppercase font-semibold border border-[#d4af37]/40 px-1.5 py-0.5 rounded-xs">
                Pure Veg
              </span>
            </div>
            <span className="text-xs text-[#a1a1aa] font-serif tracking-widest">
              लुत्तूर मोटल · Jalalpur, Jaunpur
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[#d4d4d8] hover:text-[#d4af37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#d4af37] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Quick Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Order Tray Button */}
          <button
            onClick={onOpenTray}
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-md bg-[#18181f] border border-[#d4af37]/40 text-[#f7f5f0] hover:border-[#d4af37] hover:bg-[#20202a] transition-all text-xs sm:text-sm font-medium shadow-sm group"
            aria-label="View Order Tray"
          >
            <ShoppingBag className="w-4 h-4 text-[#d4af37] group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Order Tray</span>
            {trayItemCount > 0 && (
              <span className="bg-[#15803d] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                {trayItemCount}
              </span>
            )}
          </button>

          {/* Call Direct Button */}
          <a
            href="tel:8855332641"
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#09090b] font-semibold text-xs sm:text-sm shadow-lg shadow-[#d4af37]/20 hover:brightness-110 active:scale-95 transition-all"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden md:inline">Call:</span> 8855332641
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-[#d4d4d8] hover:text-white bg-[#18181f] border border-[#27272a]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e0e13] border-b border-[#27272a] px-5 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex items-center gap-2 text-xs text-[#86efac] pb-3 border-b border-[#27272a]">
            <span className="veg-badge" />
            <span>100% Pure Vegetarian · Jalalpur, Jaunpur, Uttar Pradesh</span>
          </div>
          <div className="grid gap-3 pt-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#e4e4e7] hover:text-[#d4af37] py-2 border-b border-[#27272a]/40"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <a
              href="tel:8855332641"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-md bg-[#d4af37] text-[#09090b] font-semibold text-sm"
            >
              <Phone className="w-4 h-4" />
              Call Directly: 8855332641
            </a>
            <a
              href="https://wa.me/918855332641"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-md bg-[#16a34a] text-white font-semibold text-sm"
            >
              <UtensilsCrossed className="w-4 h-4" />
              Order Inquiry via WhatsApp
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Luttur+Motel+Jalalpur+Jaunpur+Uttar+Pradesh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md bg-[#18181f] text-[#d4af37] border border-[#d4af37]/40 text-xs font-medium"
            >
              <MapPin className="w-4 h-4" />
              Get Highway Directions (Google Maps)
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
