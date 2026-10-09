import Image from "next/image";
import { Arrow } from "./arrow";
import { projects } from "@/config/site";
export function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <article className="project" data-reveal>
      <a
        className="project-media"
        href={project.live}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.image ? "Open demo" : "Read write-up"}: ${project.name}`}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.name} live application screenshot`}
            width={1440}
            height={900}
            sizes="(max-width: 760px) 100vw, 50vw"
            quality={85}
          />
        ) : (
          <div className="system-title">
            <span className="system-platform">OpenClaw</span>
            <span className="system-heading">
              Personal
              <br />
              AI System<span className="accent">.</span>
            </span>
            <span className="system-caption">
              Model routing. Bounded help. Reviewable stages.
            </span>
          </div>
        )}
        <span className="media-arrow">
          <Arrow />
        </span>
      </a>
      <div className="project-heading">
        <h3>{project.name}</h3>
        <span className="project-number" aria-hidden="true">
          0{index + 1}
        </span>
      </div>
      <p>{project.description}</p>
      <div className="project-links">
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
        >
          {project.image ? "Live demo" : "Read write-up"}
          <Arrow />
        </a>
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
        >
          GitHub
          <Arrow />
          <span className="sr-only"> for {project.name}</span>
        </a>
      </div>
    </article>
  );
}
