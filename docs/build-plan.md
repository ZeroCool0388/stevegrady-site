# V2 build plan

Replace the first implementation with a static personal CV. Keep the existing repository, history, font licences, deployment project and URL. Build on `v2-rebuild` and use Steve's supplied author and committer identity.

1. Establish a centred navy two-column desktop layout: sticky profile and navigation, scrolling content. Use Inter throughout with one Instrument Serif italic line.
2. Insert the supplied copy exactly. Following Steve's decision, reserve deal statistics for the CV only. Create four experience cards and four project cards, with independent repository links.
3. Capture the three real demos at 1280 × 800. Download the original architecture diagram. Produce metadata, monogram icons, a sharing image and a one-page CV placeholder.
4. Add IntersectionObserver navigation, restrained Motion reveals, Lenis scrolling, fine-pointer social effects and a desktop spotlight. Honour touch and reduced-motion settings.
5. Validate responsive layouts, keyboard use, copy, links, accessibility, static routes, lint, types and build. Review rendered screenshots against the concepts and brief.
6. Merge into main, verify Git identity and publication scans, deploy through the existing Git integration, and run live browser checks and Lighthouse.

## Design decisions

The three visual concepts in `docs/design` establish the spacing, typography and subdued hover treatment. The written brief takes precedence over incidental generated details: actual 120px thumbnails, exact copy, no extra footer copy or location icon.

Use #8b9bb3 for small muted text rather than slate-500, which does not meet AA on the prescribed background. All other primary colours follow the brief. Dim neighbouring cards gently enough to retain AA contrast.
