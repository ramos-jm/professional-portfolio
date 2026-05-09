# Agent Instructions — Personalization & GitHub Pages

Purpose
- This document lists all user-facing text, metadata, config values, and files an automation agent should replace to personalize the portfolio and prepare it for GitHub Pages. It includes exact locations, suggested placeholders, verification steps, and commands to run.

How to use
- Provide a JSON object of replacement values (see `MACHINE_MAPPING` below). Run a search-and-replace per mapping. After replacements, run install + build and verify `docs/` output before committing.

Files to update (high priority)
- [src/routes/__root.tsx](src/routes/__root.tsx): site meta (title, description, author, og tags, twitter card)
- [src/routes/index.tsx](src/routes/index.tsx): hero name, tagline, CTAs, ticker items, CV link
- [src/routes/about.tsx](src/routes/about.tsx): about headline, intro paragraphs, timeline entries, principles
- [src/routes/contact.tsx](src/routes/contact.tsx): `channels` array (email, github, linkedin, x), contact overview, mailto uses
- [src/routes/work.tsx](src/routes/work.tsx): `projects` array (year, role, tag, title, copy, stack, metrics)
- [src/components/SiteNav.tsx](src/components/SiteNav.tsx): brand string, footer links, availability, location, copyright
- [index.html](index.html): `<title>` and root entry if needed
- [vite.config.ts](vite.config.ts): `base` (set to `./` or `/repo-name/`) and `build.outDir` (should be `docs`)
- [package.json](package.json): `name` and `scripts` (verify `build:docs`, `preview:docs` exist)

Common replacement placeholders (agent should map these to user-provided values)
- `{{FULL_NAME}}` — Display name (e.g., "John Michael Ramos")
- `{{META_TITLE}}`, `{{META_DESCRIPTION}}`, `{{META_AUTHOR}}`
- `{{HTML_TITLE}}` — `<title>` in `index.html`
- `{{EMAIL}}`, `{{GITHUB_URL}}`, `{{LINKEDIN_URL}}`, `{{X_URL}}`
- `{{CV_PATH}}` — `/cv.pdf` or external URL
- `{{LOCATION_DISPLAY}}`, `{{LAT_LON}}`
- `{{VITE_BASE}}` — `./` or `/repo-name/`
- `{{PROJECTS}}`, `{{TIMELINE_ENTRIES}}`, `{{PRINCIPLES}}`, `{{TICKER_ITEMS}}` — arrays of structured objects

Agent workflow (recommended)
1. Validate input JSON contains required keys listed in `MACHINE_MAPPING`.
2. Create a dry-run: for each mapping, search file and log matches (do not write).
3. If dry-run matches expected current values, run replacements (atomic per-file).
4. Run `npm ci` or `npm install` to install dependencies.
5. Run `npm run build:docs` and verify `docs/index.html` exists and bundles are present.
6. Run `npm run preview:docs` (optional) to locally preview build.
7. Commit changes and push branch; open a PR if desired.

Shell commands
```bash
npm install
npm run build:docs
npm run preview:docs

git add .
git commit -m "Personalize site and configure GitHub Pages"
git push origin main
```

Verification checklist (post-replacement)
- [ ] No remaining references to the placeholder values in source files.
- [ ] `docs/index.html` exists and loads with JS/CSS.
- [ ] Contact links in footer and `/contact` resolve to provided values.
- [ ] CV link (`{{CV_PATH}}`) resolves (file present or URL reachable).
- [ ] `vite.config.ts` `base` is correct for GitHub Pages URL.

Machine mapping (MACHINE_MAPPING)
- Use this JSON to drive the agent. Each entry: file (relative), matchType (`jsonKey`, `regex`, `literal`), match (key or regex), placeholder, required (bool).

```json
{
  "mappings": [
    { "file": "package.json", "matchType": "jsonKey", "match": "devDependencies.@lovable.dev/vite-tanstack-config", "action": "remove", "required": false },
    { "file": "package.json", "matchType": "jsonKey", "match": "scripts.build:docs", "action": "ensure", "value": "vite build", "required": true },
    { "file": "vite.config.ts", "matchType": "regex", "match": "base:\\s*['\"].*?['\"]", "placeholder": "{{VITE_BASE}}", "required": true },
    { "file": "vite.config.ts", "matchType": "regex", "match": "outDir:\\s*['\"]docs['\"]", "placeholder": "docs", "required": true },
    { "file": "src/routes/__root.tsx", "matchType": "regex", "match": "title:\\s*\\".*?\\"|description:\\s*\\".*?\\"|author:\\s*\\".*?\\"|property:\\s*\\"og:title\\"|property:\\s*\\"og:description\\"", "placeholder": "{{META_*}}", "required": true },
    { "file": "src/routes/index.tsx", "matchType": "regex", "match": "\"John Michael\"|\"Ramos\"|portfolio · v[0-9\\.]+|Download CV|/cv.pdf", "placeholders": ["{{FULL_NAME}}","{{SITE_VERSION}}","{{CV_PATH}}"], "required": true },
    { "file": "src/routes/contact.tsx", "matchType": "regex", "match": "hello@jmramos.dev|github.com/jmramos|in/jmramos|@jmramos_dev", "placeholders": ["{{EMAIL}}","{{GITHUB_URL}}","{{LINKEDIN_URL}}","{{X_URL}}"], "required": true },
    { "file": "src/routes/work.tsx", "matchType": "regex", "match": "const projects = ", "placeholder": "{{PROJECTS}}", "required": true },
    { "file": "src/routes/about.tsx", "matchType": "regex", "match": "timeline|principles|About — JM Ramos", "placeholder": "{{TIMELINE_ENTRIES}}", "required": true },
    { "file": "src/components/SiteNav.tsx", "matchType": "regex", "match": "jm.ramos|hello@jmramos.dev|MNL ·", "placeholders": ["{{NAV_BRAND}}","{{EMAIL}}","{{LOCATION_DISPLAY}}"], "required": true },
    { "file": "index.html", "matchType": "regex", "match": "<title>.*<\\/title>", "placeholder": "{{HTML_TITLE}}", "required": true }
  ]
}
```

Notes & edge cases
- The project uses TypeScript/JSX — replacements should preserve code formatting and types.
- Arrays (`projects`, `timeline`) are JavaScript data structures — replace them with valid JS literals.
- If `VITE_BASE` is set to a non-relative path (e.g., `/repo-name/`), ensure `assets` references use absolute paths.
- If the agent cannot run `npm` in the environment, produce the modified files and an instructions block for the human to run the build locally.

If you want, I can also produce a fully-expanded machine mapping file (JSON) with your specific values and apply the replacements automatically. Provide the values for the placeholders and I will apply them.
