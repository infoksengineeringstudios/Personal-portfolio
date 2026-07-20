"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Shared draw-on-scroll stroke animation. */
function useDraw() {
  const reduceMotion = useReducedMotion();
  return (delay: number, duration = 1.4) =>
    reduceMotion
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true, margin: "-15% 0px" },
          transition: { duration, delay, ease: "easeInOut" as const },
        };
}

function useFade() {
  const reduceMotion = useReducedMotion();
  return (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true, margin: "-15% 0px" },
          transition: { duration: 0.6, delay },
        };
}

/** Tower crane elevation — tall and narrow, made for side margins. */
export function CraneDrawing({ className }: { className?: string }) {
  const draw = useDraw();
  const fade = useFade();

  return (
    <svg
      viewBox="0 0 220 540"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Mast with cross bracing */}
      <motion.path
        d="M95 520 V130 M125 520 V130"
        stroke="currentColor"
        strokeWidth="2"
        {...draw(0, 1.6)}
      />
      <motion.path
        d="M95 500 L125 470 L95 440 L125 410 L95 380 L125 350 L95 320 L125 290 L95 260 L125 230 L95 200 L125 170 L95 140"
        stroke="currentColor"
        strokeWidth="1"
        {...draw(0.4, 2)}
      />
      {/* Apex */}
      <motion.path
        d="M95 130 L110 80 L125 130"
        stroke="currentColor"
        strokeWidth="1.5"
        {...draw(1.2, 0.5)}
      />
      {/* Jib + counter-jib */}
      <motion.path
        d="M125 130 H210 M95 130 H20"
        stroke="currentColor"
        strokeWidth="2"
        {...draw(1.4, 0.9)}
      />
      {/* Ties */}
      <motion.path
        d="M110 80 L205 126 M110 80 L25 126"
        stroke="currentColor"
        strokeWidth="1"
        {...draw(1.7, 0.8)}
      />
      {/* Counterweight */}
      <motion.path
        d="M22 132 H52 V152 H22 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        {...draw(2, 0.5)}
      />
      {/* Hoist line + hook */}
      <motion.path
        d="M185 132 V300 M185 300 c0 8 -12 8 -12 0"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="5 4"
        {...draw(2.2, 0.9)}
      />
      {/* Base */}
      <motion.path
        d="M70 520 H150 M80 520 L95 505 M140 520 L125 505"
        stroke="currentColor"
        strokeWidth="1.5"
        {...draw(2.5, 0.5)}
      />
      <motion.text
        x="110"
        y="538"
        textAnchor="middle"
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="11"
        letterSpacing="0.14em"
        fill="currentColor"
        opacity="0.8"
        {...fade(2.8)}
      >
        TC-01
      </motion.text>
    </svg>
  );
}

/** Topographic contour lines with spot levels — background texture. */
export function ContourDrawing({ className }: { className?: string }) {
  const draw = useDraw();
  const fade = useFade();

  return (
    <svg
      viewBox="0 0 800 320"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <motion.path
        d="M-20 260 C120 200 220 290 360 240 S620 160 820 220"
        stroke="currentColor"
        strokeWidth="1"
        {...draw(0, 1.8)}
      />
      <motion.path
        d="M-20 200 C140 140 260 230 400 180 S640 100 820 150"
        stroke="currentColor"
        strokeWidth="1"
        {...draw(0.3, 1.8)}
      />
      <motion.path
        d="M-20 140 C160 90 300 170 440 120 S660 50 820 90"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="10 7"
        {...draw(0.6, 1.8)}
      />
      <motion.path
        d="M-20 80 C180 40 340 110 480 60 S680 0 820 30"
        stroke="currentColor"
        strokeWidth="1"
        {...draw(0.9, 1.8)}
      />
      {/* Benchmarks */}
      <motion.path
        d="M180 176 l7 12 h-14 z M560 116 l7 12 h-14 z"
        stroke="currentColor"
        strokeWidth="1"
        {...draw(1.6, 0.6)}
      />
      <motion.text
        x="196"
        y="187"
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="11"
        letterSpacing="0.08em"
        fill="currentColor"
        opacity="0.8"
        {...fade(2)}
      >
        BM-1 RL 52.30
      </motion.text>
      <motion.text
        x="576"
        y="127"
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="11"
        letterSpacing="0.08em"
        fill="currentColor"
        opacity="0.8"
        {...fade(2.2)}
      >
        BM-2 RL 48.75
      </motion.text>
    </svg>
  );
}

/** Road pavement cross-section with camber and layer callouts. */
export function RoadSectionDrawing({ className }: { className?: string }) {
  const draw = useDraw();
  const fade = useFade();

  return (
    <svg
      viewBox="0 0 640 200"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Natural surface */}
      <motion.path
        d="M10 60 C80 50 120 70 180 66 M460 66 C520 70 560 50 630 60"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="6 5"
        opacity="0.6"
        {...draw(0, 1)}
      />
      {/* Batter slopes */}
      <motion.path
        d="M180 66 L230 96 M460 66 L410 96"
        stroke="currentColor"
        strokeWidth="1.5"
        {...draw(0.4, 0.6)}
      />
      {/* Carriageway with camber */}
      <motion.path
        d="M230 96 Q320 86 410 96"
        stroke="currentColor"
        strokeWidth="2.5"
        {...draw(0.8, 0.9)}
      />
      {/* Pavement layers */}
      <motion.path
        d="M230 106 Q320 96 410 106 M230 120 Q320 110 410 120 M230 136 Q320 126 410 136"
        stroke="currentColor"
        strokeWidth="1"
        {...draw(1.2, 1.2)}
      />
      {/* Centreline */}
      <motion.path
        d="M320 60 V150"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="10 6 2 6"
        opacity="0.7"
        {...draw(1.8, 0.7)}
      />
      {/* Layer callouts */}
      <motion.path
        d="M410 101 H470 M410 128 H470"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.7"
        {...draw(2.1, 0.5)}
      />
      <motion.text
        x="476"
        y="104"
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="10"
        letterSpacing="0.06em"
        fill="currentColor"
        {...fade(2.4)}
      >
        AC14 WEARING
      </motion.text>
      <motion.text
        x="476"
        y="131"
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="10"
        letterSpacing="0.06em"
        fill="currentColor"
        {...fade(2.6)}
      >
        150 CL3 FCR
      </motion.text>
      <motion.text
        x="320"
        y="52"
        textAnchor="middle"
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="10"
        letterSpacing="0.1em"
        fill="currentColor"
        opacity="0.8"
        {...fade(2.2)}
      >
        CL — 3% CROSSFALL
      </motion.text>
      <motion.text
        x="20"
        y="185"
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="10"
        letterSpacing="0.14em"
        fill="currentColor"
        opacity="0.7"
        {...fade(2.8)}
      >
        TYPICAL CROSS SECTION — RURAL ARTERIAL
      </motion.text>
    </svg>
  );
}

/** Simply supported beam with UDL + bending moment diagram. */
export function BeamDiagramDrawing({ className }: { className?: string }) {
  const draw = useDraw();
  const fade = useFade();

  return (
    <svg
      viewBox="0 0 400 260"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* UDL arrows */}
      <motion.path
        d="M60 30 H340 M70 30 V58 M105 30 V58 M140 30 V58 M175 30 V58 M210 30 V58 M245 30 V58 M280 30 V58 M315 30 V58 M330 30 V58 M66 52 l4 8 4 -8 M101 52 l4 8 4 -8 M136 52 l4 8 4 -8 M171 52 l4 8 4 -8 M206 52 l4 8 4 -8 M241 52 l4 8 4 -8 M276 52 l4 8 4 -8 M311 52 l4 8 4 -8 M326 52 l4 8 4 -8"
        stroke="currentColor"
        strokeWidth="1"
        {...draw(0, 1.6)}
      />
      {/* Beam */}
      <motion.path
        d="M55 65 H345"
        stroke="currentColor"
        strokeWidth="3"
        {...draw(0.6, 0.9)}
      />
      {/* Pin support */}
      <motion.path
        d="M70 68 l-12 20 h24 z M50 88 H90"
        stroke="currentColor"
        strokeWidth="1.5"
        {...draw(1.2, 0.5)}
      />
      {/* Roller support */}
      <motion.path
        d="M330 68 l-12 20 h24 z M322 92 a4 4 0 1 0 0.01 0 M334 92 a4 4 0 1 0 0.01 0 M310 100 H350"
        stroke="currentColor"
        strokeWidth="1.5"
        {...draw(1.4, 0.6)}
      />
      {/* BMD parabola */}
      <motion.path
        d="M70 140 Q200 250 330 140"
        stroke="currentColor"
        strokeWidth="1.5"
        {...draw(1.9, 1.2)}
      />
      <motion.path
        d="M70 140 H330"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.6"
        {...draw(1.8, 0.8)}
      />
      {/* Max moment marker */}
      <motion.path
        d="M200 195 V212"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="4 3"
        opacity="0.8"
        {...draw(3, 0.4)}
      />
      <motion.text
        x="200"
        y="228"
        textAnchor="middle"
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="11"
        letterSpacing="0.08em"
        fill="currentColor"
        {...fade(3.2)}
      >
        M* = wL²/8
      </motion.text>
      <motion.text
        x="352"
        y="34"
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="10"
        fill="currentColor"
        opacity="0.8"
        {...fade(1)}
      >
        w kN/m
      </motion.text>
      <motion.text
        x="60"
        y="252"
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="10"
        letterSpacing="0.12em"
        fill="currentColor"
        opacity="0.7"
        {...fade(3.4)}
      >
        BENDING MOMENT DIAGRAM
      </motion.text>
    </svg>
  );
}

/** Theodolite on tripod sighting a levelling staff. */
export function TheodoliteDrawing({ className }: { className?: string }) {
  const draw = useDraw();
  const fade = useFade();

  return (
    <svg
      viewBox="0 0 360 240"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Tripod */}
      <motion.path
        d="M80 90 L60 200 M80 90 L100 200 M80 90 L80 150 L86 200"
        stroke="currentColor"
        strokeWidth="1.5"
        {...draw(0, 1)}
      />
      {/* Instrument */}
      <motion.path
        d="M68 78 H92 M72 78 V66 H88 V78 M64 66 H96 M74 60 H86 V66"
        stroke="currentColor"
        strokeWidth="1.5"
        {...draw(0.8, 0.8)}
      />
      {/* Sight line */}
      <motion.path
        d="M96 63 L300 63"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="8 6"
        opacity="0.8"
        {...draw(1.6, 1)}
      />
      {/* Levelling staff */}
      <motion.path
        d="M300 40 V200 M296 40 H304 M296 60 H304 M296 80 H304 M296 100 H304 M296 120 H304 M296 140 H304 M296 160 H304 M296 180 H304"
        stroke="currentColor"
        strokeWidth="1.5"
        {...draw(2.2, 1)}
      />
      {/* Ground */}
      <motion.path
        d="M30 200 H330"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="8 6"
        opacity="0.6"
        {...draw(2.8, 0.6)}
      />
      <motion.text
        x="180"
        y="54"
        textAnchor="middle"
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="10"
        letterSpacing="0.1em"
        fill="currentColor"
        opacity="0.8"
        {...fade(3)}
      >
        HT COLLIMATION
      </motion.text>
      <motion.text
        x="30"
        y="226"
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="10"
        letterSpacing="0.14em"
        fill="currentColor"
        opacity="0.7"
        {...fade(3.2)}
      >
        LEVEL TRAVERSE — STN A
      </motion.text>
    </svg>
  );
}

/** Tracked excavator, side elevation — earthworks. */
export function ExcavatorDrawing({ className }: { className?: string }) {
  const draw = useDraw();
  const fade = useFade();

  return (
    <svg
      viewBox="0 0 270 200"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Tracks */}
      <motion.path
        d="M53 140 H127 a18 18 0 0 1 0 36 H53 a18 18 0 0 1 0 -36 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        {...draw(0, 1)}
      />
      <motion.path
        d="M62 150 a8 8 0 1 0 0.01 0 M110 150 a8 8 0 1 0 0.01 0"
        stroke="currentColor"
        strokeWidth="1"
        {...draw(0.5, 0.6)}
      />
      {/* House + cab */}
      <motion.path
        d="M48 138 V112 H124 V138 M58 112 V90 H94 V112 M62 96 H90"
        stroke="currentColor"
        strokeWidth="1.5"
        {...draw(0.9, 0.9)}
      />
      {/* Boom, arm, bucket */}
      <motion.path
        d="M118 114 L172 68 M172 68 L212 116"
        stroke="currentColor"
        strokeWidth="2.5"
        {...draw(1.5, 1)}
      />
      <motion.path
        d="M212 116 L236 126 L214 138 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        {...draw(2.2, 0.5)}
      />
      {/* Hydraulic ram */}
      <motion.path
        d="M126 102 L164 82"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.8"
        {...draw(1.9, 0.5)}
      />
      {/* Ground + spoil heap */}
      <motion.path
        d="M14 178 H256 M228 178 C236 168 248 170 254 178"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="8 6"
        opacity="0.6"
        {...draw(2.5, 0.7)}
      />
      <motion.text
        x="16"
        y="196"
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="10"
        letterSpacing="0.14em"
        fill="currentColor"
        opacity="0.8"
        {...fade(2.9)}
      >
        EX-02 — BULK EARTHWORKS
      </motion.text>
    </svg>
  );
}

/** Articulated dump truck, side elevation — haulage. */
export function DumpTruckDrawing({ className }: { className?: string }) {
  const draw = useDraw();
  const fade = useFade();

  return (
    <svg
      viewBox="0 0 280 180"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Chassis */}
      <motion.path
        d="M30 128 H250"
        stroke="currentColor"
        strokeWidth="2"
        {...draw(0, 0.8)}
      />
      {/* Wheels */}
      <motion.path
        d="M60 132 a16 16 0 1 0 0.01 0 M150 132 a16 16 0 1 0 0.01 0 M190 132 a16 16 0 1 0 0.01 0"
        stroke="currentColor"
        strokeWidth="1.5"
        {...draw(0.5, 1)}
      />
      {/* Cab */}
      <motion.path
        d="M30 128 V92 H62 L74 106 V128 M38 92 V78 H58 V92 M40 84 H54"
        stroke="currentColor"
        strokeWidth="1.5"
        {...draw(1.1, 0.9)}
      />
      {/* Tipping tray */}
      <motion.path
        d="M84 124 L96 74 L240 62 L250 124 Z M96 74 L84 60 L92 58 L102 72"
        stroke="currentColor"
        strokeWidth="1.5"
        {...draw(1.7, 1.1)}
      />
      {/* Load */}
      <motion.path
        d="M104 72 C130 58 160 70 186 60 C206 54 224 62 236 64"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="4 3"
        opacity="0.7"
        {...draw(2.5, 0.7)}
      />
      {/* Ground */}
      <motion.path
        d="M14 158 H266"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="8 6"
        opacity="0.6"
        {...draw(2.8, 0.5)}
      />
      <motion.text
        x="16"
        y="176"
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="10"
        letterSpacing="0.14em"
        fill="currentColor"
        opacity="0.8"
        {...fade(3.1)}
      >
        ADT-01 — HAUL 22 t
      </motion.text>
    </svg>
  );
}

/** Scaffold bay elevation with platform and guardrail. */
export function ScaffoldingDrawing({ className }: { className?: string }) {
  const draw = useDraw();
  const fade = useFade();

  return (
    <svg
      viewBox="0 0 220 300"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Standards */}
      <motion.path
        d="M45 270 V40 M110 270 V40 M175 270 V40"
        stroke="currentColor"
        strokeWidth="1.5"
        {...draw(0, 1.2)}
      />
      {/* Ledgers */}
      <motion.path
        d="M45 250 H175 M45 190 H175 M45 130 H175 M45 70 H175"
        stroke="currentColor"
        strokeWidth="1"
        {...draw(0.7, 1.2)}
      />
      {/* Diagonal braces */}
      <motion.path
        d="M45 250 L110 190 M110 190 L175 130 M45 130 L110 70"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.8"
        {...draw(1.5, 1)}
      />
      {/* Platform planks + guardrail */}
      <motion.path
        d="M40 126 H180 M40 122 H180 M45 70 H175 M45 96 H175"
        stroke="currentColor"
        strokeWidth="1"
        {...draw(2.2, 0.8)}
      />
      {/* Base plates */}
      <motion.path
        d="M36 270 H54 M101 270 H119 M166 270 H184"
        stroke="currentColor"
        strokeWidth="2"
        {...draw(2.7, 0.4)}
      />
      {/* Ground */}
      <motion.path
        d="M20 276 H200"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="8 6"
        opacity="0.6"
        {...draw(2.9, 0.4)}
      />
      <motion.text
        x="110"
        y="296"
        textAnchor="middle"
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="10"
        letterSpacing="0.12em"
        fill="currentColor"
        opacity="0.8"
        {...fade(3.2)}
      >
        SCAFFOLD — DUTY CLASS 3
      </motion.text>
    </svg>
  );
}

/** Column formwork section with props and ties. */
export function FormworkDrawing({ className }: { className?: string }) {
  const draw = useDraw();
  const fade = useFade();

  return (
    <svg
      viewBox="0 0 300 230"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Form faces */}
      <motion.path
        d="M120 40 V190 M132 40 V190 M168 40 V190 M180 40 V190"
        stroke="currentColor"
        strokeWidth="1.5"
        {...draw(0, 1.1)}
      />
      {/* Concrete hatch between faces */}
      <motion.path
        d="M136 60 L164 46 M136 90 L164 76 M136 120 L164 106 M136 150 L164 136 M136 180 L164 166"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.6"
        {...draw(0.8, 1)}
      />
      {/* Walers + tie rods */}
      <motion.path
        d="M108 70 H192 M108 130 H192 M104 70 a4 4 0 1 0 0.01 0 M196 66 a4 4 0 1 0 0.01 0 M104 130 a4 4 0 1 0 0.01 0 M196 126 a4 4 0 1 0 0.01 0"
        stroke="currentColor"
        strokeWidth="1"
        {...draw(1.5, 0.9)}
      />
      {/* Props */}
      <motion.path
        d="M118 100 L48 190 M182 100 L252 190 M40 190 H70 M230 190 H262"
        stroke="currentColor"
        strokeWidth="1.5"
        {...draw(2.1, 0.9)}
      />
      {/* Kicker + ground */}
      <motion.path
        d="M110 190 H190 M20 196 H280"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="8 6"
        opacity="0.6"
        {...draw(2.7, 0.6)}
      />
      <motion.text
        x="150"
        y="222"
        textAnchor="middle"
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="10"
        letterSpacing="0.12em"
        fill="currentColor"
        opacity="0.8"
        {...fade(3)}
      >
        COLUMN FORMWORK — 450 SQ
      </motion.text>
    </svg>
  );
}

/** Steel I-section with hatching + dimensions — side ornament. */
export function BeamSectionDrawing({ className }: { className?: string }) {
  const draw = useDraw();
  const fade = useFade();

  return (
    <svg
      viewBox="0 0 200 260"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* I-section outline */}
      <motion.path
        d="M40 40 H160 V60 H112 V180 H160 V200 H40 V180 H88 V60 H40 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        {...draw(0, 1.6)}
      />
      {/* Hatch strokes */}
      <motion.path
        d="M48 58 L58 48 M70 58 L80 48 M92 58 L102 48 M114 58 L124 48 M136 58 L146 48 M90 90 L110 70 M90 120 L110 100 M90 150 L110 130 M90 178 L110 158 M48 198 L58 188 M70 198 L80 188 M92 198 L102 188 M114 198 L124 188 M136 198 L146 188"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.7"
        {...draw(1, 1.4)}
      />
      {/* Dimension */}
      <motion.path
        d="M30 40 H20 M30 200 H20 M25 40 V110 M25 130 V200"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.7"
        {...draw(2, 0.7)}
      />
      <motion.text
        x="25"
        y="123"
        textAnchor="middle"
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="10"
        fill="currentColor"
        {...fade(2.4)}
      >
        460
      </motion.text>
      <motion.text
        x="100"
        y="232"
        textAnchor="middle"
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="11"
        letterSpacing="0.12em"
        fill="currentColor"
        opacity="0.8"
        {...fade(2.6)}
      >
        460 UB 67
      </motion.text>
    </svg>
  );
}
