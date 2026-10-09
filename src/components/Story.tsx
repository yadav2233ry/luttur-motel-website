import React from 'react';
import { Flame, ShieldCheck, Soup, Wheat } from 'lucide-react';

export const Story: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: '100% Pure Vegetarian',
      hindi: 'शुद्ध शाकाहारी',
      description:
        'Prepared in a strictly vegetarian kitchen adhering to time-honored cleanliness and pure ingredients.',
    },
    {
      icon: Flame,
      title: 'Live Clay Tandoor',
      hindi: 'मिट्टी का तंदूर',
      description:
        'Rotis, naans, and tikkas baked fresh on high-heat clay embers for signature smoky fragrance and crisp edges.',
    },
    {
      icon: Soup,
      title: 'North Indian Classics',
      hindi: 'पारंपरिक स्वाद',
      description:
        'Hearty paneer gravies, slow-simmered dals, fresh koftas, and aromatic basmati rice cooked to perfection.',
    },
    {
      icon: Wheat,
      title: 'Indo-Chinese Wok',
      hindi: 'इंडो-चाइनीज जायका',
      description:
        'Crispy chowmein, fried rice, manchurian, and chilli paneer tossed fresh in high-flame woks upon every order.',
    },
  ];

  return (
    <section id="story" className="relative py-24 sm:py-32 bg-[#09090c] border-t border-[#1c1c24]">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] text-[#d4af37] uppercase font-semibold mb-3">
            <span>Our Philosophy</span>
            <span aria-hidden="true" className="text-[#3f3f46]">·</span>
            <span>Jalalpur, Jaunpur</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f7f5f0] mb-6">
            Tradition Served Fresh.
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-6" />
          <p className="font-serif italic text-lg sm:text-xl text-[#d4d4d8] leading-relaxed mb-4">
            “Good food brings travelers together. We serve authentic vegetarian flavours with warmth and heartfelt care.”
          </p>
          <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed">
            Situated at Jalalpur in the historic Jaunpur district of Uttar Pradesh,{' '}
            <strong className="text-[#f7f5f0] font-semibold">LUTTUR MOTEL (लुत्तूर मोटल)</strong> offers a welcoming stop for highway travelers, local families, and food lovers seeking pure vegetarian goodness. Whether stopping by for a comforting hot cup of special tea and freshly fried paneer pakodas in the morning, enjoying a feast of rich Kadhai Paneer with butter naan for lunch, or savoring sizzling Chinese noodles in the evening, every preparation is made fresh to order.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-[#121218] border border-[#27272a] rounded-lg p-6 hover:border-[#d4af37]/60 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#181822] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] mb-5 group-hover:bg-[#d4af37] group-hover:text-[#09090b] transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-xs text-[#d4af37] font-serif mb-1 tracking-wider">
                  {pillar.hindi}
                </div>
                <h3 className="font-display text-lg font-bold text-[#f7f5f0] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
