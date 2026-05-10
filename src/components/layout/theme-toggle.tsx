"use client";

import { useTheme } from "@/components/layout/theme-provider";
import { cn } from "@/lib/utils";
import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export interface ThemeToggleProps {
  className?: string;
}

/** Estrelas decorativas dentro da pílula (dark mode) */
const STARS = [
  { cx: 38, cy: 10, r: 1.2 },
  { cx: 46, cy: 18, r: 0.9 },
  { cx: 42, cy: 24, r: 1.4 },
  { cx: 50, cy: 10, r: 0.8 },
  { cx: 54, cy: 22, r: 1.1 },
];

const TRACK_W = 60; // px
const TRACK_H = 32; // px
const THUMB_D = 24; // diâmetro do thumb
const PAD = 4;      // padding interno

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Posição X do thumb com física spring — arrasto satisfatório
  const targetX = isDark ? TRACK_W - THUMB_D - PAD : PAD;
  const springX = useSpring(targetX, { stiffness: 380, damping: 28, mass: 0.8 });

  useEffect(() => {
    springX.set(targetX);
  }, [isDark, targetX, springX]);

  // Opacidade das estrelas e do brilho de dia
  const starsOpacity = useTransform(springX, [PAD, TRACK_W - THUMB_D - PAD], [0, 1]);
  const sunOpacity   = useTransform(springX, [PAD, TRACK_W - THUMB_D - PAD], [1, 0]);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      onClick={toggleTheme}
      className={cn(
        "group relative shrink-0 cursor-pointer select-none rounded-full",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      style={{ width: TRACK_W, height: TRACK_H }}
    >
      {/* Track SVG — fundo com cena de dia/noite */}
      <svg
        width={TRACK_W}
        height={TRACK_H}
        viewBox={`0 0 ${TRACK_W} ${TRACK_H}`}
        aria-hidden
        className="absolute inset-0 overflow-visible"
      >
        <defs>
          {/* Gradiente do track em modo claro: céu ao amanhecer */}
          <linearGradient id="track-light" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"  stopColor="#fde68a" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>

          {/* Gradiente do track em modo escuro: céu noturno */}
          <linearGradient id="track-dark" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"  stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#0f0c29" />
          </linearGradient>

          <clipPath id="pill-clip">
            <rect x="0" y="0" width={TRACK_W} height={TRACK_H} rx={TRACK_H / 2} />
          </clipPath>
        </defs>

        <g clipPath="url(#pill-clip)">
          {/* Fundo: noite */}
          <rect x="0" y="0" width={TRACK_W} height={TRACK_H} fill="url(#track-dark)" />

          {/* Fundo: dia — aparece com a opacidade da posição do thumb */}
          <motion.rect
            x="0" y="0" width={TRACK_W} height={TRACK_H}
            fill="url(#track-light)"
            style={{ opacity: sunOpacity }}
          />

          {/* Brilho solar: halo laranja no lado esquerdo */}
          <motion.circle
            cx={14} cy={TRACK_H / 2} r={18}
            fill="rgba(251,191,36,0.35)"
            style={{ opacity: sunOpacity }}
          />

          {/* Estrelas: só aparecem em dark */}
          {STARS.map((s, i) => (
            <motion.circle
              key={i}
              cx={s.cx} cy={s.cy} r={s.r}
              fill="rgba(255,255,255,0.9)"
              style={{ opacity: starsOpacity }}
            />
          ))}

          {/* Horizonte degradê suave em modo claro */}
          <motion.rect
            x="0" y={TRACK_H * 0.6} width={TRACK_W} height={TRACK_H * 0.4}
            fill="rgba(251,191,36,0.18)"
            style={{ opacity: sunOpacity }}
          />
        </g>

        {/* Borda da pílula */}
        <rect
          x="0.5" y="0.5"
          width={TRACK_W - 1} height={TRACK_H - 1}
          rx={(TRACK_H - 1) / 2}
          fill="none"
          stroke={isDark ? "rgba(255,255,255,0.12)" : "rgba(245,158,11,0.4)"}
          strokeWidth="1"
        />
      </svg>

      {/* Thumb deslizante com física spring */}
      <motion.div
        aria-hidden
        style={{ x: springX, width: THUMB_D, height: THUMB_D }}
        className={cn(
          "absolute top-[4px] flex items-center justify-center rounded-full shadow-md",
          "transition-colors duration-500",
          isDark
            ? "bg-slate-200 shadow-black/40"
            : "bg-white shadow-amber-300/60 shadow-lg",
        )}
      >
        {/* Ícone dentro do thumb — lua ou sol */}
        <svg
          width="14" height="14"
          viewBox="0 0 14 14"
          aria-hidden
          className="shrink-0"
        >
          {/* Sol: círculo + raios */}
          <motion.g style={{ opacity: sunOpacity }}>
            <circle cx="7" cy="7" r="3" fill="#f59e0b" />
            {[0,45,90,135,180,225,270,315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x1 = 7 + Math.cos(rad) * 4.2;
              const y1 = 7 + Math.sin(rad) * 4.2;
              const x2 = 7 + Math.cos(rad) * 5.8;
              const y2 = 7 + Math.sin(rad) * 5.8;
              return (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="#f59e0b" strokeWidth="1.4" strokeLinecap="round" />
              );
            })}
          </motion.g>

          {/* Lua crescente */}
          <motion.g style={{ opacity: starsOpacity }}>
            <path
              d="M8.5 3.5a4 4 0 1 1-5 5 3 3 0 0 0 5-5z"
              fill="#94a3b8"
            />
          </motion.g>
        </svg>
      </motion.div>
    </button>
  );
}
