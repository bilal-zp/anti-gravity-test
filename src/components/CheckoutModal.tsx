import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Truck, ShieldCheck, Sparkles, ShoppingCart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSwitchClick } from '../utils/audio';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const [selectedSwitch, setSelectedSwitch] = useState<'linear' | 'tactile' | 'silent'>('linear');
  const [selectedLayout, setSelectedLayout] = useState<'ANSI' | 'ISO'>('ANSI');
  const [isOrdered, setIsOrdered] = useState(false);

  const handleOrder = () => {
    setIsOrdered(true);
    playSwitchClick(selectedSwitch);

    // Trigger high-end celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#111111', '#666666', '#E5E5E5', '#FFFFFF']
      });
    } catch (e) {
      console.log('Confetti playback:', e);
    }
  };

  const handleReset = () => {
    setIsOrdered(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-black/10"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">OFFICIAL STORE</span>
                <h3 className="text-xl font-bold text-black">Configure & Order CRAFT-1</h3>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!isOrdered ? (
              <div className="p-6 space-y-6">
                {/* 1. Switch Selection */}
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-gray-400 mb-3">
                    1. Select Mechanical Switch Type
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'linear', name: 'Linear White', force: '45g Smooth' },
                      { id: 'tactile', name: 'Tactile Grey', force: '55g Bump' },
                      { id: 'silent', name: 'Silent Cream', force: '40g Muted' },
                    ].map((sw) => (
                      <button
                        key={sw.id}
                        onClick={() => {
                          setSelectedSwitch(sw.id as 'linear' | 'tactile' | 'silent');
                          playSwitchClick(sw.id as 'linear' | 'tactile' | 'silent');
                        }}
                        className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                          selectedSwitch === sw.id
                            ? 'border-black bg-black text-white shadow-md'
                            : 'border-gray-200 hover:border-gray-300 text-gray-800 bg-white'
                        }`}
                      >
                        {selectedSwitch === sw.id && (
                          <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-white text-black flex items-center justify-center">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                        <div className="font-semibold text-xs mb-1">{sw.name}</div>
                        <div className={`text-[10px] font-mono ${selectedSwitch === sw.id ? 'text-gray-300' : 'text-gray-400'}`}>
                          {sw.force}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Layout Selection */}
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-gray-400 mb-3">
                    2. Choose Keyboard Layout
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'ANSI', label: 'ANSI 65%', desc: 'Standard US English Layout' },
                      { id: 'ISO', label: 'ISO 65%', desc: 'European / UK Layout' },
                    ].map((ly) => (
                      <button
                        key={ly.id}
                        onClick={() => setSelectedLayout(ly.id as 'ANSI' | 'ISO')}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          selectedLayout === ly.id
                            ? 'border-black bg-black text-white'
                            : 'border-gray-200 hover:border-gray-300 text-gray-800 bg-white'
                        }`}
                      >
                        <div className="font-semibold text-xs mb-0.5">{ly.label}</div>
                        <div className={`text-[10px] ${selectedLayout === ly.id ? 'text-gray-300' : 'text-gray-400'}`}>
                          {ly.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Summary Box */}
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Base Craft White Keyboard (65%)</span>
                    <span className="font-mono text-black font-semibold">$219.00</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Worldwide Express Shipping</span>
                    <span className="font-mono text-emerald-600 font-semibold">FREE</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between text-sm font-bold text-black">
                    <span>Total Amount</span>
                    <span className="font-mono text-base">$219.00 USD</span>
                  </div>
                </div>

                {/* Action CTA */}
                <button
                  onClick={handleOrder}
                  className="w-full py-4 rounded-2xl bg-black text-white font-semibold text-sm hover:bg-gray-900 transition-all flex items-center justify-center gap-2 shadow-apple-md hover:shadow-apple-lg active:scale-98"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Complete Order — $219.00</span>
                </button>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-6 text-[11px] text-gray-400">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-gray-600" /> Ships in 24 Hours
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-gray-600" /> 2-Year Warranty
                  </span>
                </div>
              </div>
            ) : (
              /* Success View */
              <div className="p-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mx-auto text-2xl shadow-lg">
                  <Sparkles className="w-8 h-8 text-amber-300" />
                </div>

                <div>
                  <h4 className="text-2xl font-extrabold text-black mb-2">Order Confirmed!</h4>
                  <p className="text-sm text-gray-600 max-w-sm mx-auto">
                    Thank you for choosing CRAFT-1. Your custom mechanical keyboard is being prepared for express shipping.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 font-mono text-xs text-gray-600 text-left space-y-1.5 max-w-xs mx-auto">
                  <div className="flex justify-between">
                    <span>ORDER ID:</span>
                    <span className="text-black font-bold">#CRF-89421</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SWITCHES:</span>
                    <span className="text-black font-semibold uppercase">{selectedSwitch}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>LAYOUT:</span>
                    <span className="text-black font-semibold">{selectedLayout}</span>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="px-8 py-3 rounded-full bg-black text-white font-semibold text-xs hover:bg-gray-800 transition-colors"
                >
                  Return to Experience
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
