import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Sliders, Volume2, ShieldCheck, Sparkles, Zap, Radio, Keyboard } from 'lucide-react';
import { playSwitchClick } from '../utils/audio';

interface FinalSectionProps {
  onOpenCheckout: () => void;
  onOpenSpecs: () => void;
}

export const FinalSection: React.FC<FinalSectionProps> = ({ onOpenCheckout, onOpenSpecs }) => {
  const [activeTestKey, setActiveTestKey] = useState<string | null>(null);

  const handleKeyPressTest = (keyName: string, type: 'linear' | 'tactile' | 'silent') => {
    setActiveTestKey(keyName);
    playSwitchClick(type);
    setTimeout(() => setActiveTestKey(null), 150);
  };

  return (
    <section className="relative z-30 bg-white text-[#111111] pt-24 pb-16 px-6 sm:px-12 border-t border-black/5">
      <div className="max-w-6xl mx-auto">
        {/* Main Headline */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-mono tracking-widest text-gray-400 uppercase mb-4 block">
              MASTER WORKSPACE COMPANION
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight-apple text-black mb-6">
              Designed to Perform.<br />
              <span className="text-gray-400 font-light italic">Built to Last.</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              Every curve, switch spring, and acoustics layer harmonized to elevate your tactile workspace.
            </p>
          </motion.div>
        </div>

        {/* Feature Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-8 rounded-3xl bg-gray-50 border border-black/5 hover:border-black/15 transition-all shadow-apple-sm group"
          >
            <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-black mb-2">1000Hz Ultra Latency</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Proprietary 2.4GHz wireless protocol delivers uncompromised 1ms response speeds competitive with pro esports wired setups.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-3xl bg-gray-50 border border-black/5 hover:border-black/15 transition-all shadow-apple-sm group"
          >
            <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Radio className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-black mb-2">Triple Poron Acoustic Foam</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Custom die-cut dampening sheets between PCB, plate, and chassis remove ping and reverb for deep, solid thocks.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-8 rounded-3xl bg-gray-50 border border-black/5 hover:border-black/15 transition-all shadow-apple-sm group"
          >
            <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-black mb-2">Solid 6063 Aluminum</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Heavy block-milled aluminum frame electro-coated with ceramic white standard. No flex, zero movement on any desk mat.
            </p>
          </motion.div>
        </div>

        {/* Interactive Sound Engine Playground */}
        <div id="sound-test" className="p-8 sm:p-12 rounded-3xl bg-black text-white mb-20 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Keyboard className="w-64 h-64 text-white" />
          </div>

          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-gray-400 uppercase mb-3">
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span>REAL-TIME AUDIOTEST SYNTHESIZER</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Tap to Test Acoustic Profile
            </h3>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              Click the simulated keycaps below to audition switch sounds in real-time.
            </p>

            {/* Simulated Keycaps Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 max-w-md mb-6">
              {['ESC', 'Q', 'W', 'E', 'R', 'T', 'A', 'S', 'D', 'F', 'SPACE', 'ENTER'].map((key) => (
                <button
                  key={key}
                  onClick={() => handleKeyPressTest(key, key === 'SPACE' ? 'tactile' : key === 'ENTER' ? 'silent' : 'linear')}
                  className={`py-3 rounded-xl font-mono text-xs font-bold border transition-all active:scale-90 ${
                    activeTestKey === key
                      ? 'bg-white text-black border-white shadow-lg translate-y-1'
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>

            <div className="text-[11px] font-mono text-gray-500">
              * ACOUSTIC PROFILE SYNTHESIZED USING LIVE WEB AUDIO FREQUENCY RESONANCE
            </div>
          </div>
        </div>

        {/* Final CTA Box */}
        <div className="p-12 rounded-3xl glass-panel text-center max-w-3xl mx-auto shadow-apple-lg border border-black/10">
          <h3 className="text-3xl font-extrabold text-black mb-3">Ready to Elevate Your Workspace?</h3>
          <p className="text-gray-600 text-sm mb-8 max-w-md mx-auto">
            Order your CRAFT-1 white mechanical keyboard today with free express worldwide shipping and a 2-year full warranty.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenCheckout}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-black text-white font-semibold text-sm hover:bg-gray-800 transition-all shadow-apple-md hover:scale-102 flex items-center justify-center gap-2.5"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Buy CRAFT-1 — $219</span>
            </button>
            <button
              onClick={onOpenSpecs}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-gray-50 text-black font-semibold text-sm border border-black/10 transition-all flex items-center justify-center gap-2.5"
            >
              <Sliders className="w-4 h-4 text-gray-600" />
              <span>Full Specifications</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-black text-white flex items-center justify-center font-bold text-[10px]">
              C
            </div>
            <span className="font-semibold text-black">CRAFT-1</span>
            <span>© {new Date().getFullYear()} ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex gap-6 font-mono">
            <a href="#" className="hover:text-black transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-black transition-colors">TERMS</a>
            <a href="#" className="hover:text-black transition-colors">SUPPORT</a>
          </div>
        </footer>
      </div>
    </section>
  );
};
