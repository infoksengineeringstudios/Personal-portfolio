import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  /** Drawing-style index, e.g. "02" — rendered before the eyebrow. */
  index?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  index,
}: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="label-mono flex items-center gap-3">
            {index ? (
              <span className="border border-[var(--border-strong)] px-1.5 py-0.5">
                {index}
              </span>
            ) : null}
            {eyebrow}
            <span
              aria-hidden="true"
              className="h-px w-10 bg-[var(--border-strong)]"
            />
          </p>
        ) : null}
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
