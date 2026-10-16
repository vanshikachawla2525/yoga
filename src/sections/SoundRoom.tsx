/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 06 — SOUND ROOM (immersive acoustic twist)
 * Concentric canvas waveform reacting to Web Audio API synthesized singing-bowl harmonics.
 * Interactive bowl strike, mute control, and safe browser audio lifecycle.
 */

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Sparkles, Play, Square } from "lucide-react";
import { IMAGES } from "../data/content";

export const SoundRoom: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const ambientNodesRef = useRef<OscillatorNode[]>([]);
  const animFrameIdRef = useRef<number | null>(null);

  const [isPlayingAmbient, setIsPlayingAmbient] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [lastStrikeTime, setLastStrikeTime] = useState<number | null>(null);

  // Initialize Web Audio context on demand
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const master = ctx.createGain();
      const analyser = ctx.createAnalyser();

      analyser.fftSize = 128;
      master.gain.value = 0.28; // gentle luxury volume

      master.connect(analyser);
      analyser.connect(ctx.destination);

      audioCtxRef.current = ctx;
      masterGainRef.current = master;
      analyserRef.current = analyser;
    }

    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  };

  // Synthesize singing bowl strike with authentic overtone decay
  const strikeBowl = () => {
    initAudio();
    const ctx = audioCtxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master) return;

    setLastStrikeTime(Date.now());

    // Tibetan Singing Bowl harmonic recipe: Fundamental ~216Hz + partials
    const frequencies = [216, 598, 1192, 1850];
    const decayTimes = [5.5, 4.0, 2.8, 1.6];

    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      // Slight pitch wobble for organic hammered metal realism
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.998, ctx.currentTime + decayTimes[idx]);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.35 / (idx + 1), ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + decayTimes[idx]);

      osc.connect(gain);
      gain.connect(master);

      osc.start();
      osc.stop(ctx.currentTime + decayTimes[idx] + 0.1);
    });
  };

  // Toggle ambient sustained sound bath drone
  const toggleAmbient = () => {
    initAudio();
    const ctx = audioCtxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master) return;

    if (isPlayingAmbient) {
      ambientNodesRef.current.forEach((n) => {
        try {
          n.stop();
        } catch (_) {}
      });
      ambientNodesRef.current = [];
      setIsPlayingAmbient(false);
    } else {
      const droneFreqs = [108, 216, 324, 432];
      const newNodes: OscillatorNode[] = [];

      droneFreqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.12 / (i + 1), ctx.currentTime + 1.5);

        osc.connect(gain);
        gain.connect(master);

        osc.start();
        newNodes.push(osc);
      });

      ambientNodesRef.current = newNodes;
      setIsPlayingAmbient(true);
    }
  };

  const toggleMute = () => {
    if (!masterGainRef.current || !audioCtxRef.current) return;
    if (isMuted) {
      masterGainRef.current.gain.setValueAtTime(0.28, audioCtxRef.current.currentTime);
      setIsMuted(false);
    } else {
      masterGainRef.current.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
      setIsMuted(true);
    }
  };

  // Concentric rings waveform visualizer loop on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = 360);

    const handleResize = () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = 360;
      }
    };
    window.addEventListener("resize", handleResize);

    const dataArray = new Uint8Array(64);
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Extract frequency amplitude if active
      let energy = 0;
      if (analyserRef.current) {
        analyserRef.current.getByteFrequencyData(dataArray);
        energy = dataArray.reduce((a, b) => a + b, 0) / (dataArray.length * 255);
      }

      angle += 0.015;
      const pulse = Math.sin(angle) * 8 + energy * 35;

      // Draw 6 concentric acoustic ripple circles
      const rings = [40, 75, 110, 145, 180, 215];

      rings.forEach((baseRadius, idx) => {
        const radius = baseRadius + pulse * (1 + idx * 0.35);
        ctx.beginPath();
        ctx.arc(centerX, centerY, Math.max(1, radius), 0, Math.PI * 2);
        ctx.lineWidth = idx === 0 ? 1.5 : 1;
        ctx.strokeStyle =
          idx % 2 === 0
            ? `rgba(200, 164, 93, ${0.15 + energy * 0.4})`
            : `rgba(239, 233, 223, ${0.08 + energy * 0.25})`;
        ctx.stroke();
      });

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, []);

  // Cleanup audio nodes on unmount
  useEffect(() => {
    return () => {
      ambientNodesRef.current.forEach((n) => {
        try {
          n.stop();
        } catch (_) {}
      });
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <section
      id="sound-section"
      className="relative py-28 px-6 md:px-12 bg-[#111110] text-[#EFE9DF] border-b border-[#C8A45D]/15 overflow-hidden select-none"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="text-xs font-mono text-[#C8A45D] tracking-widest">
            (05)
          </span>
          <span className="text-xs uppercase tracking-[0.25em] text-[#8C8A84] font-sans">
            Acoustic Sanctuary
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#EFE9DF] tracking-tight mb-4">
          The Sound Room
        </h2>

        <p className="font-sans text-sm md:text-base text-[#8C8A84] max-w-xl font-light mb-8">
          Sound waves penetrate where hands cannot reach. Experience Tibetan singing bowl harmonics synthesized live in your browser.
        </p>

        {/* Visualizer & Interactive Strike Container */}
        <div className="relative w-full max-w-2xl h-[380px] rounded-3xl bg-[#1B1A18]/80 border border-[#C8A45D]/25 flex flex-col items-center justify-center p-6 overflow-hidden shadow-2xl">
          {/* Concentric Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
          />

          {/* Central Interactive Bowl Orb Button */}
          <button
            onClick={strikeBowl}
            className="relative z-10 group w-32 h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-[#2D281E] to-[#111110] border-2 border-[#C8A45D]/60 flex flex-col items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#C8A45D]"
            aria-label="Strike the singing bowl"
          >
            <div className="w-14 h-14 rounded-full bg-[#C8A45D]/15 flex items-center justify-center text-[#C8A45D] group-hover:bg-[#C8A45D] group-hover:text-[#111110] transition-colors mb-1">
              <Sparkles size={20} />
            </div>
            <span className="text-[10px] uppercase font-sans tracking-[0.22em] text-[#EFE9DF] group-hover:text-[#C8A45D] font-medium">
              Tap to Strike
            </span>
          </button>

          {/* Audio Controls Bar */}
          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-[#8C8A84]">
            {/* Ambient Toggle */}
            <button
              onClick={toggleAmbient}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111110]/80 border border-[#C8A45D]/20 hover:border-[#C8A45D] text-[11px] font-sans uppercase tracking-wider text-[#EFE9DF] transition-colors"
            >
              {isPlayingAmbient ? <Square size={12} className="text-[#C8A45D]" /> : <Play size={12} />}
              <span>{isPlayingAmbient ? "Stop Ambient Drone" : "Hear Ambient Bowl"}</span>
            </button>

            {/* Mute button */}
            <button
              onClick={toggleMute}
              className="p-2 rounded-full bg-[#111110]/80 border border-[#C8A45D]/20 hover:border-[#C8A45D] text-[#EFE9DF] transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-[#C8A45D]" />}
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-xs text-[#8C8A84]/80 font-serif italic max-w-md">
          Experience varies by person. Acoustic vibrational immersion is intended for sensory decompression and is not a medical treatment.
        </p>
      </div>
    </section>
  );
};
