# Connect the public website and content editor

Repository: ujrisdigital-beep/fortis-corporate-ultimate
Production and CMS branch: public-website-decap
Netlify project: fortisinvictaltd
Build command: npm run build
Publish directory: dist
Base directory: empty
Node: 22

The main branch retains the former website. This branch contains the complete revamped public source. Do not use the internal ecosystem project or other unrelated repositories.

The repository and CMS branch are already configured in content/config.json. No CMS_REPOSITORY environment variable is required; remove any incorrect existing override. OAuth still needs connecting.

In GitHub, create an OAuth App under the appropriate account settings. Use the final HTTPS website homepage and callback https://api.netlify.com/auth/done. Enter the client ID and secret only into Netlify Project configuration > Security > OAuth > Authentication providers > GitHub. Never commit the secret.

Connect this repository and branch in Netlify. Keep the existing uploaded deploy available for rollback. Test the project URL before changing domain assignments. Hostinger DNS, email and solar subdomains need no change for repository linking.

Open /admin/ on the deployed site. Sign in with a GitHub account that has write access to this repository. Create a draft event with an approved image; check it remains absent from the public site, then publish and check the successful build and live page. Test a public PDF similarly. Authentication and end-to-end publication are not verified until these steps succeed.

This repository is public: draft source and uploads committed to GitHub are public even when excluded from the website. Store only material acceptable for public disclosure here. Use a private repository for confidential drafts.

A GitHub connection is distinct from Netlify OAuth and from Firebase. No internal app settings or credentials belong here.
