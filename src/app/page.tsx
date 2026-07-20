import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { FadeIn } from "@/components/FadeIn";
import {
  getFeaturedProjects,
  getItems,
  getPageContent,
  getProfile,
} from "@/lib/content";
import { getExperiencePeriod } from "@/lib/utils";

export default function HomePage() {
  const profile = getProfile();
  const featured = getFeaturedProjects();
  const internships = getItems("internships").slice(0, 3);
  const leadership = getItems("leadership");
  const projectsIntro = getPageContent("Projects");
  const leadershipIntro = getPageContent("Leadership");

  return (
    <>
      <Hero
        name={profile.name}
        title={profile.title}
        tagline={profile.tagline}
      />

      <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          eyebrow="Selected work"
          title={projectsIntro.title}
          description={projectsIntro.intro}
          action={
            <Link
              href="/projects"
              className="text-sm font-medium text-accent hover:underline"
            >
              All projects
            </Link>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-white/40">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <FadeIn>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-subtle">
              Experience
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Internships &amp; practice
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Industry experience across consulting, construction, and public
              infrastructure — from design documentation to live site delivery.
            </p>
            <Link
              href="/internships"
              className="mt-6 inline-flex text-sm font-medium text-accent hover:underline"
            >
              View internships
            </Link>
          </FadeIn>

          <ul className="space-y-0 divide-y divide-[var(--border)]">
            {internships.map((item, index) => (
              <FadeIn key={item.slug} delay={0.05 * index}>
                <li className="flex items-baseline justify-between gap-6 py-5">
                  <div>
                    <Link
                      href={`/internships/${item.slug}`}
                      className="text-lg font-semibold tracking-[-0.03em] hover:text-accent"
                    >
                      {item.title}
                    </Link>
                    <p className="mt-1 text-sm text-muted">{item.role}</p>
                  </div>
                  <span className="text-sm text-subtle">
                    {getExperiencePeriod(item)}
                  </span>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>


      <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          eyebrow="Community"
          title={leadershipIntro.title}
          description={leadershipIntro.intro}
          action={
            <Link
              href="/leadership"
              className="text-sm font-medium text-accent hover:underline"
            >
              All leadership
            </Link>
          }
        />
        <ul className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {leadership.map((item, index) => (
            <FadeIn key={item.slug} delay={Math.min(index * 0.05, 0.2)}>
              <li>
                <Link
                  href={`/leadership/${item.slug}`}
                  className="group flex flex-col gap-2 py-7 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
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
                  <span className="shrink-0 text-sm text-subtle">
                    {getExperiencePeriod(item)}
                  </span>
                </Link>
              </li>
            </FadeIn>
          ))}
        </ul>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <FadeIn>
          <div className="rounded-[28px] border border-[var(--border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.8),rgba(232,238,245,0.9))] px-6 py-12 text-center sm:px-12 sm:py-16">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Let&apos;s build something precise
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted">
              Open to engineering roles, research collaborations, and digital
              delivery projects. Resume, certifications, and supporting
              documents are available in the About section.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="btn-primary mt-8 h-12 px-6 text-sm"
            >
              {profile.email}
            </a>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
