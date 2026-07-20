import Link from "next/link";
import { AvatarImage } from "./AvatarImage";
import { FadeIn } from "./FadeIn";

interface HeroProps {
  name: string;
  title: string;
  tagline: string;
}

export function Hero({ name, title, tagline }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-x-0 top-0 h-[72vh] bg-[radial-gradient(ellipse_at_center,rgba(0,113,227,0.10),transparent_60%)]" />
        <div className="absolute right-[-10%] top-[18%] h-[42vh] w-[42vw] rounded-full bg-[radial-gradient(circle,rgba(148,163,184,0.22),transparent_70%)] blur-2xl" />
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-4.25rem)] w-full max-w-6xl items-center gap-10 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-20 lg:pt-6">
        <FadeIn immediate className="relative z-10 max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-subtle">
            Portfolio
          </p>
          <h1 className="mt-4 text-[clamp(2.75rem,7vw,5.25rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-foreground">
            {name}
          </h1>
          <p className="mt-5 text-lg font-medium tracking-[-0.02em] text-foreground/85 sm:text-xl">
            {title}
          </p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            {tagline}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="btn-primary h-12 px-6 text-sm"
            >
              View projects
            </Link>
            <Link
              href="/about"
              className="btn-secondary h-12 px-6 text-sm"
            >
              About me
            </Link>
          </div>
        </FadeIn>

        <FadeIn immediate delay={0.12} className="relative z-10">
          <div
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] sm:aspect-[5/4] lg:aspect-[4/5]"
            style={{
              background:
                "linear-gradient(145deg, #d9e4ef 0%, #c5d4e4 42%, #aebfd2 100%)",
            }}
          >
            <AvatarImage
              src="/avatars/fullbody-waving.png"
              hoverSrc="/avatars/fullbody-smile.png"
              alt={`${name} avatar`}
              className="absolute inset-0"
              imageClassName="object-bottom"
              priority
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(11,18,32,0.28)] to-transparent p-6 sm:p-8">
              <p className="text-sm font-medium text-white/95">
                Precision / Systems / Clarity
              </p>
              <p className="mt-1 text-sm text-white/75">
                Digital delivery for the built environment
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
