# Fortis Invicta — public website

A simple, dependency-free static website for fortisinvicta.com. Separate from the internal operations ecosystem.

## Start here
- For a quick visual deployment: upload the CONTENTS of the included `dist` folder to Netlify. `index.html` must be at the upload root. No compilation or environment keys are required to browse the website.
- For ongoing editing: connect the SOURCE to a private GitHub repository and deploy that repository through Netlify. A drag-and-drop-only deployment cannot publish CMS changes automatically.
- Read `docs/DEPLOYMENT.md` for the one-time CMS authentication setup and Netlify Forms checks.
- Read `docs/EDITOR_GUIDE.md` for day-to-day updates.
- See `docs/VERIFICATION.md` for tested behaviour and the remaining account-specific checks.

## Commands (Node 22 or newer)
```
npm run build
npm test
npm run dev
```
No npm install is needed: there are no application/build dependencies. The separate Decap editor loads its pinned browser bundle from the official npm CDN. The public website does not depend on that bundle.

## Files
- `content/site.json`: homepage/company/contact text.
- `content/projects.json`: projects, status and next milestones.
- `content/events.json`: news, events and photo albums.
- `content/documents.json`: approved public PDF records.
- `content/config.json`: GitHub repository, branch and primary site URL (no secrets).
- `cms-schema.json`: form layout for the content editor.
- `public/uploads/`: original approved editorial media. Only referenced published files enter the build.
- `public/assets/`: website styles, small interaction script and supplied logo.
- `scripts/build.mjs`: static page generation, escaping and publication checks.
- `dist/`: generated, deployable output. Generated files are not the editing source.

## Publishing and privacy
Content marked `draft` or `archived` is excluded from generated pages. Unreferenced editorial uploads are also excluded. Repository collaborators can still read ALL source content and uploaded files, including drafts: keep the repository private and never put sensitive internal documents in it. Published files are public and downloadable.

This is a public website, not a document vault, CRM, staff portal or security-certified application. No Firebase project, shared administrator password, private key, custom API or database is required.

## Provenance
Rebuilt from the supplied `fortis-invicta-ltd.zip` and your supplied Fortis 3D logo. The original upload is unchanged. Existing sector intent and public contact details were retained; custom Express administration, local-file persistence, simulated inbox, sample PDFs, unsupported metrics and unrelated features were removed. The supplied logo has been resized/encoded without redesigning it.

## Modern public website edition
The redesign adds original sector illustrations, a responsive editorial homepage, local search, editable FAQs, public company facts, social cards, RSS and structured metadata without extra runtime dependencies. See docs/BENCHMARK_AND_DESIGN.md and docs/SEO_AND_DISCOVERABILITY.md for decisions, references and indexing setup. The public site remains separate from the internal operations app.
