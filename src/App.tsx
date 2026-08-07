import React, { useRef, useState } from 'react';
import { useImageSequence } from './hooks/useImageSequence';
import { useScrollProgress } from './hooks/useScrollProgress';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { KeyboardCanvas } from './components/KeyboardCanvas';
import { HeroOverlay } from './components/HeroOverlay';
import { FeatureOverlays } from './components/FeatureOverlays';
import { FinalSection } from './components/FinalSection';
import { SpecsModal } from './components/SpecsModal';
import { CheckoutModal } from './components/CheckoutModal';

export default function App() {
  const { images, isLoaded, progress, totalFrames, loadedCount } = useImageSequence();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { progress: scrollProgress } = useScrollProgress(containerRef);

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-[#111111] relative selection:bg-black selection:text-white">
      {/* Preloader */}
      <Loader
        progress={progress}
        isLoaded={isLoaded}
        totalFrames={totalFrames}
        loadedCount={loadedCount}
      />

      {/* Main Content (Revealed after preloading completes) */}
      {isLoaded && (
        <>
          {/* Navigation Bar */}
          <Navbar
            scrollProgress={scrollProgress}
            soundEnabled={soundEnabled}
            onToggleSound={() => setSoundEnabled(prev => !prev)}
            onOpenSpecs={() => setIsSpecsOpen(true)}
            onOpenCheckout={() => setIsCheckoutOpen(true)}
          />

          {/* 500vh Pinned Scroll Animation Track */}
          <div ref={containerRef} id="sequence" className="relative h-[500vh] w-full">
            {/* Sticky Viewport Frame (100vh) */}
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between">
              {/* Image Sequence Canvas */}
              <KeyboardCanvas
                images={images}
                scrollProgress={scrollProgress}
                totalFrames={totalFrames}
              />

              {/* Hero Overlay (0% to 15% scroll) */}
              <HeroOverlay
                scrollProgress={scrollProgress}
                onOpenCheckout={() => setIsCheckoutOpen(true)}
              />

              {/* Feature Timeline Overlays (18% to 95% scroll) */}
              <FeatureOverlays scrollProgress={scrollProgress} />
            </div>
          </div>

          {/* Final Assembled Keyboard & Purchase Section */}
          <FinalSection
            onOpenCheckout={() => setIsCheckoutOpen(true)}
            onOpenSpecs={() => setIsSpecsOpen(true)}
          />

          {/* Modals */}
          <SpecsModal
            isOpen={isSpecsOpen}
            onClose={() => setIsSpecsOpen(false)}
          />

          <CheckoutModal
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
          />
        </>
      )}
    </div>
  );
}
