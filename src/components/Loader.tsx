import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  progress: number;
  isLoaded: boolean;
  totalFrames: number;
  loadedCount: number;
}

export const Loader: React.FC<LoaderProps> = ({ progress, isLoaded, totalFrames, loadedCount }) => {
  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white text-[#111111]"
        >
          <div className="flex flex-col items-center max-w-sm w-full px-6 text-center">
            {/* Minimal Brand Symbol */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center font-bold text-lg shadow-lg">
                C
              </div>
              <span className="font-semibold tracking-tight text-xl text-black">
                CRAFT<span className="text-gray-400 font-light ml-1.5">WHITE</span>
              </span>
            </motion.div>

            {/* Headline */}
            <h2 className="text-sm font-medium tracking-wide uppercase text-gray-500 mb-6">
              Preloading Precision Optics
            </h2>

            {/* Progress Bar Container */}
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mb-4 relative p-0.5 border border-black/5">
              <motion.div
                className="h-full bg-black rounded-full shadow-sm"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.2 }}
              />
            </div>

            {/* Progress Counters */}
            <div className="flex items-center justify-between w-full text-xs font-mono text-gray-500">
              <span>{loadedCount} / {totalFrames} FRAMES</span>
              <span className="font-semibold text-black">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
