import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/FadeIn";
import { ImageGallery } from "@/components/ImageGallery";
import { KeyLearnings } from "@/components/KeyLearnings";
import { MarkdownBody } from "@/components/MarkdownBody";
import { ReportDownloads } from "@/components/ReportDownloads";
import { TechStack } from "@/components/TechStack";
import { getItemBySlug, getItems } from "@/lib/content";
import type { ContentKind } from "@/lib/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const KIND: ContentKind = "internships";
const LABEL = "Internships";
const BASE = "/internships";

export function generateStaticParams() {
  return getItems(KIND).map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getItemBySlug(KIND, slug);
  if (!item) return { title: LABEL };
  return { title: item.title, description: item.summary };
}

export default async function InternshipDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getItemBySlug(KIND, slug);
  if (!item) notFound();

  return (
    <article className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <FadeIn>
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href={BASE} className="hover:text-foreground">
                {LABEL}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground">{item.title}</li>
          </ol>
        </nav>

        <header className="max-w-3xl">
          <p className="text-sm text-subtle">
            {[item.role, item.organization, item.year]
              .filter(Boolean)
              .join(" · ")}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
            {item.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            {item.summary}
          </p>
        </header>
      </FadeIn>

      {item.images.length > 0 ? (
        <div className="mt-12">
          <ImageGallery images={item.images} title={item.title} />
        </div>
      ) : null}

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div className="space-y-12">
          <section aria-labelledby="overview-heading">
            <h2 id="overview-heading" className="sr-only">
              Overview
            </h2>
            <MarkdownBody content={item.body} />
          </section>
          {item.learnings.length > 0 ? (
            <KeyLearnings learnings={item.learnings} />
          ) : null}
        </div>
        <aside className="space-y-10 lg:sticky lg:top-24 lg:self-start">
          <TechStack technologies={item.technologies} title="Skills & tools" />
          <ReportDownloads reports={item.reports} />
        </aside>
      </div>
    </article>
  );
}
