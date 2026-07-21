"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AvatarImageProps {
  src: string;
  hoverSrc?: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
}

export function AvatarImage({
  src,
  hoverSrc,
  alt,
  className,
  imageClassName,
  priority = false,
  sizes = "(max-width: 1024px) 90vw, 480px",
}: AvatarImageProps) {
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const activeSrc = hovered && hoverSrc ? hoverSrc : src;

  return (
    <div
      className={cn("relative h-full w-full", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeSrc}
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.01 }}
          transition={{
            duration: reduceMotion ? 0 : 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0"
        >
          <Image
            src={activeSrc}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className={cn("object-contain object-bottom", imageClassName)}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
