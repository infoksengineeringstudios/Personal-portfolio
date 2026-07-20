import type { Metadata } from "next";
import { ExperienceList } from "@/components/ExperienceList";
import { MarkdownBody } from "@/components/MarkdownBody";
import { SectionHeading } from "@/components/SectionHeading";
import { getItems, getPageContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Leadership",
  description: "Leadership, mentoring, and ambassador roles at Monash University.",
};

export default function LeadershipPage() {
  const page = getPageContent("Leadership");
  const items = getItems("leadership");

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <SectionHeading
        eyebrow="Community"
        title={page.title}
        description={page.intro}
      />
      {page.body ? (
        <div className="mb-10 max-w-3xl">
          <MarkdownBody content={page.body} />
        </div>
      ) : null}
      <ExperienceList items={items} basePath="/leadership" />
    </div>
  );
}
