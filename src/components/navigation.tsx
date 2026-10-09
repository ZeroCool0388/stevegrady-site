"use client";
import { useEffect, useState } from "react";
const sections = ["about", "experience", "work"] as const;
export function Navigation() {
  const [active, setActive] = useState<string>("about");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-10% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <nav aria-label="Sections" className="section-nav">
      <ul>
        {sections.map((id) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
            >
              <span className="nav-line" />
              <span>{id}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
