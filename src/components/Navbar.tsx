import React from 'react';
import { Volume2, VolumeX, Sliders, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  scrollProgress: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenSpecs: () => void;
  onOpenCheckout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  scrollProgress,
  soundEnabled,
  onToggleSound,
  onOpenSpecs,
  onOpenCheckout,
}) => {
  return (
    <>
      {/* Top Scroll Line Indicator */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2.5px] bg-black/5">
        <div
          className="h-full bg-black transition-all duration-75"
          style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
        />
      </div>

      {/* Floating Glassmorphic Navbar */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <div className="pointer-events-auto flex items-center justify-between gap-6 px-5 py-3 rounded-full glass-pill max-w-5xl w-full shadow-apple-sm">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
              C
            </div>
            <span className="font-bold tracking-tight text-sm text-black">
              CRAFT<span className="font-normal text-gray-400">WHITE</span>
            </span>
          </a>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-gray-600">
            <a href="#hero" className="hover:text-black transition-colors">Overview</a>
            <a href="#sequence" className="hover:text-black transition-colors">Disassembly</a>
            <a href="#specs" onClick={(e) => { e.preventDefault(); onOpenSpecs(); }} className="hover:text-black transition-colors">Specs</a>
            <a href="#sound-test" className="hover:text-black transition-colors">Sound Engine</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            {/* Audio Toggle */}
            <button
              onClick={onToggleSound}
              title={soundEnabled ? "Mute Mechanical Audio" : "Enable Mechanical Audio"}
              className="w-8 h-8 rounded-full flex items-center justify-center border border-black/10 hover:bg-black/5 transition-colors text-gray-700"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-black" /> : <VolumeX className="w-3.5 h-3.5 text-gray-400" />}
            </button>

            {/* Specs Drawer Trigger */}
            <button
              onClick={onOpenSpecs}
              title="Open Technical Specifications"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-black/10 hover:bg-black/5 transition-colors text-gray-700"
            >
              <Sliders className="w-3.5 h-3.5 text-gray-600" />
              <span>Specs</span>
            </button>

            {/* Buy CTA */}
            <button
              onClick={onOpenCheckout}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-black text-white hover:bg-gray-800 transition-all shadow-sm hover:shadow active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Buy — $219</span>
            </button>
          </div>
        </div>
      </motion.header>
    </>
  );
};
