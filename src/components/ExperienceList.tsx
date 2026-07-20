import Link from "next/link";
import type { ContentItem } from "@/lib/types";
import { getExperiencePeriod } from "@/lib/utils";
import { FadeIn } from "./FadeIn";

interface ExperienceListProps {
  items: ContentItem[];
  basePath: "/internships" | "/leadership";
}

export function ExperienceList({ items, basePath }: ExperienceListProps) {
  return (
    <ul className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
      {items.map((item, index) => (
        <li key={item.slug}>
          <FadeIn delay={Math.min(index * 0.05, 0.2)}>
            <Link
              href={`${basePath}/${item.slug}`}
              className="group flex flex-col gap-2 py-7 transition-colors sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
            >
              <div>
                <h3 className="flex items-baseline gap-3 text-xl font-semibold tracking-[-0.03em] text-foreground group-hover:text-accent">
                  <span className="font-mono text-sm font-medium text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {[item.role, item.organization].filter(Boolean).join(" · ")}
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                  {item.summary}
                </p>
              </div>
              <span className="shrink-0 font-mono text-xs text-subtle sm:text-sm">
                {getExperiencePeriod(item)}
              </span>
            </Link>
          </FadeIn>
        </li>
      ))}
    </ul>
  );
}
