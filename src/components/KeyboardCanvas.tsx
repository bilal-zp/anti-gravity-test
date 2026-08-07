import React, { useRef, useEffect, useState, useCallback } from 'react';

interface KeyboardCanvasProps {
  images: HTMLImageElement[];
  scrollProgress: number;
  totalFrames: number;
}

export const KeyboardCanvas: React.FC<KeyboardCanvasProps> = ({
  images,
  scrollProgress,
  totalFrames,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  useEffect(() => {
    if (!images || images.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // 14% initial scroll dead-band: hold frame 0 while hero fades, then explode
    const scrollGapThreshold = 0.14;
    const effectiveProgress =
      scrollProgress <= scrollGapThreshold
        ? 0
        : Math.min(1, (scrollProgress - scrollGapThreshold) / (1 - scrollGapThreshold));

    const index = Math.min(
      totalFrames - 1,
      Math.max(0, Math.floor(effectiveProgress * (totalFrames - 1)))
    );

    const render = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const parentEl = canvas.parentElement;
      const width = parentEl ? parentEl.clientWidth : window.innerWidth;
      const height = parentEl ? parentEl.clientHeight : window.innerHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }

      const img = images[index];
      if (!img || !img.complete) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const imgAspect = img.width / img.height;
      const canvasAspect = canvas.width / canvas.height;

      // Keyboard occupies 58% of the canvas width — keeps it compact and in lower half
      const SCALE = 0.58;

      let drawWidth: number, drawHeight: number;
      if (imgAspect > canvasAspect) {
        drawWidth = canvas.width * SCALE;
        drawHeight = drawWidth / imgAspect;
      } else {
        drawHeight = canvas.height * SCALE;
        drawWidth = drawHeight * imgAspect;
      }

      // Center horizontally; push down so keyboard occupies bottom 52% of viewport
      const offsetX = (canvas.width - drawWidth) / 2;
      // Start drawing at 48% of canvas height = keyboard occupies bottom portion
      const offsetY = canvas.height * 0.44;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    render();

    const onResize = () => render();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [images, scrollProgress, totalFrames]);

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-full h-full overflow-hidden select-none"
      style={{ background: 'linear-gradient(180deg, #EBEBED 0%, #F5F5F7 30%, #FFFFFF 60%, #F0F0F2 100%)' }}
    >
      {/* ── GLOWING DOME ARCH ── */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          left: '8%',
          right: '8%',
          top: '8%',
          bottom: '0',
          borderRadius: '50% 50% 0 0 / 55% 55% 0 0',
          border: '1.5px solid rgba(255,255,255,0.9)',
          boxShadow:
            '0 -18px 90px rgba(255,255,255,1), inset 0 30px 100px rgba(255,255,255,0.85)',
        }}
      />

      {/* ── OVAL PEDESTAL STAGE ── */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          bottom: '-40px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '75%',
          height: '160px',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(220,220,225,0.9) 0%, rgba(200,200,205,0.5) 50%, transparent 80%)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.07)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '6px',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.8)',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* ── FLOATING POLYHEDRON LEFT ── */}
      <div
        className="absolute pointer-events-none z-0 animate-float"
        style={{ left: '6%', top: '38%', animationDelay: '0s' }}
      >
        <div
          style={{
            width: '62px',
            height: '62px',
            borderRadius: '14px',
            border: '1px solid rgba(255,255,255,0.85)',
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(200,200,210,0.35) 100%)',
            backdropFilter: 'blur(8px)',
            transform: 'rotate(15deg)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          }}
        />
      </div>

      {/* ── FLOATING POLYHEDRON TOP RIGHT ── */}
      <div
        className="absolute pointer-events-none z-0 animate-float"
        style={{ right: '7%', top: '22%', animationDelay: '2.5s' }}
      >
        <div
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.85)',
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(200,200,210,0.4) 100%)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 6px 20px rgba(0,0,0,0.07)',
          }}
        />
      </div>

      {/* ── FLOATING SMALL SPHERE RIGHT MID ── */}
      <div
        className="absolute pointer-events-none z-0 animate-float"
        style={{ right: '13%', top: '56%', animationDelay: '1.2s' }}
      >
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.8)',
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(210,210,220,0.3) 100%)',
            backdropFilter: 'blur(6px)',
            boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
          }}
        />
      </div>

      {/* ── MOUSE SPOTLIGHT ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(700px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,255,255,0.6), transparent 70%)`,
        }}
      />

      {/* ── CANVAS ── */}
      <canvas
        ref={canvasRef}
        className="absolute z-10 pointer-events-none"
        style={{ top: 0, left: 0, filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.10))' }}
      />
    </div>
  );
};
