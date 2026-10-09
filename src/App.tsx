import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Story } from './components/Story';
import { Specialties } from './components/Specialties';
import { MenuSection } from './components/MenuSection';
import { GallerySection } from './components/GallerySection';
import { LocationContact } from './components/LocationContact';
import { OrderTrayModal } from './components/OrderTrayModal';
import { Footer } from './components/Footer';
import { MenuItem, CartItem } from './types/restaurant';
import { Phone, MessageCircle, ShoppingBag } from 'lucide-react';

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('luttur_motel_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isTrayOpen, setIsTrayOpen] = useState(false);

  // Sync scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('luttur_motel_cart', JSON.stringify(cartItems));
    } catch {
      // Local storage unavailable or full
    }
  }, [cartItems]);

  const handleAddToCart = (item: MenuItem, portion: 'half' | 'full' | 'regular' = 'regular') => {
    let resolvedPrice = 0;
    if (typeof item.price === 'number') {
      resolvedPrice = item.price;
    } else if (typeof item.price === 'object' && item.price !== null) {
      if (portion === 'half' && item.price.half) {
        resolvedPrice = item.price.half;
      } else {
        resolvedPrice = item.price.full;
      }
    } else {
      // String like "MRP"
      resolvedPrice = 40;
    }

    const uniqueId = `${item.id}-${portion}`;

    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.id === uniqueId);
      if (existing) {
        return prev.map((ci) =>
          ci.id === uniqueId ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [
        ...prev,
        {
          id: uniqueId,
          menuItem: item,
          portion,
          price: resolvedPrice,
          quantity: 1,
        },
      ];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) => {
          if (ci.id === id) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.id !== id));
  };

  const handleClearTray = () => {
    setCartItems([]);
  };

  const totalTrayCount = cartItems.reduce((acc, ci) => acc + ci.quantity, 0);

  return (
    <div className="min-h-screen bg-[#08080a] text-[#f7f5f0] flex flex-col font-sans selection:bg-[#d4af37]/30 selection:text-[#d4af37]">
      {/* Navigation */}
      <Header
        trayItemCount={totalTrayCount}
        onOpenTray={() => setIsTrayOpen(true)}
      />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero scrollY={scrollY} />
        <Story />
        <Specialties onAddToCart={handleAddToCart} />
        <MenuSection onAddToCart={handleAddToCart} />
        <GallerySection />
        <LocationContact />
      </main>

      {/* Order Tray Modal */}
      <OrderTrayModal
        isOpen={isTrayOpen}
        onClose={() => setIsTrayOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearTray={handleClearTray}
      />

      {/* Footer */}
      <Footer />

      {/* Mobile Floating Bottom Bar for Highway Travelers */}
      <div className="fixed bottom-3 left-3 right-3 z-40 sm:hidden flex items-center gap-2 p-1.5 bg-[#0f0f15]/95 backdrop-blur-md border border-[#2d2d3c] rounded-xl shadow-2xl">
        <a
          href="tel:8855332641"
          className="flex-1 py-2.5 px-3 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#09090b] text-xs font-bold flex items-center justify-center gap-1.5 shadow"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call: 8855332641</span>
        </a>
        <a
          href="https://wa.me/918855332641"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-lg bg-[#16a34a] text-white flex items-center justify-center"
          title="WhatsApp Chat"
        >
          <MessageCircle className="w-4 h-4" />
        </a>
        <button
          onClick={() => setIsTrayOpen(true)}
          className="relative p-2.5 rounded-lg bg-[#1c1c28] text-[#d4af37] border border-[#d4af37]/40 flex items-center justify-center"
          aria-label="Open tray"
        >
          <ShoppingBag className="w-4 h-4" />
          {totalTrayCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#16a34a] text-white text-[9px] font-bold px-1 rounded-full">
              {totalTrayCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
