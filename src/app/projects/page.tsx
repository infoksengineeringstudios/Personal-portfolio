import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { MarkdownBody } from "@/components/MarkdownBody";
import { RoadSectionDrawing } from "@/components/TechDrawings";
import { getAllProjects, getPageContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected engineering projects generated from Assets/Projects.",
};

export default function ProjectsPage() {
  const page = getPageContent("Projects");
  const projects = getAllProjects();

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
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
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>

      <RoadSectionDrawing className="pointer-events-none mx-auto mt-16 w-full max-w-2xl text-foreground opacity-60" />
    </div>
  );
}
