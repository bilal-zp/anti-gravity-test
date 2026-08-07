import { useState, useEffect, useRef } from 'react';

export interface ScrollProgressState {
  progress: number;       // Smooth lerped progress (0.0 to 1.0)
  rawProgress: number;    // Instant scroll progress (0.0 to 1.0)
  isPinned: boolean;      // True when within scroll pin area
  activeStage: number;    // Current active feature stage (0 to 5)
}

export function useScrollProgress(containerRef: React.RefObject<HTMLElement>): ScrollProgressState {
  const [progress, setProgress] = useState(0);
  const [rawProgress, setRawProgress] = useState(0);
  const [isPinned, setIsPinned] = useState(false);
  const [activeStage, setActiveStage] = useState(0);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollableHeight = rect.height - windowHeight;

      if (totalScrollableHeight <= 0) return;

      // Distance from top of container to top of viewport
      const scrolled = -rect.top;
      const raw = Math.max(0, Math.min(1, scrolled / totalScrollableHeight));

      targetProgressRef.current = raw;
      setRawProgress(raw);
      setIsPinned(rect.top <= 0 && rect.bottom >= windowHeight);

      // Determine stage
      if (raw < 0.15) setActiveStage(0);        // Hero
      else if (raw < 0.35) setActiveStage(1);   // Keycaps
      else if (raw < 0.55) setActiveStage(2);   // Switches
      else if (raw < 0.72) setActiveStage(3);   // PCB
      else if (raw < 0.85) setActiveStage(4);   // Battery
      else if (raw < 0.96) setActiveStage(5);   // Frame / Chassis
      else setActiveStage(6);                   // Final Assembly
    };

    const updateLoop = () => {
      // Smooth lerp interpolation for silky 60 FPS animation
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0001) {
        currentProgressRef.current += diff * 0.12; // Lerp factor
        setProgress(currentProgressRef.current);
      } else {
        currentProgressRef.current = targetProgressRef.current;
        setProgress(targetProgressRef.current);
      }

      rafIdRef.current = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    rafIdRef.current = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [containerRef]);

  return {
    progress,
    rawProgress,
    isPinned,
    activeStage,
  };
}
