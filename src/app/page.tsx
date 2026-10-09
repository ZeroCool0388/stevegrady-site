import Image from "next/image";
import { about, experience, projects, site } from "@/config/site";
import { Profile } from "@/components/profile";
import { Effects } from "@/components/effects";
import { Pills } from "@/components/pills";
import { Arrow } from "@/components/arrow";
export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Effects />
      <div className="site-shell">
        <Profile />
        <main id="main" tabIndex={-1}>
          <section id="about" aria-labelledby="about-title">
            <h2 id="about-title" className="section-label">
              About
            </h2>
            <div className="about-copy">
              {about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
          <section id="experience" aria-labelledby="experience-title">
            <h2 id="experience-title" className="section-label" data-reveal>
              Experience
            </h2>
            <div className="card-group experience-list">
              {experience.map((role) => (
                <article
                  className="card experience-card"
                  key={role.date}
                  data-reveal
                >
                  <p className="date">{role.date}</p>
                  <div>
                    <h3>{role.title}</h3>
                    <p className="descriptor">{role.descriptor}</p>
                    {role.description && (
                      <p className="card-description">{role.description}</p>
                    )}
                    <Pills items={role.skills} />
                  </div>
                </article>
              ))}
            </div>
            <a
              className="cv-link"
              href={site.cv}
              target="_blank"
              rel="noopener noreferrer"
            >
              View full CV <Arrow />
            </a>
          </section>
          <section id="work" aria-labelledby="work-title">
            <h2 id="work-title" className="section-label" data-reveal>
              Selected work
            </h2>
            <p className="work-intro" data-reveal>
              Independent projects, built with synthetic data.
            </p>
            <div className="card-group work-list">
              {projects.map((project) => (
                <article
                  className="card work-card"
                  key={project.name}
                  data-reveal
                >
                  <Image
                    src={project.image}
                    alt={
                      project.name === "Personal AI System"
                        ? "Personal AI System architecture diagram"
                        : `${project.name} live demo screenshot`
                    }
                    width={project.width}
                    height={project.height}
                    sizes="120px"
                    className={
                      project.name === "Personal AI System"
                        ? "thumbnail diagram-thumbnail"
                        : "thumbnail"
                    }
                    loading="lazy"
                  />
                  <div>
                    <h3>
                      <a
                        className="project-link"
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.name} <Arrow />
                      </a>
                    </h3>
                    <p className="card-description">{project.description}</p>
                    {project.repo && (
                      <a
                        className="repo-link"
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.name} repository`}
                      >
                        Repo <Arrow />
                      </a>
                    )}
                    <Pills items={project.skills} />
                  </div>
                </article>
              ))}
            </div>
          </section>
          <footer>
            Built with Next.js and Tailwind CSS, deployed on Vercel.
          </footer>
        </main>
      </div>
    </>
  );
}
