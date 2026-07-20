"use client";

import { motion, useReducedMotion } from "framer-motion";

interface BlueprintDrawingProps {
  className?: string;
}

/**
 * Self-drawing Warren truss bridge elevation, annotated like a real
 * engineering drawing. Strokes animate in with pathLength.
 */
export function BlueprintDrawing({ className }: BlueprintDrawingProps) {
  const reduceMotion = useReducedMotion();

  const draw = (delay: number, duration = 1.4) =>
    reduceMotion
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { duration, delay, ease: "easeInOut" as const },
        };

  const fade = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.6, delay },
        };

  return (
    <svg
      viewBox="0 0 640 250"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Ground line (dashed) */}
      <motion.path
        d="M20 225 H620"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="8 6"
        opacity="0.5"
        {...draw(0.1, 1.2)}
      />

      {/* Deck */}
      <motion.path
        d="M28 150 H612"
        stroke="currentColor"
        strokeWidth="2.5"
        {...draw(0.3)}
      />

      {/* Warren truss web */}
      <motion.path
        d="M40 150 L75 95 L110 150 L145 95 L180 150 L215 95 L250 150 L285 95 L320 150 L355 95 L390 150 L425 95 L460 150 L495 95 L530 150 L565 95 L600 150"
        stroke="currentColor"
        strokeWidth="1.5"
        {...draw(0.7, 2)}
      />

      {/* Top chord */}
      <motion.path
        d="M75 95 H565"
        stroke="currentColor"
        strokeWidth="2"
        {...draw(1.1, 1.4)}
      />

      {/* Piers with footings */}
      <motion.path
        d="M102 152 V212 M118 152 V212 M90 212 H130"
        stroke="currentColor"
        strokeWidth="1.5"
        {...draw(1.6, 0.8)}
      />
      <motion.path
        d="M522 152 V212 M538 152 V212 M510 212 H550"
        stroke="currentColor"
        strokeWidth="1.5"
        {...draw(1.7, 0.8)}
      />

      {/* Dimension line with end caps */}
      <motion.path
        d="M40 55 H250 M390 55 H600 M40 47 V63 M600 47 V63"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.7"
        {...draw(2.1, 1)}
      />
      <motion.text
        x="320"
        y="59"
        textAnchor="middle"
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="11"
        letterSpacing="0.12em"
        fill="currentColor"
        {...fade(2.6)}
      >
        8 × 70 m — WARREN TRUSS
      </motion.text>

      {/* Reduced level marker */}
      <motion.path
        d="M52 132 l6 10 h-12 z"
        stroke="currentColor"
        strokeWidth="1"
        {...draw(2.4, 0.5)}
      />
      <motion.text
        x="66"
        y="140"
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="10"
        letterSpacing="0.08em"
        fill="currentColor"
        opacity="0.8"
        {...fade(2.7)}
      >
        RL 150.00
      </motion.text>

      {/* Sheet caption */}
      <motion.text
        x="20"
        y="246"
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="10"
        letterSpacing="0.14em"
        fill="currentColor"
        opacity="0.7"
        {...fade(2.9)}
      >
        ELEVATION — SCALE 1:200
      </motion.text>
    </svg>
  );
}
