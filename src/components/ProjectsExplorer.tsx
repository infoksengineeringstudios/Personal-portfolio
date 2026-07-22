"use client";

import { useMemo, useState } from "react";
import type { ContentItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";

interface ProjectsExplorerProps {
  projects: ContentItem[];
}

// Preferred display order for discipline filters; others get appended.
const ORDER = ["Civil", "Digital", "Design & build"];

export function ProjectsExplorer({ projects }: ProjectsExplorerProps) {
  const [active, setActive] = useState<string>("All");

  const disciplines = useMemo(() => {
    const present = Array.from(
      new Set(
        projects
          .map((p) => p.discipline)
          .filter((d): d is string => Boolean(d)),
      ),
    );
    present.sort((a, b) => {
      const ia = ORDER.indexOf(a);
      const ib = ORDER.indexOf(b);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });
    return present;
  }, [projects]);

  const filters = ["All", ...disciplines];

  const visible =
    active === "All"
      ? projects
      : projects.filter((p) => p.discipline === active);

  const countFor = (filter: string) =>
    filter === "All"
      ? projects.length
      : projects.filter((p) => p.discipline === filter).length;

  return (
    <div>
      {disciplines.length > 1 ? (
        <div
          role="tablist"
          aria-label="Filter projects by discipline"
          className="mb-8 flex flex-wrap gap-2"
        >
          {filters.map((filter) => {
            const isActive = active === filter;
            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(filter)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 font-mono text-[0.75rem] uppercase tracking-[0.06em] transition-colors",
                  isActive
                    ? "border-accent bg-[var(--accent)] text-white"
                    : "border-[var(--border-strong)] text-muted hover:border-accent hover:text-accent",
                )}
              >
                {filter}
                <span
                  className={cn(
                    "ml-1.5",
                    isActive ? "text-white/70" : "text-subtle",
                  )}
                >
                  {countFor(filter)}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
