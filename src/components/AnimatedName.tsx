"use client";

import { motion, useReducedMotion } from "framer-motion";

interface AnimatedNameProps {
  text: string;
  className?: string;
}

/** H1 whose characters rise into place with a drafting-table stagger. */
export function AnimatedName({ text, className }: AnimatedNameProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <h1 className={className}>{text}</h1>;
  }

  const words = text.split(" ");
  let charIndex = 0;

  return (
    <h1 className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={`${word}-${wi}`} className="inline-block whitespace-nowrap">
          {word.split("").map((ch, ci) => {
            const delay = 0.15 + charIndex * 0.035;
            charIndex += 1;
            return (
              <motion.span
                key={ci}
                className="inline-block will-change-transform"
                initial={{ opacity: 0, y: "0.55em", rotate: 3 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{
                  duration: 0.55,
                  delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {ch}
              </motion.span>
            );
          })}
          {wi < words.length - 1 ? <span>&nbsp;</span> : null}
        </span>
      ))}
    </h1>
  );
}
