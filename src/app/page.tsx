import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { FadeIn } from "@/components/FadeIn";
import {
  BeamSectionDrawing,
  ContourDrawing,
  CraneDrawing,
} from "@/components/TechDrawings";
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
        resumeUrl={profile.resume?.url}
      />

      <section className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        {/* Tower crane rising in the margin */}
        <CraneDrawing
          className="pointer-events-none absolute -right-40 top-6 hidden h-[520px] w-[220px] text-foreground opacity-60 2xl:block"
        />
        <SectionHeading
          index="01"
          eyebrow="Selected work"
          title={projectsIntro.title}
          description={projectsIntro.intro}
          action={
            <Link
              href="/projects"
              className="font-mono text-sm font-medium text-accent hover:underline"
            >
              All projects →
            </Link>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>

      <section className="cyanotype relative overflow-hidden border-y-2 border-[var(--accent-deep)]">
        <BeamSectionDrawing className="pointer-events-none absolute -right-6 top-1/2 hidden h-[260px] w-[200px] -translate-y-1/2 text-white opacity-40 lg:block" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <FadeIn>
            <p className="label-mono flex items-center gap-3">
              <span className="border border-white/30 px-1.5 py-0.5">02</span>
              Experience
              <span aria-hidden="true" className="h-px w-10 bg-white/30" />
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Internships &amp; practice
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#b9bec7]">
              Industry experience across consulting, construction, and public
              infrastructure — from design documentation to live site delivery.
            </p>
            <Link
              href="/internships"
              className="mt-6 inline-flex font-mono text-sm font-medium text-[#ef8f8f] hover:underline"
            >
              View internships →
            </Link>
          </FadeIn>

          <ul className="space-y-0 divide-y divide-white/10">
            {internships.map((item, index) => (
              <FadeIn key={item.slug} delay={0.05 * index}>
                <li className="flex items-baseline justify-between gap-6 py-5">
                  <div>
                    <Link
                      href={`/internships/${item.slug}`}
                      className="flex items-baseline gap-3 text-lg font-semibold tracking-[-0.03em] text-white hover:text-[#ef8f8f]"
                    >
                      <span className="font-mono text-sm font-medium text-[#ef8f8f]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item.title}
                    </Link>
                    <p className="mt-1 text-sm text-[#b9bec7]">{item.role}</p>
                  </div>
                  <span className="font-mono text-xs text-[#8b919c] sm:text-sm">
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
          index="03"
          eyebrow="Community"
          title={leadershipIntro.title}
          description={leadershipIntro.intro}
          action={
            <Link
              href="/leadership"
              className="font-mono text-sm font-medium text-accent hover:underline"
            >
              All leadership →
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
                  <span className="shrink-0 font-mono text-xs text-subtle sm:text-sm">
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
          <div className="corner-marks sheet relative overflow-hidden px-6 py-12 text-center sm:px-12 sm:py-16">
            {/* Survey contours in the background */}
            <ContourDrawing className="pointer-events-none absolute inset-0 h-full w-full text-foreground opacity-35" />
            <span className="stamp absolute right-4 top-4 hidden md:inline-block">
              Open to opportunities
            </span>
            <p className="label-mono relative">RFT — Request for Tender</p>
            <h2 className="relative mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Let&apos;s build something precise
            </h2>
            <p className="relative mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted">
              Open to engineering roles, research collaborations, and digital
              delivery projects. Resume, certifications, and supporting
              documents are available in the About section.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="btn-primary relative mt-8 h-12 w-full px-6 text-sm sm:w-auto"
            >
              {profile.email}
            </a>
            <p className="mt-6 md:hidden">
              <span className="stamp">Open to opportunities</span>
            </p>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
