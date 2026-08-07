/// <reference types="vite/client" />
import { useState, useEffect, useRef } from 'react';

export interface ImageSequenceState {
  images: HTMLImageElement[];
  isLoaded: boolean;
  progress: number;
  totalFrames: number;
  loadedCount: number;
}

export function useImageSequence(): ImageSequenceState {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const totalFramesRef = useRef(0);

  useEffect(() => {
    // Collect frame URLs dynamically
    let urls: string[] = [];

    try {
      // Vite glob import for files inside workspace ezgif-25b62870ebba298b-jpg directory
      const globRoot = (import.meta as unknown as { glob: (p: string, o: object) => Record<string, unknown> }).glob('/ezgif-25b62870ebba298b-jpg/*.jpg', { eager: true, import: 'default' });
      const globRel = (import.meta as unknown as { glob: (p: string, o: object) => Record<string, unknown> }).glob('../ezgif-25b62870ebba298b-jpg/*.jpg', { eager: true, import: 'default' });
      
      const allGlob = { ...globRoot, ...globRel };
      const sortedKeys = Object.keys(allGlob).sort((a, b) =>
        a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
      );

      if (sortedKeys.length > 0) {
        urls = sortedKeys.map(key => allGlob[key] as string);
      }
    } catch (e) {
      console.warn('Vite glob import fallback enabled:', e);
    }

    // Fallback if glob didn't resolve (e.g., standard static directory path)
    if (urls.length === 0) {
      for (let i = 1; i <= 240; i++) {
        const frameNum = String(i).padStart(3, '0');
        urls.push(`/ezgif-25b62870ebba298b-jpg/ezgif-frame-${frameNum}.jpg`);
      }
    }

    totalFramesRef.current = urls.length;
    let count = 0;
    const loadedImages: HTMLImageElement[] = new Array(urls.length);

    const onFrameLoad = (index: number, img: HTMLImageElement) => {
      loadedImages[index] = img;
      count++;
      setLoadedCount(count);
      const currentPct = Math.round((count / urls.length) * 100);
      setProgress(currentPct);

      if (count === urls.length) {
        imagesRef.current = loadedImages;
        setIsLoaded(true);
      }
    };

    urls.forEach((url, idx) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => onFrameLoad(idx, img);
      img.onerror = () => {
        // Try fallback relative loading
        const altImg = new Image();
        altImg.onload = () => onFrameLoad(idx, altImg);
        altImg.onerror = () => onFrameLoad(idx, img); // proceed to avoid hanging
        const frameNum = String(idx + 1).padStart(3, '0');
        altImg.src = `./ezgif-25b62870ebba298b-jpg/ezgif-frame-${frameNum}.jpg`;
      };
      img.src = url;
    });

    return () => {
      // Cleanup
    };
  }, []);

  return {
    images: imagesRef.current,
    isLoaded,
    progress,
    totalFrames: totalFramesRef.current || 240,
    loadedCount,
  };
}
