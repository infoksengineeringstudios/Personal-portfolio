import type { Metadata } from "next";
import { AvatarImage } from "@/components/AvatarImage";
import { FadeIn } from "@/components/FadeIn";
import { MarkdownBody } from "@/components/MarkdownBody";
import { ReportDownloads } from "@/components/ReportDownloads";
import { SectionHeading } from "@/components/SectionHeading";
import { ScaffoldingDrawing } from "@/components/TechDrawings";
import { getPageContent, getProfile } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "Background, focus areas, and contact.",
};

export default function AboutPage() {
  const page = getPageContent("About");
  const profile = getProfile();

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <SectionHeading
        index="04"
        eyebrow="Profile"
        title={page.title}
        description={page.intro}
      />

      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <FadeIn>
          <div className="space-y-8">
            <MarkdownBody content={profile.body} />
            {page.body ? <MarkdownBody content={page.body} /> : null}
            <ScaffoldingDrawing className="pointer-events-none mx-auto mt-4 w-full max-w-[240px] text-foreground opacity-60" />
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <aside className="corner-marks sheet p-6 sm:p-8">
            <div className="mx-auto mb-6 aspect-square w-full max-w-[220px]">
              <AvatarImage
                src="/avatars/profile-circle.png"
                hoverSrc="/avatars/profile-circle-smile.png"
                alt={profile.name}
                className="h-full w-full"
                imageClassName="object-center"
                sizes="220px"
              />
            </div>
            {profile.resume ? (
              <a
                href={profile.resume.url}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="btn-primary mb-6 inline-flex h-11 w-full items-center justify-center gap-2 px-5 text-sm"
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
            <h2 className="text-lg font-semibold tracking-[-0.03em]">Details</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="label-mono label-mono--muted">Focus</dt>
                <dd className="mt-1 text-foreground">{profile.title}</dd>
              </div>
              <div>
                <dt className="label-mono label-mono--muted">Location</dt>
                <dd className="mt-1 text-foreground">{profile.location}</dd>
              </div>
              <div id="contact">
                <dt className="label-mono label-mono--muted">Personal email</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${profile.email}`}
                    className="font-medium text-accent hover:underline"
                  >
                    {profile.email}
                  </a>
                </dd>
              </div>
              {profile.studentEmail ? (
                <div>
                  <dt className="label-mono label-mono--muted">Student email</dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${profile.studentEmail}`}
                      className="font-medium text-accent hover:underline"
                    >
                      {profile.studentEmail}
                    </a>
                  </dd>
                </div>
              ) : null}
              {profile.phone ? (
                <div>
                  <dt className="label-mono label-mono--muted">Phone</dt>
                  <dd className="mt-1">
                    <a
                      href={`tel:${profile.phone.replace(/\s/g, "")}`}
                      className="font-medium text-accent hover:underline"
                    >
                      {profile.phone}
                    </a>
                  </dd>
                </div>
              ) : null}
              {profile.linkedin ? (
                <div>
                  <dt className="label-mono label-mono--muted">LinkedIn</dt>
                  <dd className="mt-1">
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      Profile
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>

            <div className="mt-8">
              <ReportDownloads reports={profile.documents} />
            </div>
          </aside>
        </FadeIn>
      </div>
    </div>
  );
}
