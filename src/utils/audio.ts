// Web Audio API Synthesizer for Mechanical Keyboard Sound Simulation

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playSwitchClick(type: 'linear' | 'tactile' | 'silent' = 'linear') {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Primary click noise generator
    const bufferSize = ctx.sampleRate * 0.04; // 40ms sound burst
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.15));
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    // Filter configuration based on switch profile
    const filter = ctx.createBiquadFilter();
    
    if (type === 'linear') {
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.Q.setValueAtTime(3.5, now);
    } else if (type === 'tactile') {
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(2400, now);
      filter.Q.setValueAtTime(5.0, now);
    } else {
      // Silent switch: deep muted thock
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, now);
      filter.Q.setValueAtTime(1.5, now);
    }

    const gainNode = ctx.createGain();
    const volume = type === 'silent' ? 0.08 : 0.18;
    gainNode.gain.setValueAtTime(volume, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    whiteNoise.start(now);
    whiteNoise.stop(now + 0.04);

    // Deep bottom-out stem impact frequency
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    
    osc.type = 'sine';
    const baseFreq = type === 'silent' ? 140 : 220;
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.03);

    oscGain.gain.setValueAtTime(volume * 0.9, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.035);
  } catch (err) {
    console.warn('Audio context playback failed:', err);
  }
}
