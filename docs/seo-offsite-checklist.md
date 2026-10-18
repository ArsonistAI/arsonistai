# Off-site SEO checklist

Work that only Jon can do, because it needs account access or outreach. Tick items off as they are done.

**Stealth rule:** everything here runs under the ArsonistAI brand, never under Jon's own name, while the day job stands. No posts or reshares from a personal LinkedIn profile, no personal bylines on guest posts, and no personal GitHub or forum accounts. Private one-to-one messages are fine.

## 1. Google Search Console

- [ ] Add the property for `https://arsonistai.com` (Domain property via DNS is best; URL-prefix with the HTML tag also works).
- [ ] For the HTML tag method, set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel to the tag's `content` value and redeploy. The tag is emitted from `src/app/layout.tsx`.
- [ ] Submit `https://arsonistai.com/sitemap.xml`.
- [ ] Use URL Inspection and "Request indexing" for: `/en`, `/en/services`, the three new articles, and the four newest service pages (chatbot audit, voice agent design, AI workflow automation, LLM cost optimization).
- [ ] Open Pages > Not indexed and check for 404s on retired URLs (old Product Design and Moneyball ATS links should now redirect).
- [ ] Check Enhancements for FAQ, Breadcrumb, and Video errors.

## 2. Bing Webmaster Tools

- [ ] Sign in at https://www.bing.com/webmasters and choose "Import from Google Search Console". This copies the verified site and the sitemap.
- [ ] If importing fails, set `NEXT_PUBLIC_BING_SITE_VERIFICATION` in Vercel and verify with the meta tag.
- [ ] Bing's index feeds Copilot and other AI search tools, so this matters for AI answers as well as for Bing itself.
- [ ] Turn on IndexNow, which is available in Bing Webmaster Tools, so new posts get picked up quickly.

## 3. Google Business Profile

- [ ] Create a profile as a service-area business with no public address.
- [ ] Primary category: "Business management consultant" or "Software company", whichever fits better at setup time. Add "Computer consultant" as a secondary category.
- [ ] Add each service from the site, with the same names and a one-line description.
- [ ] Link to `https://arsonistai.com/en` and use `hello@arsonistai.com`.
- [ ] Post each new article as an update.

## 4. Directories and listings

- [ ] Clutch (clutch.co): create the company profile and ask two or three past clients for reviews. Clutch profiles rank well for "AI integration company" searches.
- [ ] GoodFirms: company profile under Artificial Intelligence.
- [ ] DesignRush: listing under AI companies.
- [ ] MCP server registries and directories: list any public or demo MCP server with a link back to the service page.
- [ ] Anthropic, Cursor, or n8n partner and expert directories: apply where ArsonistAI qualifies.
- [ ] Keep the company name, description, and URL identical on every listing.

## 5. Backlinks

- [ ] Ask each case study client (Reductivist, Hello CIT) privately whether they can link to their case study page or credit ArsonistAI in the site footer.
- [ ] Publish an open-source MCP server or test harness on GitHub with a README link to `/services/custom-mcp-servers`.
- [ ] Publish GitHub work under an ArsonistAI organization account, not a personal one.
- [ ] Pitch guest posts credited to "ArsonistAI" on a topic from `docs/content-plan.md`. Skip podcasts until a public face is possible.
- [ ] Answer two or three relevant questions a month on Reddit or community forums (n8n, Cursor, Claude) from a brand account, linking to an article only where it actually answers the question.

## 6. LinkedIn

- [ ] For each new article, write a LinkedIn post for the ArsonistAI company page that summarizes the key point and links to the article. Follow the `src/content/linkedin-*.md` pattern.
- [ ] Post from the company page only. Do not like, comment on, or reshare it from a personal profile, since that shows up in your network's feed.

## 7. Measurement (monthly)

- [ ] Export Search Console Performance data filtered to `/services/` and `/insights/` pages: impressions, clicks, average position.
- [ ] Note which queries each new article ranks for, and update `docs/content-plan.md` if a query outperforms the planned one.
- [ ] Check that `site:arsonistai.com` in Google shows the current titles, not the old design-firm ones.
- [ ] Re-test the homepage and one service page in PageSpeed Insights after each major deploy.
