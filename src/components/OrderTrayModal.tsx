import React from 'react';
import { CartItem } from '../types/restaurant';
import { X, Trash2, Plus, Minus, MessageCircle, Phone, ShoppingBag, AlertCircle } from 'lucide-react';

interface OrderTrayModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearTray: () => void;
}

export const OrderTrayModal: React.FC<OrderTrayModalProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearTray,
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Generate clean WhatsApp message
  const generateWhatsAppLink = () => {
    let text = `Namaste LUTTUR MOTEL (लुत्तूर मोटल)!\nI would like to inquire / order the following items:\n\n`;
    items.forEach((ci, index) => {
      const portionText = ci.portion !== 'regular' ? ` (${ci.portion.toUpperCase()})` : '';
      text += `${index + 1}. ${ci.menuItem.name}${portionText} x ${ci.quantity} = ₹${ci.price * ci.quantity}\n`;
    });
    text += `\nEstimated Total: ₹${totalAmount}\n`;
    text += `Location: Jalalpur, Jaunpur\nPlease confirm preparation time and readiness.`;
    return `https://wa.me/918855332641?text=${encodeURIComponent(text)}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#08080a]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-[#111117] border border-[#2b2b38] rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#22222e] flex items-center justify-between bg-[#151520]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-[#181824] text-[#d4af37] border border-[#d4af37]/30">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-[#f7f5f0]">
                Your Order Tray
              </h3>
              <p className="text-xs text-[#a1a1aa]">
                {items.length === 0 ? 'Empty tray' : `${items.length} unique dish selections`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#a1a1aa] hover:text-white hover:bg-[#20202c] transition-colors"
            aria-label="Close tray"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-14 h-14 rounded-full bg-[#181822] text-[#71717a] flex items-center justify-center mx-auto mb-3">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-[#f7f5f0] mb-1">
                Your order tray is currently empty
              </p>
              <p className="text-xs text-[#71717a] max-w-xs mx-auto mb-6">
                Browse our pure vegetarian menu and tap “Add” to curate your meal.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-md bg-[#d4af37] text-[#09090b] text-xs font-bold hover:brightness-110 transition-all"
              >
                Browse Menu Dishes
              </button>
            </div>
          ) : (
            <>
              {/* Itemized List */}
              <div className="divide-y divide-[#1e1e28]">
                {items.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="veg-badge shrink-0" />
                        <h4 className="font-display font-semibold text-sm text-[#f7f5f0] truncate">
                          {item.menuItem.name}
                        </h4>
                      </div>
                      <div className="text-xs text-[#71717a] mt-0.5 flex items-center gap-2">
                        {item.portion !== 'regular' && (
                          <span className="text-[#d4af37] uppercase font-semibold text-[10px] bg-[#1a1a24] px-1.5 py-0.5 rounded">
                            {item.portion}
                          </span>
                        )}
                        <span>₹{item.price} each</span>
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center bg-[#181822] border border-[#2a2a38] rounded-md">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1.5 text-[#a1a1aa] hover:text-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#f7f5f0] min-w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1.5 text-[#a1a1aa] hover:text-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-sm font-bold text-[#d4af37] w-16 text-right">
                        ₹{item.price * item.quantity}
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1.5 text-[#71717a] hover:text-red-400 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Truth-in-Ordering Notice (Zero-bullshit policy per prompt) */}
              <div className="p-3.5 rounded-lg bg-[#181822] border border-[#2b2b3a] flex items-start gap-2.5 text-xs text-[#a1a1aa]">
                <AlertCircle className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <div className="leading-relaxed text-[11px]">
                  LUTTUR MOTEL is an authentic highway restaurant in Jalalpur, Jaunpur. Orders are verified directly with restaurant staff via phone or WhatsApp. No hidden aggregator markups.
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer actions */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#22222e] bg-[#14141e] space-y-3">
            <div className="flex items-center justify-between text-base">
              <span className="text-xs text-[#a1a1aa] uppercase tracking-wider font-medium">
                Total Estimated Bill
              </span>
              <span className="font-display font-extrabold text-xl text-[#d4af37]">
                ₹{totalAmount}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-md bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md shadow-[#16a34a]/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send on WhatsApp</span>
              </a>

              <a
                href="tel:8855332641"
                className="py-3 px-4 rounded-md bg-[#d4af37] text-[#09090b] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 active:scale-98 transition-all shadow-md shadow-[#d4af37]/20"
              >
                <Phone className="w-4 h-4" />
                <span>Call: 8855332641</span>
              </a>
            </div>

            <button
              onClick={onClearTray}
              className="w-full text-center text-[11px] text-[#71717a] hover:text-[#e4e4e7] pt-1"
            >
              Clear Entire Tray
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
