import { site } from "@/config/site";
import { Navigation } from "./navigation";
export function Profile() {
  return (
    <aside className="profile" aria-label="Profile">
      <header className="identity" id="identity">
        <h1>{site.name}</h1>
        <p className="job-title">{site.title}</p>
      </header>
      <div className="profile-copy">
        <p>{site.introduction}</p>
        <p className="location">{site.location}</p>
      </div>
      <Navigation />
      <ul className="socials" aria-label="Social profiles">
        <li>
          <a
            data-magnetic
            href={site.github}
            aria-label="GitHub profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .75a11.25 11.25 0 0 0-3.558 21.923c.563.104.768-.244.768-.542 0-.267-.01-.975-.015-1.913-3.13.68-3.791-1.509-3.791-1.509-.512-1.3-1.25-1.646-1.25-1.646-1.022-.7.077-.686.077-.686 1.13.08 1.725 1.16 1.725 1.16 1.005 1.724 2.637 1.226 3.279.937.102-.728.393-1.226.715-1.508-2.499-.284-5.126-1.25-5.126-5.566 0-1.23.439-2.233 1.16-3.02-.116-.284-.502-1.429.11-2.98 0 0 .945-.303 3.094 1.153a10.77 10.77 0 0 1 5.626 0c2.148-1.456 3.09-1.153 3.09-1.153.615 1.551.23 2.696.114 2.98.723.787 1.158 1.79 1.158 3.02 0 4.327-2.631 5.279-5.138 5.557.404.35.765 1.044.765 2.104 0 1.52-.014 2.747-.014 3.12 0 .301.203.652.774.541A11.251 11.251 0 0 0 12 .75Z" />
            </svg>
          </a>
        </li>
        <li>
          <a
            data-magnetic
            href={site.linkedin}
            aria-label="LinkedIn profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.46 7.89a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.29 10.86H15.8v-4.65c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.31h.04c.39-.75 1.35-1.55 2.78-1.55 2.98 0 3.59 1.96 3.59 4.5v5.29Z" />
            </svg>
          </a>
        </li>
      </ul>
    </aside>
  );
}
