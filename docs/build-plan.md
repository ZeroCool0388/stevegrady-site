# Steve Grady portfolio — build plan

## Direction and content lock

Near-black navy #0b0d12, off-white #f3f3ed, muted #a5a7af, lime #c6ff3d. Clash Display 600/700 headings, Satoshi 400/500/700 body, official unmodified self-hosted files. Desktop gutters 64px, mobile 24px. Open editorial sections separated by fine rules. No decorative cards outside the four requested project cards.

Hero: Steve Grady; About, Work, Approach, Contact; I design AI-native / solutions that / get bought / and used.; Senior Technical Solutions Consultant; AI-native solution design, integrations & pre-sales; View my work; Let's talk; Scroll to explore. No additional hero copy.

Section order: Hero → About → Work → How I work → Contact → footer. Heading and content references: docs/design/*-concept.png. Concepts were generated with the built-in Image Gen tool, using the supplied content and this exact palette, typography, navigation, section order and component rules. The written brief takes precedence over extra copy or invented interface details in the concept images.

## Implementation

1. Next.js App Router, strict TypeScript, Tailwind 4; static page and metadata. Small components for navigation, project cards, motion and links.
2. About uses the supplied experience, specialisms, teaching background and sectors. Four work cards use real screenshots of the provided demos; Personal AI System uses a plain styled title card, no private diagram.
3. Motion reveals, desktop-only magnetic actions and cursor spotlight; Lenis anchor scrolling. Reduced motion turns all effects off and reveals content instantly. Touch disables pointer effects.
4. Contact uses LinkedIn and GitHub until email is configured. CV PDF explicitly says coming soon. Deal statistic remains behind SHOW_DEAL_STAT = false.
5. Metadata, canonical, 1200×630 social image, favicon, apple icon, sitemap, robots, accessible custom 404 with curtain entrance.
6. Lint, type-check, production build, content scan, browser verification, mobile overflow at 360/390px, keyboard and reduced motion checks, Lighthouse mobile and desktop.
7. Create only ZeroCool0388/stevegrady-site as a public repository, with local required commit identity. Deploy only to a free Vercel address once account access is available. No purchased or connected domain.

## Intentional concept corrections

Remove additional navigation, invented copy, fabricated dashboards and private-looking diagram from the work concept. Replace with actual demo screenshots and the requested simple title card. Omit the generated approach paragraph because it was not supplied. Personal AI System has no public live app: both its write-up and source reference link to the supplied public repository, explicitly labelled.
