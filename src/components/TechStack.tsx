interface TechStackProps {
  technologies: string[];
  title?: string;
}

export function TechStack({
  technologies,
  title = "Technologies",
}: TechStackProps) {
  if (!technologies.length) return null;

  return (
    <section aria-labelledby="tech-heading">
      <h2
        id="tech-heading"
        className="text-xl font-semibold tracking-[-0.03em] text-foreground"
      >
        {title}
      </h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <li
            key={tech}
            className="rounded-[4px] border border-[var(--border)] bg-[var(--accent-soft)] px-2.5 py-1 font-mono text-xs uppercase tracking-[0.04em] text-accent"
          >
            {tech}
          </li>
        ))}
      </ul>
    </section>
  );
}
