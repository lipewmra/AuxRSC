import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Award, ChevronRight, X, ShieldCheck } from 'lucide-react';

interface RscIntroAnimationModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export const RscIntroAnimationModal: React.FC<RscIntroAnimationModalProps> = ({
  isOpen,
  onComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [animationPhase, setAnimationPhase] = useState<number>(0);

  useEffect(() => {
    if (!isOpen) {
      setAnimationPhase(0);
      return;
    }

    const t1 = setTimeout(() => setAnimationPhase(1), 300);
    const t2 = setTimeout(() => setAnimationPhase(2), 1200);
    const t3 = setTimeout(() => setAnimationPhase(3), 2200);

    const autoFinishTimer = setTimeout(() => {
      onComplete();
    }, 6000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(autoFinishTimer);
    };
  }, [isOpen, onComplete]);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    interface Coin {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      rotation: number;
      vRot: number;
      opacity: number;
      color: string;
    }

    interface Sparkle {
      x: number;
      y: number;
      size: number;
      alpha: number;
      fade: number;
    }

    const coins: Coin[] = [];
    const sparkles: Sparkle[] = [];

    for (let i = 0; i < 40; i++) {
      coins.push({
        x: Math.random() * width,
        y: -Math.random() * height - 20,
        vx: (Math.random() - 0.5) * 2,
        vy: 3 + Math.random() * 4,
        radius: 8 + Math.random() * 8,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.15,
        opacity: 0.8 + Math.random() * 0.2,
        color: Math.random() > 0.3 ? '#EAA816' : '#FEF0B2',
      });
    }

    for (let i = 0; i < 25; i++) {
      sparkles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 1 + Math.random() * 3,
        alpha: Math.random(),
        fade: 0.01 + Math.random() * 0.02,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      coins.forEach((coin) => {
        coin.y += coin.vy;
        coin.x += coin.vx;
        coin.rotation += coin.vRot;

        if (coin.y > height + 30) {
          coin.y = -20;
          coin.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(coin.x, coin.y);
        ctx.rotate(coin.rotation);
        ctx.globalAlpha = coin.opacity;

        ctx.beginPath();
        ctx.ellipse(0, 0, coin.radius, coin.radius * 0.6, 0, 0, Math.PI * 2);
        ctx.fillStyle = coin.color;
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = '#B37800';
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(0, 0, coin.radius * 0.6, coin.radius * 0.35, 0, 0, Math.PI * 2);
        ctx.strokeStyle = '#FFF8D6';
        ctx.stroke();

        ctx.restore();
      });

      sparkles.forEach((s) => {
        s.alpha += s.fade;
        if (s.alpha > 1 || s.alpha < 0) s.fade = -s.fade;

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, s.alpha));
        ctx.fillStyle = '#2B96E3';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00F0FF';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md overflow-hidden select-none">
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-[#132247]/60 via-[#2B96E3]/20 to-[#EAA816]/30 rounded-full blur-3xl pointer-events-none animate-pulse" />

        <button
          type="button"
          onClick={onComplete}
          className="absolute top-5 right-5 z-20 px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-full border border-white/20 backdrop-blur-md transition flex items-center gap-1.5 cursor-pointer hover:scale-105"
        >
          <span>Pular Animação</span>
          <X className="h-4 w-4 text-[#EAA816]" />
        </button>

        <div className="relative z-10 flex flex-col items-center justify-center px-4 max-w-2xl text-center">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center mb-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 1 }}
              transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2B96E3]/30 via-[#EAA816]/20 to-[#00F0FF]/30 blur-2xl"
            />

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative z-10 w-full h-full flex items-center justify-center"
            >
              <svg viewBox="0 0 320 320" className="w-full h-full drop-shadow-2xl">
                <defs>
                  <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1E3A8A" />
                    <stop offset="100%" stopColor="#0F172A" />
                  </linearGradient>
                  <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#78350F" />
                    <stop offset="100%" stopColor="#451A03" />
                  </linearGradient>
                  <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF099" />
                    <stop offset="50%" stopColor="#EAA816" />
                    <stop offset="100%" stopColor="#996500" />
                  </linearGradient>
                </defs>

                <ellipse cx="160" cy="115" rx="72" ry="68" fill="#1C1917" />
                <circle cx="100" cy="110" r="35" fill="#1C1917" />
                <circle cx="220" cy="110" r="35" fill="#1C1917" />
                <circle cx="125" cy="70" r="38" fill="#262626" />
                <circle cx="195" cy="70" r="38" fill="#262626" />

                <ellipse cx="160" cy="130" rx="36" ry="42" fill="url(#skinGrad)" />
                <circle cx="122" cy="132" r="8" fill="#582106" />
                <circle cx="198" cy="132" r="8" fill="#582106" />

                <circle cx="120" cy="142" r="6" fill="none" stroke="url(#goldGrad)" strokeWidth="2.5" />
                <circle cx="200" cy="142" r="6" fill="none" stroke="url(#goldGrad)" strokeWidth="2.5" />

                <ellipse cx="146" cy="126" rx="4" ry="5" fill="#FFF" />
                <circle cx="146" cy="126" r="2.5" fill="#1C1917" />
                <ellipse cx="174" cy="126" rx="4" ry="5" fill="#FFF" />
                <circle cx="174" cy="126" r="2.5" fill="#1C1917" />
                <path d="M 145 145 Q 160 160 175 145 Z" fill="#FFFFFF" />

                <rect x="148" y="165" width="24" height="25" fill="#582106" rx="4" />
                <path d="M 100 280 L 125 185 L 195 185 L 220 280 Z" fill="url(#suitGrad)" />
                <path d="M 125 185 L 160 235 L 138 280 Z" fill="#2563EB" opacity="0.8" />
                <path d="M 195 185 L 160 235 L 182 280 Z" fill="#2563EB" opacity="0.8" />

                {animationPhase >= 1 && (
                  <g className="animate-bounce">
                    <path d="M 142 185 L 155 212" stroke="#DC2626" strokeWidth="4" />
                    <path d="M 178 185 L 165 212" stroke="#2563EB" strokeWidth="4" />
                    <path d="M 160 185 L 160 215" stroke="#EAA816" strokeWidth="4" />

                    <circle cx="152" cy="216" r="9" fill="url(#goldGrad)" stroke="#B37800" strokeWidth="1" />
                    <circle cx="168" cy="216" r="9" fill="url(#goldGrad)" stroke="#B37800" strokeWidth="1" />
                    <circle cx="160" cy="223" r="11" fill="url(#goldGrad)" stroke="#B37800" strokeWidth="1.5" />
                    <path d="M 157 220 L 160 226 L 163 220" fill="none" stroke="#582106" strokeWidth="1.5" />
                  </g>
                )}

                <ellipse cx="118" cy="245" rx="10" ry="8" fill="#582106" />
                <ellipse cx="202" cy="245" rx="10" ry="8" fill="#582106" />
              </svg>
            </motion.div>

            {animationPhase >= 2 && (
              <motion.div
                initial={{ scale: 0.2, y: 40, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="absolute z-20 bottom-2 w-64 sm:w-72 bg-gradient-to-b from-[#00F0FF]/30 via-[#2B96E3]/25 to-[#132247]/80 border border-[#00F0FF]/70 rounded-xl p-3.5 shadow-[0_0_35px_rgba(0,240,255,0.5)] backdrop-blur-md text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00F0FF]/40 to-transparent w-full h-1 animate-pulse top-2" />

                <div className="flex items-center justify-center space-x-2">
                  <Sparkles className="h-5 w-5 text-[#00F0FF] animate-spin" />
                  <span className="text-2xl sm:text-3xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#00F0FF] to-[#EAA816] drop-shadow-[0_2px_10px_rgba(0,240,255,0.8)] font-mono">
                    RSC-TAE
                  </span>
                  <Award className="h-5 w-5 text-[#EAA816] animate-bounce" />
                </div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#00F0FF] mt-1 drop-shadow-xs">
                  Reconhecimento de Saberes e Competências
                </div>
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Calculadora <span className="text-[#EAA816]">RSC-TAE</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Prepare e comprove seu processo SEI do RSC com inteligência artificial e pontuação em tempo real.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={onComplete}
                className="px-6 py-3 bg-gradient-to-r from-[#EAA816] to-[#C28600] hover:from-[#FFBF2E] hover:to-[#EAA816] text-[#132247] font-black text-xs sm:text-sm rounded-xl border border-amber-200 shadow-[0_0_20px_rgba(234,168,22,0.4)] transition hover:scale-105 cursor-pointer inline-flex items-center gap-2"
              >
                <span>Avançar para o Tutorial</span>
                <ChevronRight className="h-4 w-4 text-[#132247] stroke-[3]" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
