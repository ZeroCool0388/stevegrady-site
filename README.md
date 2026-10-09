# Steve Grady

A personal portfolio for Steve Grady, Senior Technical Solutions Consultant: AI-native solution design, integrations and pre-sales.

Built with Next.js App Router, strict TypeScript, Tailwind CSS, Motion and Lenis. The page is statically rendered; no backend, credentials, database, tracking or cookies are required.

Live: [stevegrady-site.vercel.app](https://stevegrady-site.vercel.app)

## Run locally

```sh
npm ci
npm run dev
```

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

## Content

Edit `src/config/site.ts` for the site URL, contact links, project details and hidden deal statistic. Replace the email placeholder to show an email action. Replace `public/cv/steve-grady-cv.pdf` with the final CV, then remove the coming-soon caption in `src/app/page.tsx`. Keep the deal statistic disabled until approved.

Fonts are original, unmodified WOFF2 files from Fontshare; licences are in `public/fonts/`. Project previews are captures of the public demos, not simulated interfaces.

Accessibility includes keyboard focus, skip link, semantic headings, touch fallbacks and reduced motion. All content remains readable with JavaScript disabled.

Build plan: `docs/build-plan.md`. Verification and final screenshots: `docs/verification.md` and `docs/screenshots/`.
