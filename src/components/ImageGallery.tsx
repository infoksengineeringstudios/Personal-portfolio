"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { MediaFile } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: MediaFile[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const reduceMotion = useReducedMotion();
  const labelId = useId();

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(false);
      if (event.key === "ArrowRight") {
        setActive((value) => (value + 1) % images.length);
      }
      if (event.key === "ArrowLeft") {
        setActive((value) => (value - 1 + images.length) % images.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, images.length]);

  if (!images.length) return null;

  const current = images[active] ?? images[0];

  return (
    <section aria-labelledby={labelId} className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <h2 id={labelId} className="text-xl font-semibold tracking-[-0.03em]">
          Gallery
        </h2>
        <p className="font-mono text-sm text-subtle">
          {String(active + 1).padStart(2, "0")} /{" "}
          {String(images.length).padStart(2, "0")}
        </p>
      </div>

      <button
        type="button"
        className="corner-marks relative block w-full overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-white text-left"
        onClick={() => setLightbox(true)}
        aria-label={`Open larger view of ${current.name}`}
      >
        <div className="relative aspect-[16/10]">
          <AnimatePresence mode="wait">
            <motion.img
              key={current.url}
              src={current.url}
              alt={`${title} — ${current.name}`}
              className="absolute inset-0 h-full w-full object-contain"
              initial={reduceMotion ? false : { opacity: 0.35 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.35 }}
            />
          </AnimatePresence>
        </div>
      </button>

      <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
        {images.map((image, index) => (
          <li key={`${image.url}-${index}`}>
            <button
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show ${image.name}`}
              aria-current={index === active ? "true" : undefined}
              className={cn(
                "relative aspect-[4/3] w-full overflow-hidden rounded-[4px] border transition",
                index === active
                  ? "border-accent ring-2 ring-[var(--accent-soft)]"
                  : "border-[var(--border)] opacity-80 hover:opacity-100",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.url}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {lightbox ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(11,18,32,0.78)] p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.url}
              alt={`${title} — ${current.name}`}
              className="max-h-[88vh] max-w-[min(1100px,94vw)] rounded-2xl object-contain"
              onClick={(event) => event.stopPropagation()}
            />
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-medium text-foreground"
              onClick={() => setLightbox(false)}
            >
              Close
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
