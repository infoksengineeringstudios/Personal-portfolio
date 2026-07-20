import Link from "next/link";
import type { ContentItem } from "@/lib/types";
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
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-foreground group-hover:text-accent">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {[item.role, item.organization].filter(Boolean).join(" · ")}
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                  {item.summary}
                </p>
              </div>
              <span className="shrink-0 text-sm text-subtle">{item.year}</span>
            </Link>
          </FadeIn>
        </li>
      ))}
    </ul>
  );
}
