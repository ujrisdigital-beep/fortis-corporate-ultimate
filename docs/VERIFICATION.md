# Verification and release status

Rebuild prepared 23 October 2026. Public website ONLY. No live website or DNS changed.

## Completed
- Dependency-free Node static production build succeeds (14 public pages, plus dedicated 404).
- Twelve Node test cases pass, including escaping, direct page output, native form markup, draft/published/archive transitions, draft-media exclusion, real PDF link output, unsupported media rejection, invalid/duplicate slug rejection, preview indexing behaviour, CMS schema/source mapping and internal link resolution.
- Syntax checks passed for public interaction script, editor loader and image preparation tool.
- Browser inspected desktop homepage and BSF project page.
- Browser inspected 390px mobile frame; mobile menu opened, Escape closed it, no horizontal overflow (375px content/375px scroll width).
- Disposable event/photo fixture: browser verified gallery lightbox, caption, Escape dismissal and focus return. Fixture removed before final build.
- Pinned Decap 3.16.3 bundle loaded from CDN and its GitHub login screen rendered with temporary repository configuration. No GitHub login was attempted. Temporary repository configuration removed.
- Logo resized to WebP; no external public fonts, trackers, AI calls, Firebase, custom server or database.
- Unconfigured editor displays clear setup instructions rather than pretending publishing works.
- Package contains source, deployment output and setup/editor instructions. No test fixture albums or sample PDFs are shipped.

## Requires your hosting/account connection
- Real GitHub repository binding, permissions and Netlify OAuth provider configuration.
- Authenticated CMS edit/upload/save/publish against YOUR repository.
- Netlify automatic rebuild and cross-device confirmation after CMS publication.
- Native Netlify Forms detection, receipt in dashboard and optional email notification.
- Netlify header application/HTTPS on hosted deployment (local preview does not reproduce Netlify routing/security headers).
- Domain switch, live redirects, sitemap/indexing and any traffic-based legacy URL mapping.
- Owner review of contact details, privacy notice and public content.

The site is ready for a Netlify PREVIEW upload. It is not claimed to have completed live CMS or contact-delivery acceptance testing. Do these checks before promoting it as fully operational.

## Deliberate simplifications
- No fabricated events or public documents: sections start with clear empty states.
- CMS uses simple form fields and visibility status; no multi-role approval workflow or rendered CMS preview.
- Image preparation is a separate small browser tool; it does not auto-upload. Uploaded images are capped at 2 MB and PDFs at 12 MB by the builder.
- Git commits/builds, not instant live database writes, publish content. Publish in batches to manage build use.
- Private source drafts are excluded from the new deployed output, but remain in Git history and visible to repository collaborators. Never store internal secrets or sensitive documents here.

## Modern redesign verification — 23 October 2026
- Desktop hero and 390px mobile frame visually reviewed; mobile content width and scroll width both 375px (no horizontal overflow). Menu opens and Escape closes it.
- Browser search for BSF returns six relevant public pages, headed by the pilot page. Native FAQ disclosure expands and displays the accurate pilot-preparation answer.
- Added regression coverage for JSON-LD parsing and script-injection escaping, exact CSP script hash, discovery-output draft exclusion, invalid calendar dates and lightweight file-size budgets. All 12 tests pass.
- Core assets remain below budgets: homepage 30KB, CSS 40KB, JavaScript 10KB, social image 250KB. These are file-size checks, not a Lighthouse or Core Web Vitals score.
- Ten corporate references documented in BENCHMARK_AND_DESIGN.md. Search setup and evidence limitations documented in SEO_AND_DISCOVERABILITY.md.
- Drag-and-drop output is intentionally noindex for preview. A custom-domain production repository build is required to enable indexing. Live CMS authentication, form delivery, domain and hosted header checks remain outstanding as listed above.

Social update: all six supplied profiles added to the shared footer and editable CMS settings. LinkedIn uses the company ID public path instead of the supplied admin dashboard; external LinkedIn content could not be verified from this environment.
