interface KeyLearningsProps {
  learnings: string[];
}

export function KeyLearnings({ learnings }: KeyLearningsProps) {
  if (!learnings.length) return null;

  return (
    <section aria-labelledby="learnings-heading">
      <h2
        id="learnings-heading"
        className="text-xl font-semibold tracking-[-0.03em] text-foreground"
      >
        Key learnings
      </h2>
      <ol className="mt-5 space-y-4">
        {learnings.map((learning, index) => (
          <li key={learning} className="flex gap-4">
            <span
              className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-xs font-semibold text-accent"
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <p className="text-base leading-relaxed text-muted">{learning}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
