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
        className="group block focus-visible:rounded-[22px]"
      >
        <article className="overflow-hidden rounded-[22px] border border-[var(--border)] bg-white/55 transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow)]">
          <div className="relative aspect-[16/10] overflow-hidden bg-[#d8e2ec]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.cover}
              alt=""
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              loading="lazy"
            />
          </div>
          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold tracking-[-0.03em] text-foreground">
                {project.title}
              </h3>
              {getExperiencePeriod(project) ? (
                <span className="shrink-0 text-sm text-subtle">
                  {getExperiencePeriod(project)}
                </span>
              ) : null}
            </div>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
              {project.summary}
            </p>
            {project.technologies.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
                {project.technologies.slice(0, 4).map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-[var(--border)] bg-white/70 px-2.5 py-1 text-xs text-muted"
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
