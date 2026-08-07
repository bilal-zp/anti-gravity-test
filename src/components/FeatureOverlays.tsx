import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Sparkles, Cpu, BatteryCharging, Shield, CheckCircle2 } from 'lucide-react';
import { playSwitchClick } from '../utils/audio';

interface FeatureOverlaysProps {
  scrollProgress: number;
}

export const FeatureOverlays: React.FC<FeatureOverlaysProps> = ({ scrollProgress }) => {
  // Thresholds for each feature card overlay
  const isKeycaps = scrollProgress >= 0.18 && scrollProgress < 0.36;
  const isSwitches = scrollProgress >= 0.38 && scrollProgress < 0.56;
  const isPCB = scrollProgress >= 0.58 && scrollProgress < 0.73;
  const isBattery = scrollProgress >= 0.75 && scrollProgress < 0.86;
  const isFrame = scrollProgress >= 0.88 && scrollProgress < 0.96;

  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-between p-6 sm:p-10 max-w-7xl mx-auto">
      {/* 1. KEYCAPS SECTION (Left Side) */}
      <AnimatePresence>
        {isKeycaps && (
          <motion.div
            key="keycaps"
            initial={{ opacity: 0, x: -40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto max-w-sm w-full glass-panel p-6 rounded-3xl shadow-apple-lg border border-black/10 backdrop-blur-xl bg-white/85"
          >
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-gray-500 uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-black" />
              <span>01 / KEYCAP ENGINEERING</span>
            </div>

            <h3 className="text-2xl font-extrabold text-black tracking-tight mb-2">
              Premium PBT Keycaps
            </h3>

            <p className="text-gray-600 text-xs leading-relaxed mb-4">
              Double-shot PBT construction engineered for durability, zero shine, and acoustic resonance. Sculpted OEM profile for ergonomic precision.
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs font-medium text-gray-700">
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-gray-50 border border-black/5">
                <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                <span>Double-Shot</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-gray-50 border border-black/5">
                <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                <span>Oil-Resistant</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. SWITCHES SECTION (Right Side) */}
      <AnimatePresence>
        {isSwitches && (
          <motion.div
            key="switches"
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto max-w-sm w-full glass-panel p-6 rounded-3xl shadow-apple-lg border border-black/10 ml-auto backdrop-blur-xl bg-white/85"
          >
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-gray-500 uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>02 / TACTILITY & ACOUSTICS</span>
            </div>

            <h3 className="text-2xl font-extrabold text-black tracking-tight mb-2">
              Lubricated Switches
            </h3>

            <p className="text-gray-600 text-xs leading-relaxed mb-4">
              Pre-lubed linear switches with POM stem and nylon housing for butter-smooth actuation and deep acoustic thock.
            </p>

            {/* Interactive Click Sampler */}
            <div className="p-3 rounded-2xl bg-gray-100/90 border border-black/5">
              <div className="flex items-center justify-between text-[11px] font-semibold text-gray-700 mb-2">
                <span className="flex items-center gap-1">
                  <Volume2 className="w-3 h-3 text-black" />
                  TEST ACOUSTICS
                </span>
                <span className="font-mono text-gray-400">CLICK TO HEAR</span>
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => playSwitchClick('linear')}
                  className="py-2 px-1.5 rounded-xl bg-white hover:bg-black hover:text-white text-[11px] font-semibold text-gray-800 transition-all border border-black/10 active:scale-95 shadow-sm"
                >
                  Linear
                </button>
                <button
                  onClick={() => playSwitchClick('tactile')}
                  className="py-2 px-1.5 rounded-xl bg-white hover:bg-black hover:text-white text-[11px] font-semibold text-gray-800 transition-all border border-black/10 active:scale-95 shadow-sm"
                >
                  Tactile
                </button>
                <button
                  onClick={() => playSwitchClick('silent')}
                  className="py-2 px-1.5 rounded-xl bg-white hover:bg-black hover:text-white text-[11px] font-semibold text-gray-800 transition-all border border-black/10 active:scale-95 shadow-sm"
                >
                  Silent
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. PCB SECTION (Left Side) */}
      <AnimatePresence>
        {isPCB && (
          <motion.div
            key="pcb"
            initial={{ opacity: 0, x: -40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto max-w-sm w-full glass-panel p-6 rounded-3xl shadow-apple-lg border border-black/10 backdrop-blur-xl bg-white/85"
          >
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-gray-500 uppercase mb-2">
              <Cpu className="w-3.5 h-3.5 text-indigo-500" />
              <span>03 / ARCHITECTURE</span>
            </div>

            <h3 className="text-2xl font-extrabold text-black tracking-tight mb-2">
              Hot-Swappable PCB
            </h3>

            <p className="text-gray-600 text-xs leading-relaxed mb-4">
              Universal 3-pin and 5-pin hot-swap sockets. Triple-layer Poron dampening foam eliminates hollow ping.
            </p>

            <div className="space-y-1.5 text-xs font-medium text-gray-700">
              <div className="p-2 rounded-xl bg-gray-50 border border-black/5 flex items-center justify-between">
                <span>Per-Key RGB</span>
                <span className="font-mono text-gray-500">16.8M COLORS</span>
              </div>
              <div className="p-2 rounded-xl bg-gray-50 border border-black/5 flex items-center justify-between">
                <span>Polling Rate</span>
                <span className="font-mono text-black font-semibold">1000 Hz / 1ms</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. BATTERY SECTION (Right Side) */}
      <AnimatePresence>
        {isBattery && (
          <motion.div
            key="battery"
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto max-w-sm w-full glass-panel p-6 rounded-3xl shadow-apple-lg border border-black/10 ml-auto backdrop-blur-xl bg-white/85"
          >
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-gray-500 uppercase mb-2">
              <BatteryCharging className="w-3.5 h-3.5 text-emerald-500" />
              <span>04 / POWER ENGINE</span>
            </div>

            <h3 className="text-2xl font-extrabold text-black tracking-tight mb-2">
              4000mAh Battery
            </h3>

            <p className="text-gray-600 text-xs leading-relaxed mb-4">
              Up to 200 hours of wireless productivity over ultra-low latency 2.4GHz receiver or Bluetooth 5.2.
            </p>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2.5 rounded-2xl bg-gray-100/90">
                <div className="text-xl font-bold text-black font-mono">200 HRS</div>
                <div className="text-[9px] text-gray-500 font-mono uppercase">RGB OFF</div>
              </div>
              <div className="p-2.5 rounded-2xl bg-gray-100/90">
                <div className="text-xl font-bold text-black font-mono">&lt; 1ms</div>
                <div className="text-[9px] text-gray-500 font-mono uppercase">2.4GHz Speed</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. FRAME SECTION (Right Side) */}
      <AnimatePresence>
        {isFrame && (
          <motion.div
            key="frame"
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto max-w-sm w-full glass-panel p-6 rounded-3xl shadow-apple-lg border border-black/10 ml-auto backdrop-blur-xl bg-white/85"
          >
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-gray-500 uppercase mb-2">
              <Shield className="w-3.5 h-3.5 text-gray-700" />
              <span>05 / CNC CHASSIS</span>
            </div>

            <h3 className="text-2xl font-extrabold text-black tracking-tight mb-2">
              Aluminum Frame
            </h3>

            <p className="text-gray-600 text-xs leading-relaxed mb-4">
              Precision-milled 6063 aluminum alloy finished with ceramic white electro-coating for zero-flex stability.
            </p>

            <div className="p-2 rounded-xl bg-gray-50 border border-black/5 text-xs font-medium text-gray-700 flex items-center justify-between">
              <span>Bead-Blasted</span>
              <span className="font-mono text-black font-semibold">CERAMIC WHITE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
