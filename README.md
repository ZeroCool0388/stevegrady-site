# Steve Grady

A calm personal CV site for a senior technical solutions consultant, with experience and four independent projects.

[Live site](https://stevegrady-site.vercel.app) · [Repository](https://github.com/ZeroCool0388/stevegrady-site)

Next.js 16 App Router, strict TypeScript, Tailwind CSS v4, Inter and Instrument Serif via next/font, Motion and Lenis. Fully static export with no backend or environment values.

## Local development

`npm install`, then `npm run dev`. Run `npm run lint`, `npm run typecheck` and `npm run build`. `npm start` serves the exported build. `npm run qa` checks the local build; set QA_URL for a deployed site. `node scripts/lighthouse.mjs` runs both device profiles.

## Steve's placeholders

- Replace `public/cv/steve-grady-cv.pdf`, currently a one-page “CV coming soon” placeholder.

Deal statistics are reserved for the CV only; the website has no option to display them.

## Assets and verification

Demo thumbnails are real Playwright captures at 1280 × 800. The architecture thumbnail is the unchanged original public repository diagram; see `docs/asset-provenance.json`. Earlier supplied font licences are retained, although those fonts are no longer used.

The supplied local briefs are excluded from publication. Design concepts, browser screenshots and verification results are in `docs`. Public sharing graphics use the site's actual Inter font.
