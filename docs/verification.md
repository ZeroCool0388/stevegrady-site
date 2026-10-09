# Portfolio verification

## Build and functional checks

Lint, strict TypeScript and optimized production build pass. All routes are statically prerendered. Production dependency audit reports zero vulnerabilities. The development lint dependency has an upstream advisory with no compatible patched version available; it is not shipped to site visitors.

Automated browser checks pass at 1440×1000, 390×844 and 360×844: no horizontal overflow, zero WCAG A/AA axe violations, four project cards, anchor navigation, reduced-motion cleanup, touch fallbacks, keyboard skip link, CV response, custom 404 and home navigation, no browser errors. Content also remains visible with JavaScript disabled.

## Visual fidelity ledger

The built-in browser was used first for visible review and anchor interaction. Playwright is used for the explicitly requested saved screenshots and repeatable desktop/mobile checks. Concept images were inspected with view_image and directly compared with the production browser captures.

| Point | Concept evidence | Implementation and correction |
| --- | --- | --- |
| Hero copy and navigation | `design/hero-concept.png` | Exact supplied headline, role, positioning, four navigation links and both actions. Above-fold copy diff: no additions or omissions. |
| Layout | Hero concept, desktop hero screenshot | Four headline lines, intro/action column to lower right, generous open space and bottom scroll cue. |
| Typography | All five concept images | Required original Clash Display and Satoshi fonts. Tight tracking was corrected after browser inspection; headline scale is responsive. Font file hashes match the official archives exactly. |
| Palette | All five concepts | Exact navy, off-white, muted text and lime tokens; restrained desktop radial spotlight, no image overlays. |
| Media and cards | Work concept, work screenshot | Two-column open card grid; fabricated concept dashboards replaced with real live captures. Personal AI System is a plain title card with no private diagram. |
| Section rhythm | About, approach and contact concepts | Open content, thin rules, numbered rows, oversized closing typography. No invented approach paragraph or duplicate work navigation. |
| Responsive layout | Mobile hero and work captures | Single-column cards, intro beneath heading, stacked contact actions, no overflow at 360px. |
| Motion and interaction | Brief and production browser | Kinetic hero, intersection reveals, eased desktop spotlight, magnetic primary actions, smooth anchors; all disabled or simplified under reduced motion and touch as required. |

The implementation is faithfully verified against the selected concept direction and the written brief, with the intentional corrections listed below. No material visual defects remain from the inspected comparison.

## Intentional differences and placeholders

The written brief overrides generated concept inventions: no extra section prose, fake dashboard screens or private-looking diagrams. About and project content use only the supplied facts. The Personal AI System card links to its supplied public write-up; no public live app or private source is implied.

- Email remains in `src/config/site.ts`; the email action appears after a valid address is configured.
- `public/cv/steve-grady-cv.pdf` says “CV coming soon”; replace the file and remove the coming-soon caption when ready.
- `SHOW_DEAL_STAT` remains false. Approve or omit the statistic before enabling it.

The source design brief is preserved locally and excluded from both Git and Vercel uploads. Content and credential-prefix scans pass. A literal substring scan produces incidental matches in the required VendorRisk project URL and two standard package integrity checksums; these are verified false positives and were preserved so links and dependency verification remain intact.

## Headline alternatives

1. I turn complex problems into AI-native solutions.
2. From customer problem to working solution.

The supplied headline remains on the site.
