import type { Metadata } from "next";
import { ExperienceList } from "@/components/ExperienceList";
import { MarkdownBody } from "@/components/MarkdownBody";
import { SectionHeading } from "@/components/SectionHeading";
import { getItems, getPageContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Internships",
  description: "Industry experience generated from Assets/Internships.",
};

export default function InternshipsPage() {
  const page = getPageContent("Internships");
  const items = getItems("internships");

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <SectionHeading
        eyebrow="Industry"
        title={page.title}
        description={page.intro}
      />
      {page.body ? (
        <div className="mb-10 max-w-3xl">
          <MarkdownBody content={page.body} />
        </div>
      ) : null}
      <ExperienceList items={items} basePath="/internships" />
    </div>
  );
}
