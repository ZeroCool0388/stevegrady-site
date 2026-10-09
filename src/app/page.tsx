import { site, projects, steps, SHOW_DEAL_STAT, dealStat } from "@/config/site";
import { Navigation } from "@/components/navigation";
import { Arrow } from "@/components/arrow";
import { ProjectCard } from "@/components/project-card";
function Label({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <p className="section-label">
      <span>{number}</span>
      <span aria-hidden="true">/</span>
      {children}
    </p>
  );
}
export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main" className="shell" tabIndex={-1}>
        <section className="hero" id="top" aria-labelledby="hero-heading">
          <h1
            id="hero-heading"
            aria-label="I design AI-native solutions that get bought and used."
          >
            {[
              "I design AI-native",
              "solutions that",
              "get bought",
              "and used.",
            ].map((line, i) => (
              <span
                className={`hero-line ${i > 1 ? "accent" : ""}`}
                aria-hidden="true"
                key={line}
              >
                <span>{line}</span>
              </span>
            ))}
          </h1>
          <div className="hero-intro">
            <p className="role">{site.title}</p>
            <p className="positioning">{site.positioning}</p>
            <div className="actions">
              <a className="button" data-magnetic href="#work">
                View my work
                <Arrow />
              </a>
              <a className="text-link" href="#contact">
                Let&apos;s talk
              </a>
            </div>
          </div>
          <a className="scroll-cue" href="#about">
            Scroll to explore
            <Arrow down />
          </a>
        </section>
        <section
          className="about section"
          id="about"
          aria-labelledby="about-heading"
        >
          <Label number="01">About</Label>
          <div className="about-content" data-reveal>
            <h2 id="about-heading">
              Complex problems.
              <br />
              Clear solutions.
            </h2>
            <div className="about-copy">
              <p>
                7+ years across pre-sales, solution design, SaaS implementation
                and systems integration. I specialise in vendor and contract
                lifecycle management (VCLM) and third-party risk.
              </p>
              <p>
                A former Computer Science teacher, I explain complex things in
                plain English. I design solutions with AI built into the
                workflow, cutting manual effort and shortening the path to
                go-live.
              </p>
              {SHOW_DEAL_STAT && <p>{dealStat}</p>}
            </div>
            <ul className="sectors" aria-label="Sectors">
              {[
                "Logistics",
                "Bioscience",
                "Pharmaceuticals",
                "Finance",
                "Fintech",
              ].map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </section>
        <section
          className="work section"
          id="work"
          aria-labelledby="work-heading"
        >
          <Label number="02">Work</Label>
          <h2 id="work-heading" data-reveal>
            From idea to
            <br />
            working product<span className="accent">.</span>
          </h2>
          <div className="project-grid">
            {projects.map((project, index) => (
              <ProjectCard key={project.name} project={project} index={index} />
            ))}
          </div>
        </section>
        <section
          className="approach section"
          id="approach"
          aria-labelledby="approach-heading"
        >
          <div>
            <Label number="03">Approach</Label>
            <h2 id="approach-heading" data-reveal>
              A clear path
              <br />
              to go-live<span className="accent">.</span>
            </h2>
          </div>
          <ol className="steps">
            {steps.map((step, index) => (
              <li key={step.name} data-reveal>
                <span className="step-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <h3>{step.name}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </section>
        <section
          className="contact section"
          id="contact"
          aria-labelledby="contact-heading"
        >
          <Label number="04">Contact</Label>
          <div className="contact-layout">
            <h2 id="contact-heading" data-reveal>
              Let&apos;s make
              <br />
              complex things
              <br />
              <span className="accent">work.</span>
            </h2>
            <div className="contact-actions">
              <div className="actions">
                <a
                  className="button"
                  data-magnetic
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                  <Arrow />
                </a>
                <a
                  className="text-link"
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                  <Arrow />
                </a>
              </div>
              {site.email.includes("@") && (
                <a
                  className="text-link email-link"
                  href={`mailto:${site.email}`}
                >
                  Email me
                  <Arrow />
                </a>
              )}
              <div className="cv-link">
                <a className="text-link" href={site.cv} download>
                  Download CV
                  <Arrow />
                </a>
                <span>(coming soon)</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer shell">
        <p>© {new Date().getFullYear()} Steve Grady</p>
        <nav aria-label="Social links">
          <a href={site.github} target="_blank" rel="noopener noreferrer">
            GitHub
            <Arrow />
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
            <Arrow />
          </a>
        </nav>
      </footer>
    </>
  );
}
