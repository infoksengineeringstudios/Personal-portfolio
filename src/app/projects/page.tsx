import type { Metadata } from "next";
import { ProjectsExplorer } from "@/components/ProjectsExplorer";
import { SectionHeading } from "@/components/SectionHeading";
import { MarkdownBody } from "@/components/MarkdownBody";
import {
  FormworkDrawing,
  RoadSectionDrawing,
} from "@/components/TechDrawings";
import { getAllProjects, getPageContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected engineering projects generated from Assets/Projects.",
};

export default function ProjectsPage() {
  const page = getPageContent("Projects");
  const projects = getAllProjects();

  return (
    <div className="relative mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <FormworkDrawing className="pointer-events-none absolute right-0 top-6 hidden h-[230px] w-[300px] text-foreground opacity-55 lg:block" />
      <SectionHeading
        eyebrow="Work"
        title={page.title}
        description={page.intro}
      />
      {page.body ? (
        <div className="mb-10 max-w-3xl">
          <MarkdownBody content={page.body} />
        </div>
      ) : null}
      <ProjectsExplorer projects={projects} />

      <RoadSectionDrawing className="pointer-events-none mx-auto mt-16 w-full max-w-2xl text-foreground opacity-60" />
    </div>
  );
}
