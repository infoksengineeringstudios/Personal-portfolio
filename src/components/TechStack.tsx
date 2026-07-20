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
            className="rounded-full border border-[var(--border)] bg-white/70 px-3.5 py-1.5 text-sm text-muted"
          >
            {tech}
          </li>
        ))}
      </ul>
    </section>
  );
}
