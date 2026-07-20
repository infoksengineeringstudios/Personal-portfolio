import type { Metadata } from "next";
import { AvatarImage } from "@/components/AvatarImage";
import { FadeIn } from "@/components/FadeIn";
import { MarkdownBody } from "@/components/MarkdownBody";
import { ReportDownloads } from "@/components/ReportDownloads";
import { SectionHeading } from "@/components/SectionHeading";
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
        eyebrow="Profile"
        title={page.title}
        description={page.intro}
      />

      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <FadeIn>
          <div className="space-y-8">
            <MarkdownBody content={profile.body} />
            {page.body ? <MarkdownBody content={page.body} /> : null}
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <aside className="rounded-[24px] border border-[var(--border)] bg-white/65 p-6 sm:p-8">
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
            <h2 className="text-lg font-semibold tracking-[-0.03em]">Details</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="text-subtle">Focus</dt>
                <dd className="mt-1 text-foreground">{profile.title}</dd>
              </div>
              <div>
                <dt className="text-subtle">Location</dt>
                <dd className="mt-1 text-foreground">{profile.location}</dd>
              </div>
              <div id="contact">
                <dt className="text-subtle">Personal email</dt>
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
                  <dt className="text-subtle">Student email</dt>
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
                  <dt className="text-subtle">Phone</dt>
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
                  <dt className="text-subtle">LinkedIn</dt>
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
