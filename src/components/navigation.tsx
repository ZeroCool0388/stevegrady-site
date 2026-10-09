import Link from "next/link";
import { site } from "@/config/site";
export function Navigation() {
  return (
    <header className="site-header shell">
      <Link href="/#top" className="wordmark" aria-label="Steve Grady home">
        {site.name}
      </Link>
      <nav aria-label="Main navigation">
        {[
          ["About", "about"],
          ["Work", "work"],
          ["Approach", "approach"],
          ["Contact", "contact"],
        ].map(([name, id]) => (
          <a key={id} href={`/#${id}`}>
            {name}
          </a>
        ))}
      </nav>
    </header>
  );
}
