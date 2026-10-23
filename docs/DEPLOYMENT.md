# Deployment — follow in order

## 1. Quick preview on Netlify
1. Extract this ZIP.
2. Find `dist`. Open it: it contains `index.html`, project folders, assets, `_headers`, `_redirects`, and `admin`.
3. Upload the CONTENTS of `dist` to a NEW Netlify project. If Netlify accepts folder dragging, drag `dist` itself. If it accepts only ZIP upload, zip the contents of `dist` without an enclosing parent folder.
4. Open the resulting site URL and check the pages. Do not replace the current public website yet.
5. No Firebase or Gemini keys are needed. Do not use the internal operations site's Netlify project.

This quick preview is deliberately noindex. The CMS shows an honest setup screen until its GitHub repository is configured. Manual upload is sufficient to review the public design; Git deployment is required for automatic editorial publishing.

## 2. Connect the source for ongoing publishing
1. Create a PRIVATE GitHub repository dedicated to this public website, e.g. fortis-public-website. Keep branch `main`.
2. Upload the source files and folders from this package at repository root. Include `package.json`, `scripts`, `public`, `content`, `cms-schema.json`, `netlify.toml`, and `tests`. Do not upload the outer ZIP, `dist`, credentials, or the internal app.
3. Import the repository into a NEW Netlify project, or link the preview project to the repository using Netlify's supported repository setup.
4. Build command: `npm run build`. Publish directory: `dist`. Node: 22. No base directory unless you deliberately nest the project.
5. Set Netlify environment variable `CMS_REPOSITORY` to the exact `github-owner/repository-name` (not a URL). This is a public configuration value, not a token.
6. Redeploy. The editor config is generated from this value. Alternatively set `repository` in `content/config.json`.

## 3. Enable GitHub sign-in for the editor
This uses Netlify's documented OAuth provider service, NOT deprecated Git Gateway.
1. In GitHub: Settings → Developer settings → OAuth Apps → New OAuth App.
2. Name: Fortis Website Editor. Homepage: your deployed site's HTTPS URL.
3. Authorization callback URL: `https://api.netlify.com/auth/done`.
4. Generate a client secret. Store it ONLY in Netlify's OAuth provider setup. Do not add it to GitHub source, content/config.json, CMS_REPOSITORY, chat, screenshots or public files.
5. In Netlify: Project configuration → Security → OAuth → Authentication Providers → Install Provider → GitHub. Enter the Client ID and Client Secret and save.
6. Open YOUR deployed site's `/admin/` and sign in with the GitHub account owning the repository. Any additional editor needs push access to this repository.
7. Use one or two trusted editors. The direct GitHub backend does not implement a separate author/manager approval hierarchy; repository writers can change and publish content.
8. If you later move to a different Netlify project, configure its provider as well. If your repository organisation has OAuth restrictions, its owner must approve access.

The CMS runtime is pinned to Decap 3.16.3 from jsDelivr (per current official release documentation). An internet connection is needed for the editor. Public pages are independently static. Review/test the pin before future upgrades. Raw HTML editing and CMS preview rendering are disabled; public content is escaped plain text.

References:
- https://decapcms.org/docs/github-backend/
- https://decapcms.org/docs/releases/
- https://docs.netlify.com/manage/security/secure-access-to-sites/oauth-provider-tokens/

## 4. Enable and verify enquiries
1. In Netlify, enable Forms/form detection if disabled. Redeploy after enabling so Netlify detects the static `fortis-enquiry` form.
2. Verify it appears in the Netlify Forms dashboard.
3. Configure an email notification to the responsible Fortis inbox if wanted. Verify the receiving address is controlled by Fortis.
4. Submit one clearly labelled fictional test from the deployed contact page.
5. Verify the entry in the Netlify dashboard; separately verify email notifications. The dashboard is the source of truth. An email address on a web page does not configure delivery.
6. Check the honeypot/spam controls and monitor spam. Do not collect confidential information through this public form.
7. Agree a responsible person, enquiry-retention period and deletion routine. Amend the privacy notice to reflect actual operations before collecting real enquiries.

No contact or newsletter API is included. No false receipt is generated locally. The native POST is handled by Netlify. Enabling Forms, usage quotas and any charges remain your account's responsibility. If Forms cannot be enabled, remove the form and use the existing email/WhatsApp links rather than pretending submissions work.

## 5. Before switching fortisinvicta.com
- Verify company contact details, scope, logo rights and all published statements.
- Add only approved, consented event photographs and genuine public PDF documents.
- Confirm the CMS publish test below, Forms receipt, mobile layout, image downloads and links.
- Set fortisinvicta.com as the primary domain in the intended Netlify project. Configure HTTPS using Netlify's instructions. Leave MX/email records untouched.
- The builder enables indexing only when Netlify CONTEXT is production and URL hostname is fortisinvicta.com. Preview/branch domains remain noindex. Keep the primary domain consistent, then rebuild after the domain change.
- Existing section hash links such as /#about and /#gallery are routed by the small website script. Selected legacy page paths redirect to their replacements. Map any additional valuable old paths after reviewing actual traffic.

## 6. Rollback and cost control
- Save the old website/deploy before switching. Use Netlify's previous deploy restore to roll back a release.
- Revert the relevant content commit in GitHub and rebuild to undo a content edit. Restore a removed PDF from Git history if needed.
- Reverting to an old deploy may make previously published files public again. Do not use rollback to remove sensitive material; explicitly remove affected files and check provider caching/history.
- Every CMS save commits a change and can trigger a build. Batch changes rather than publishing each photograph separately.
- Keep images under 2 MB (preferably a few hundred KB); PDFs under 12 MB. Use /admin/photo-prep.html before upload. Link videos to an external host; do not upload video files.
- Monitor Netlify hosting, build and Forms usage and Git repository size. This architecture has no paid custom database or always-on server, but provider quotas/pricing still apply.
