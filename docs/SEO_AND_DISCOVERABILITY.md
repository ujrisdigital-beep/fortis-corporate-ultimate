# Search and AI discoverability

Implemented: static readable HTML, unique titles/descriptions, primary-domain canonicals, internal links and breadcrumbs, social cards, sitemap with source review dates, RSS for published updates, local site search, visible FAQs, human-readable company facts and a public JSON facts file. Organization, WebSite, WebPage, BreadcrumbList, Article, DigitalDocument and FAQPage data are emitted where applicable. Structured data describes visible content; it does not assert unconfirmed project results.

`llms.txt` is an optional navigation aid, not a ranking requirement. OAI-SearchBot is explicitly allowed on public production content; the GPTBot training policy is not changed. No special AI integration, paid AI service or API key is required.

## Important hosting behaviour

Indexing is enabled only when the Netlify build context is production and the configured deployment hostname is fortisinvicta.com or www.fortisinvicta.com. Local builds and Netlify preview-hostname builds remain noindex. **The drag-and-drop ZIP is a preview build.** For a launch with indexing enabled, connect the repository and set the primary custom domain, then trigger a production build. Confirm robots, meta robots and sitemap on that final domain before submitting it to search engines. Canonicals always point to the primary site URL in content/config.json.

Search itself, admin and confirmation pages are not discovery landing pages. Drafts, archived content and unused uploads are excluded from new deployed output, including feeds and search indexes. This does not erase old Git history or prior deployment artifacts.

## After deployment

1. Verify domain ownership in Google Search Console and Bing Webmaster Tools; submit /sitemap.xml.
2. Inspect the homepage and a project page using URL inspection. Check the actual hosted robots.txt and rendered HTML.
3. Validate schema using Google's Rich Results Test and Schema.org's validator. Valid markup does not guarantee rich results; FAQ rich-result eligibility is restricted and is not promised for Fortis.
4. Run PageSpeed Insights on mobile and desktop. No Lighthouse score or Core Web Vitals result is claimed from this local build.
5. Publish useful original field notes, labelled photographs, dated project progress and approved documents. Update review dates only after substantive review.
6. Monitor indexing, genuine enquiries and referral traffic. Search and AI citations cannot be guaranteed.

## Primary references

- Google Search Central, AI features and your website: https://developers.google.com/search/docs/appearance/ai-features — ordinary SEO practices apply; no special AI schema or new machine-readable file is required.
- Google Search Central, structured data introduction: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data — markup helps interpretation and eligibility, not guaranteed appearance.
- OpenAI crawler documentation: https://developers.openai.com/api/docs/bots — OAI-SearchBot search discovery is separate from GPTBot training controls.

Reviewed 23 October 2026.
