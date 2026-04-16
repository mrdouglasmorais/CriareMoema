"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { brandImages } from "@/lib/brand-assets";
import { cn } from "@/lib/utils";
import {
  motion,
  useSpring,
  useTransform,
  type MotionValue,
  type TargetAndTransition,
  type Transition,
} from "framer-motion";

/** Fundos do hero: alternância com crossfade (imagens da marca em `public/brand/`). */
const HERO_BG_SLIDES = [
  brandImages.hero,
  brandImages.ambientes,
  brandImages.showcase1,
] as const;

const SLIDE_INTERVAL_MS = 9000;
const CROSSFADE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SPRING = { stiffness: 28, damping: 24, mass: 0.85 };

type HeroAmbientLayersProps = {
  reduce: boolean;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
};

function DriftOrb({
  className,
  animate,
  transition,
  reduce,
}: {
  className?: string;
  animate: TargetAndTransition;
  transition: Transition;
  reduce: boolean;
}) {
  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute rounded-full will-change-transform",
        className,
      )}
      animate={reduce ? undefined : animate}
      transition={reduce ? undefined : transition}
    />
  );
}

export function HeroAmbientLayers({ reduce, mouseX, mouseY }: HeroAmbientLayersProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setActiveSlide((i) => (i + 1) % HERO_BG_SLIDES.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  const parallaxX = useSpring(
    useTransform(mouseX, [0, 1], reduce ? [0, 0] : [-26, 26]),
    SPRING,
  );
  const parallaxY = useSpring(
    useTransform(mouseY, [0, 1], reduce ? [0, 0] : [-20, 20]),
    SPRING,
  );

  const driftEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 isolate overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0">
        {HERO_BG_SLIDES.map((img, i) => {
          const isActive = reduce ? i === 0 : i === activeSlide;
          return (
            <motion.div
              key={img.src}
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 1.06,
              }}
              transition={{
                opacity: { duration: 1.45, ease: CROSSFADE_EASE },
                scale: { duration: 1.45, ease: CROSSFADE_EASE },
              }}
            >
              <Image
                src={img.src}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className={cn(
                  "object-cover",
                  isActive && !reduce && "animate-hero-ken-burns",
                )}
              />
            </motion.div>
          );
        })}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/82 to-background/18" />

      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ x: parallaxX, y: parallaxY }}
      >
        <DriftOrb
          reduce={reduce}
          className="-left-[18%] top-[8%] h-[min(78vw,720px)] w-[min(78vw,720px)] max-w-none bg-[radial-gradient(circle_at_30%_30%,rgba(251,191,36,0.22),rgba(245,158,11,0.08)_45%,transparent_70%)] blur-[90px]"
          animate={{
            scale: [1, 1.12, 1.04, 1.1, 1],
            x: ["0%", "3%", "-2%", "1%", "0%"],
            y: ["0%", "-4%", "2%", "-1%", "0%"],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: driftEase,
          }}
        />
        <DriftOrb
          reduce={reduce}
          className="-right-[12%] bottom-[5%] h-[min(92vw,820px)] w-[min(92vw,820px)] bg-[radial-gradient(circle_at_60%_50%,rgba(120,53,15,0.35),rgba(41,37,36,0.2)_50%,transparent_68%)] blur-[100px]"
          animate={{
            scale: [1.06, 1, 1.1, 1.03, 1.06],
            x: ["0%", "-4%", "2%", "-1%", "0%"],
            y: ["0%", "3%", "-3%", "1%", "0%"],
          }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: driftEase,
          }}
        />
        <DriftOrb
          reduce={reduce}
          className="left-[35%] top-[42%] h-[min(55vw,480px)] w-[min(55vw,480px)] bg-[radial-gradient(circle,rgba(255,251,235,0.06),transparent_65%)] blur-[80px]"
          animate={{
            scale: [1, 1.15, 1.02, 1.12, 1],
            x: ["0%", "5%", "-3%", "2%", "0%"],
            y: ["0%", "4%", "-2%", "-3%", "0%"],
          }}
          transition={{
            duration: 21,
            repeat: Infinity,
            ease: driftEase,
          }}
        />
        <DriftOrb
          reduce={reduce}
          className="right-[8%] top-[18%] h-[min(40vw,360px)] w-[min(40vw,360px)] bg-[radial-gradient(circle,rgba(245,158,11,0.18),transparent_62%)] blur-[70px]"
          animate={{
            opacity: [0.45, 0.85, 0.55, 0.75, 0.45],
            rotate: [0, 8, -4, 4, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: driftEase,
          }}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_115%,rgba(245,158,11,0.2),transparent_58%)]"
        animate={reduce ? {} : { opacity: [0.38, 0.72, 0.45, 0.65, 0.38] }}
        transition={
          reduce
            ? {}
            : { duration: 11, repeat: Infinity, ease: "easeInOut" }
        }
      />

      <motion.div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_38%,rgba(255,255,255,0.04)_50%,transparent_62%)] mix-blend-overlay"
        animate={
          reduce
            ? {}
            : {
                opacity: [0.12, 0.38, 0.18, 0.32, 0.12],
              }
        }
        transition={
          reduce
            ? {}
            : { duration: 12, repeat: Infinity, ease: driftEase }
        }
      />

      <div
        className={cn(
          "hero-film-grain pointer-events-none absolute inset-0 mix-blend-overlay",
          reduce && "!animate-none opacity-[0.028]",
        )}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(12,10,9,0.45)_75%,rgba(12,10,9,0.92)_100%)]" />
    </div>
  );
}
