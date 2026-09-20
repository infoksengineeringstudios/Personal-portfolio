import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/FadeIn";
import { ImageGallery } from "@/components/ImageGallery";
import { KeyLearnings } from "@/components/KeyLearnings";
import { MarkdownBody } from "@/components/MarkdownBody";
import { ReportDownloads } from "@/components/ReportDownloads";
import { TechStack } from "@/components/TechStack";
import { getAllProjects, getItemBySlug } from "@/lib/content";
import { getExperiencePeriod } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getItemBySlug("projects", slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getItemBySlug("projects", slug);
  if (!project) notFound();

  return (
    <article className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <FadeIn>
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/projects" className="hover:text-foreground">
                Projects
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground">{project.title}</li>
          </ol>
        </nav>

        <header className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 text-sm text-subtle">
            {getExperiencePeriod(project) ? (
              <span>{getExperiencePeriod(project)}</span>
            ) : null}
            {project.featured ? (
              <>
                <span aria-hidden="true">·</span>
                <span>Featured</span>
              </>
            ) : null}
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-foreground sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            {project.summary}
          </p>
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6 inline-flex h-11 items-center gap-2 px-5 text-sm"
            >
              Visit live site
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
              >
                <path
                  d="M7 17 17 7m0 0H8m9 0v9"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          ) : null}
        </header>
      </FadeIn>

      <div className="mt-12 space-y-14">
        {project.galleries.map((group, i) => (
          <ImageGallery
            key={group.title || `gallery-${i}`}
            images={group.images}
            title={group.title || project.title}
            heading={group.title || "Gallery"}
          />
        ))}
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div className="space-y-12">
          <section aria-labelledby="summary-heading">
            <h2
              id="summary-heading"
              className="text-xl font-semibold tracking-[-0.03em]"
            >
              Summary
            </h2>
            <div className="mt-4">
              <MarkdownBody content={project.body} />
            </div>
          </section>
          <KeyLearnings learnings={project.learnings} />
        </div>

        <aside className="space-y-10 lg:sticky lg:top-24 lg:self-start">
          <TechStack technologies={project.technologies} />
          <ReportDownloads reports={project.reports} />
        </aside>
      </div>
    </article>
  );
}
