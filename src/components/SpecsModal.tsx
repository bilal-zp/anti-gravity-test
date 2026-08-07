import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Monitor, Cpu, Battery, Layers, ShieldCheck } from 'lucide-react';

interface SpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpecsModal: React.FC<SpecsModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80] flex justify-end overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative z-10 w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-20">
              <div>
                <h2 className="text-xl font-bold text-black tracking-tight">Technical Specifications</h2>
                <p className="text-xs text-gray-500 font-mono">CRAFT-1 MECHANICAL KEYBOARD</p>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Spec Sections */}
            <div className="p-6 space-y-8">
              {/* Architecture & Build */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase text-gray-400 mb-4">
                  <Layers className="w-4 h-4 text-black" />
                  <span>Physical Specs & Materials</span>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Case Material</span>
                    <span className="font-medium text-black">CNC 6063 Anodized Aluminum</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Finish</span>
                    <span className="font-medium text-black">Bead-blasted Ceramic White</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Form Factor</span>
                    <span className="font-medium text-black">65% Compact (68 Keys)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Dimensions</span>
                    <span className="font-medium text-black">315 x 110 x 38 mm</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Weight</span>
                    <span className="font-medium text-black">1250g (2.75 lbs)</span>
                  </div>
                </div>
              </div>

              {/* Electronics & Wireless */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase text-gray-400 mb-4">
                  <Battery className="w-4 h-4 text-black" />
                  <span>Power & Connectivity</span>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Battery Capacity</span>
                    <span className="font-medium text-black">4000mAh Dual-Cell Li-ion</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Wireless Modes</span>
                    <span className="font-medium text-black">2.4GHz Dongle / Bluetooth 5.2</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Wired Mode</span>
                    <span className="font-medium text-black">Detachable USB-C Braided</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Polling Rate</span>
                    <span className="font-medium text-black">1000Hz (1ms response)</span>
                  </div>
                </div>
              </div>

              {/* Switches & PCB */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase text-gray-400 mb-4">
                  <Cpu className="w-4 h-4 text-black" />
                  <span>Switches & Sound Dampening</span>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Hot-Swap Sockets</span>
                    <span className="font-medium text-black">3-Pin & 5-Pin Universal</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Plate Material</span>
                    <span className="font-medium text-black">Flex-Cut Polycarbonate</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Acoustic Layers</span>
                    <span className="font-medium text-black">Triple Poron Sound Dampening</span>
                  </div>
                </div>
              </div>

              {/* System Compatibility */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase text-gray-400 mb-4">
                  <Monitor className="w-4 h-4 text-black" />
                  <span>OS Compatibility</span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  {['macOS', 'Windows 11', 'Linux', 'iOS / iPadOS', 'Android'].map((os) => (
                    <span key={os} className="px-3 py-1.5 rounded-lg bg-gray-100 font-medium text-gray-800 flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-black" />
                      {os}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 sticky bottom-0">
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-black text-white font-semibold text-sm hover:bg-gray-800 transition-colors"
              >
                Close Specifications
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
