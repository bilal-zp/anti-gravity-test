import React from 'react';
import { motion } from 'framer-motion';
import { Play, ShoppingBag, CheckCircle2, Mouse } from 'lucide-react';

interface HeroOverlayProps {
  scrollProgress: number;
  onOpenCheckout: () => void;
}

export const HeroOverlay: React.FC<HeroOverlayProps> = ({ scrollProgress, onOpenCheckout }) => {
  const opacity = Math.max(0, 1 - scrollProgress * 7.0);
  const translateY = scrollProgress * -40;
  if (opacity <= 0.01) return null;

  const pct = Math.round(scrollProgress * 100);

  return (
    <div
      style={{ opacity, transform: `translateY(${translateY}px)` }}
      className="absolute inset-0 z-20 pointer-events-none"
    >
      {/* ── TOP-CENTER TEXT BLOCK ──
          Sits in the top 42% of viewport.
          Navbar is ~60px, so we start at pt-16 (64px). */}
      <div className="absolute top-0 left-0 right-0 flex flex-col items-center text-center pt-16 px-6">

        {/* Monospace sub-tag */}
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-[10px] sm:text-[11px] font-mono tracking-[0.22em] text-gray-500 uppercase mb-3"
        >
          PRECISION. PERFORMANCE. PERFECTION.
        </motion.p>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mb-3"
        >
          <h1 className="text-5xl sm:text-6xl md:text-[72px] font-black tracking-[-0.03em] text-[#111111] leading-[1.0]">
            The Keyboard.
          </h1>
          <p
            className="text-5xl sm:text-6xl md:text-[72px] font-light italic text-gray-400 leading-[1.08]"
            style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
          >
            Reimagined.
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm text-gray-600 leading-relaxed mb-5 max-w-md"
        >
          Engineered from the inside out. Every component, rethought.<br />
          For creators, gamers, and professionals who demand more.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="flex items-center gap-3 mb-3 pointer-events-auto"
        >
          <button
            onClick={onOpenCheckout}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#111111] text-white font-semibold text-sm hover:bg-gray-800 active:scale-95 transition-all shadow-lg"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Buy Now — $219
          </button>
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight * 1.5, behavior: 'smooth' })}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#111111] font-semibold text-sm border border-black/10 hover:bg-gray-50 active:scale-95 transition-all shadow-sm"
          >
            <Play className="w-3 h-3 fill-black" />
            Watch Design Story
          </button>
        </motion.div>

        {/* Guarantee pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.36 }}
          className="inline-flex items-center gap-1.5 text-[11px] font-mono text-gray-500"
        >
          <CheckCircle2 className="w-3 h-3 text-gray-400" />
          Free Shipping • 30-Day Returns • 2-Year Warranty
        </motion.div>
      </div>

      {/* ── LEFT WIDGET: EXPLORE THE DISASSEMBLY ── */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="absolute left-7 bottom-24 hidden md:flex flex-col items-center gap-2 pointer-events-auto cursor-pointer group"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <div className="w-11 h-11 rounded-full border border-black/12 bg-white/60 backdrop-blur-sm flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all shadow-sm">
          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
        </div>
        <p className="text-[9px] font-mono tracking-widest text-gray-500 uppercase text-center leading-snug w-20">
          EXPLORE THE DISASSEMBLY
        </p>
      </motion.div>

      {/* ── RIGHT WIDGET: SCROLL % ── */}
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="absolute right-7 bottom-24 hidden md:flex flex-col items-center gap-2"
      >
        <div className="w-11 h-11 rounded-full border border-black/12 bg-white/60 backdrop-blur-sm flex items-center justify-center text-[11px] font-mono font-bold text-black shadow-sm">
          {pct}%
        </div>
        <p className="text-[9px] font-mono tracking-widest text-gray-500 uppercase text-center leading-snug w-20">
          SCROLL TO EXPLODE
        </p>
      </motion.div>

      {/* ── BOTTOM SCROLL BADGE ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-black/6 text-[10px] font-mono tracking-[0.18em] text-gray-500 uppercase shadow-sm">
          <Mouse className="w-3 h-3 text-black" />
          SCROLL TO EXPLODE ARCHITECTURE
        </div>
      </motion.div>
    </div>
  );
};
