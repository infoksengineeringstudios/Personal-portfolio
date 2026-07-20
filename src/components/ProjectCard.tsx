import Link from "next/link";
import type { ContentItem } from "@/lib/types";
import { getExperiencePeriod } from "@/lib/utils";
import { FadeIn } from "./FadeIn";

interface ProjectCardProps {
  project: ContentItem;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <FadeIn delay={Math.min(index * 0.06, 0.24)}>
      <Link
        href={`/projects/${project.slug}`}
        className="group block focus-visible:rounded-[var(--radius)]"
      >
        <article className="sheet overflow-hidden transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow)]">
          <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--border)] bg-[#e9eae8]">
            {/* Drafting-print greyscale — snaps to full colour on hover */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.cover}
              alt=""
              className="h-full w-full object-cover grayscale-[0.85] transition-[transform,filter] duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
              loading="lazy"
            />
            <span className="label-mono absolute left-3 top-3 rounded-[4px] bg-white/90 px-2 py-1 backdrop-blur-sm">
              Fig. {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="p-5 sm:p-6">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground group-hover:text-accent">
                {project.title}
              </h3>
              {getExperiencePeriod(project) ? (
                <span className="shrink-0 font-mono text-xs text-subtle">
                  {getExperiencePeriod(project)}
                </span>
              ) : null}
            </div>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
              {project.summary}
            </p>
            {project.technologies.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
                {project.technologies.slice(0, 4).map((tech) => (
                  <li
                    key={tech}
                    className="rounded-[4px] border border-[var(--border)] bg-[var(--accent-soft)] px-2 py-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-accent"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </article>
      </Link>
    </FadeIn>
  );
}
