import Link from "next/link";
import { AnimatedName } from "./AnimatedName";
import { AvatarImage } from "./AvatarImage";
import { BlueprintDrawing } from "./BlueprintDrawing";
import { DumpTruckDrawing, ExcavatorDrawing } from "./TechDrawings";
import { FadeIn } from "./FadeIn";

interface HeroProps {
  name: string;
  title: string;
  tagline: string;
  resumeUrl?: string;
  credentials?: string[];
}

export function Hero({
  name,
  title,
  tagline,
  resumeUrl,
  credentials = [],
}: HeroProps) {
  const year = new Date().getFullYear();

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-x-0 top-0 h-[60vh] bg-[radial-gradient(ellipse_at_top,rgba(23,25,30,0.06),transparent_65%)]" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pb-4 pt-10 sm:px-8 sm:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-6 lg:pt-12">
        <FadeIn immediate className="relative z-10 max-w-xl">
          <p className="label-mono">
            DWG 001 &mdash; Portfolio &middot; Melbourne, AUS
          </p>
          <AnimatedName
            text={name}
            className="mt-4 text-[clamp(2.5rem,10vw,5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-foreground"
          />

          <div className="dim-line mt-6 max-w-md">
            <span className="dim-cap" aria-hidden="true" />
            <span className="label-mono whitespace-nowrap">{title}</span>
            <span className="dim-cap" aria-hidden="true" />
          </div>

          <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            {tagline}
          </p>

          {credentials.length > 0 ? (
            <div className="mt-6">
              <p className="label-mono label-mono--muted">Qualifications</p>
              <ul className="mt-2.5 flex flex-wrap gap-2">
                {credentials.map((credential) => (
                  <li
                    key={credential}
                    className="rounded-[6px] border border-[var(--border)] bg-[var(--accent-soft)] px-2.5 py-1 text-[0.8125rem] font-medium text-foreground"
                  >
                    {credential}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/projects" className="btn-primary h-12 px-6 text-sm">
              View projects
            </Link>
            <Link href="/about" className="btn-secondary h-12 px-6 text-sm">
              About me
            </Link>
            {resumeUrl ? (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="btn-secondary inline-flex h-12 items-center gap-2 px-6 text-sm"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4"
                >
                  <path
                    d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Download CV
              </a>
            ) : null}
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-[var(--border)] pt-5">
            {[
              ["Discipline", "Civil Engineering"],
              ["Base", "Monash University"],
              ["Status", "Open to work"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="label-mono label-mono--muted">{label}</dt>
                <dd className="mt-1 text-sm font-medium text-foreground">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </FadeIn>

        <FadeIn immediate delay={0.12} className="relative z-10">
          <figure className="corner-marks sheet overflow-hidden">
            <div
              className="relative aspect-[2/3] w-full"
              style={{
                background:
                  "linear-gradient(150deg, #f1f1ef 0%, #e3e4e2 55%, #d1d3d2 100%)",
              }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-60"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(23,25,30,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(23,25,30,0.07) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              <AvatarImage
                src="/avatars/fullbody-waving.png"
                hoverSrc="/avatars/fullbody-smile.png"
                alt={`${name} avatar`}
                className="h-full w-full"
                imageClassName="object-bottom"
                priority
              />
            </div>
            <figcaption className="grid grid-cols-4 divide-x divide-[var(--border)] border-t border-[var(--border)] bg-white">
              {[
                ["Sheet", "01 / 01"],
                ["Scale", "1:1"],
                ["Rev", "C"],
                ["Date", String(year)],
              ].map(([label, value]) => (
                <div key={label} className="px-2.5 py-2.5 sm:px-4">
                  <p className="label-mono label-mono--muted text-[0.5625rem] sm:text-[0.6875rem]">
                    {label}
                  </p>
                  <p className="mt-0.5 font-mono text-xs font-medium text-foreground sm:text-sm">
                    {value}
                  </p>
                </div>
              ))}
            </figcaption>
          </figure>
        </FadeIn>
      </div>

      {/* Site scene drawing itself across the base of the hero */}
      <FadeIn
        immediate
        delay={0.3}
        className="pointer-events-none relative z-0 mx-auto w-full max-w-6xl px-5 pb-6 sm:px-8"
      >
        <div className="flex items-end justify-center gap-4 lg:gap-10">
          <ExcavatorDrawing className="hidden w-52 shrink-0 text-foreground opacity-70 md:block" />
          <BlueprintDrawing className="w-full max-w-3xl text-foreground opacity-60" />
          <DumpTruckDrawing className="hidden w-56 shrink-0 text-foreground opacity-70 lg:block" />
        </div>
      </FadeIn>
    </section>
  );
}
