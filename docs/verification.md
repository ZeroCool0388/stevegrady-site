# V2 verification

## Result

The original application has been replaced by a fresh static CV implementation. The repository, Git history, retained font licences and existing deployment project are preserved.

## Checks

- ESLint, strict TypeScript and Next production static export pass.
- Independent comparison with section 4 of the supplied brief verifies the exact About paragraphs and every supplied role/project string.
- Browser checks cover 1440, 1024, 768, 390 and 360px: no horizontal overflow, correct copy, four roles, four projects, no email link, hidden optional statistic, accessible landmarks and focus indicators.
- Desktop IntersectionObserver navigation selects the visible section. Experience hover highlights the whole card and dims its neighbours. Cards are not misleading links.
- On mobile the name/title header becomes compact and stays at the top; section labels stick underneath. Desktop and touch fallbacks follow the requested breakpoints.
- Reduced motion disables Lenis, reveals, tracking and magnetic effects. The desktop spotlight remains visible and static. Content also remains visible without JavaScript.
- Browser accessibility analysis reports zero WCAG A/AA violations. The keyboard reaches every visible link in logical order, with visible focus. The skip link focuses main.
- CV PDF, sharing image, icons, sitemap, robots and custom 404 routes work. The PDF contains one page with “CV coming soon”.
- All three captures are 1280 × 800 WebP. The original public diagram is unchanged; its SHA-256 is in `asset-provenance.json`.

## Screenshots

Desktop, 1440 × 1000:

- `docs/screenshots/desktop-top.png`
- `docs/screenshots/desktop-experience.png` — first card hovered
- `docs/screenshots/desktop-work.png`

Mobile, 390 × 844:

- `docs/screenshots/mobile-top.png`
- `docs/screenshots/mobile-experience.png`
- `docs/screenshots/mobile-work.png`

Rendered screenshots were reviewed against the three concepts and the written brief. The navy palette, restrained typography, profile/content balance and subtle card states match the direction. The written brief overrides incidental generated content: no invented text or assets, 120px actual thumbnails, and the exact footer. This is a faithful implementation of the brief rather than a pixel copy of a generated concept.

## Scan output and necessary exceptions

`publication-scan.json` lists every literal substring match by path and line. There are zero prohibited-content matches and zero banned-phrase matches.

A strictly literal zero-match result is incompatible with the required demo/repository URLs and some unchanged package metadata. The approved project slug contains one specified credential-prefix fragment; two SHA-512 integrity values contain a coincidental three-letter fragment; one standard npm package URL contains the same prefix fragment. None is a credential or prohibited site content. They have been retained because altering required links or package checksums would break the brief or dependency verification.

Local user-supplied briefs contain the prohibited words as instructions. They are preserved on Steve's Mac and excluded from Git and Vercel publication. Ignored build caches are also excluded from the publishable-file scan. Git history remains intact as required. Shipped images were visually checked for prohibited content.

## Deviations and limits

- Small muted text uses #8b9bb3 instead of slate-500 to meet AA. Body, headings and teal use the prescribed colours. Gentle dimming preserves contrast.
- The supplied current inspiration source-code URL returned 404. The live site and available older v4 source were studied; no reference content or assets were copied.
- The original architecture PNG is shipped unchanged, even though it is larger than necessary for a 120px thumbnail. It loads lazily.
- Local checks use Chromium and automated accessibility analysis; they are not an exhaustive assistive-technology or cross-browser audit.

## Steve's remaining choices

Replace the one-page CV placeholder. Decide whether to enable `SHOW_DEAL_STAT`; it currently remains false.
