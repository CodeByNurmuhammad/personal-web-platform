# Copilot Implementation Brief: Personal Website Frontend

## 1. Project Goal

Build a polished, responsive, frontend-only personal website that
presents the owner's learning journey, writing, software projects,
creative interests, and professional profile.

The website is an initial static prototype. It should be quick to build,
easy to understand, easy to publish, and structured so it can evolve in
later phases. The owner may add a backend, React, Node.js, richer
interactions, or a private workspace after the first version is
complete. Do not implement those future systems now.

**Site identity** - Brand/name: Nurmuhammad Abdujalilov -
Role: Software Engineering Student - Location: South Korea -
Interests: Artificial Intelligence, Software Engineering, Web Development,
Algorithms, and Technology.

Keep these values easy to replace. Do not invent a permanent brand name,
biography, achievements, credentials, or personal facts.

## 2. Non-Negotiable Constraints

-   Use HTML5 and CSS3 for the application structure and styling.
-   Use Bootstrap 5.3 for responsive layout and standard components,
    with custom CSS for the site's distinctive visual design.
-   Do not use Tailwind. Do not combine Bootstrap and Tailwind.
-   Use only small amounts of vanilla JavaScript for interactions such
    as the mobile menu and light/night theme toggle.
-   Do not use React, Vue, Angular, TypeScript, Node-based frontend
    frameworks, or a build step in this phase.
-   Do not create PHP files or write PHP code.
-   Do not implement a backend, database, API, authentication,
    server-side form processing, or real integrations.
-   Do not add private dashboard, calendar, finance, file-manager, or
    admin pages in this phase. These are possible later-phase work.
-   Use static content directly in HTML. Do not fetch content from an
    external data source.
-   Do not invent real personal information, project achievements, job
    experience, qualifications, social profile URLs, or
    article claims. Use clearly labeled placeholders where information
    is missing.
-   Do not create controls that appear functional but do nothing. Either
    implement a simple frontend behavior or clearly identify the control
    as a placeholder/demo.
-   Keep the project easy to preview locally by opening the HTML files
    in a browser, with no build process required.
-   Avoid unnecessary dependencies. Bootstrap may be included through
    its official CDN and documented in the README.
-   Inspect the current repository before changing it. Preserve useful
    existing work and do not overwrite or delete files without
    explaining the proposed changes first.
-   Work incrementally. Do not generate the entire website as one giant
    file or make a large, unexplained set of changes.

## 3. Brand and Visual Direction

### Overall style

Create a minimal, editorial personal website. The visual identity should
feel considered, calm, professional, and personal rather than like a
generic template or admin dashboard.

-   Default background: white or near-white.
-   Main text: dark charcoal or navy.
-   Accent: restrained blue or another easily editable neutral accent.
-   Use generous whitespace, a readable content width, clear typographic
    hierarchy, and consistent spacing.
-   Prefer thin borders and subtle surface contrasts over heavy shadows.
-   Keep article text comfortable to read, with a sensible line length
    and line height.
-   Use a consistent spacing scale, border radii, typography scale, and
    color tokens.
-   Avoid excessive gradients, glassmorphism, flashy effects, large
    animated decorations, and unnecessary visual clutter.
-   Use responsive layouts rather than fixed-width designs.
-   The website should feel like a personal editorial site first, with
    projects and professional information integrated naturally.

### Light and night themes

-   Light mode is the default.
-   Provide a visible theme toggle in the shared header.
-   Implement both themes consistently across every page, including
    cards, borders, links, forms, code blocks, navigation, and footer.
-   Use CSS custom properties/design tokens for theme colors so they can
    be changed centrally.
-   Use a small vanilla JavaScript function to toggle a theme class or
    attribute.
-   If straightforward without adding complexity, remember the selected
    theme with `localStorage`; otherwise, a session-only toggle is
    acceptable.
-   The toggle must have an accessible label and visible keyboard focus
    state.
-   Ensure readable contrast in both themes.

### Interactions

Implement only small, useful interactions in this phase: - Responsive
mobile navigation toggle. - Light/night theme toggle. - Subtle hover and
focus states for navigation links, buttons, article cards, project
cards, and social links. - Clear active navigation state for the current
page. - Ordinary local navigation between pages.

Do not add complex animations or interactive scenes now. Distinctive
playful animations can be considered after the basic site is complete
and the owner has more frontend experience.

## 4. Site Architecture and Pages

Build these six core public pages:

1.  `index.html` --- Home
2.  `blog.html` --- Blog listing
3.  `projects.html` --- Projects portfolio
4.  `about.html` --- About Me
5.  `cv.html` --- CV / professional profile

Also create `article.html` as a reusable example article page/template.
Treat this as a shared content template rather than an additional main
navigation category. Initially, it can demonstrate one sample article.
Later, the owner may create separate HTML files for individual articles
using the same design patterns.

Use consistent navigation, footer, theme behavior, and design tokens
across all pages. Because this is plain HTML, repeat shared markup
consistently rather than introducing a templating engine.

### 4.1 `index.html` --- Home

Purpose: Give visitors a quick, clear understanding of who the owner is
and what they make, learn, write about, and experience.

Include: - Shared header with editable brand text/logo and navigation
links to Home, Blog, Projects, About Me, and CV. - Theme toggle
and responsive mobile navigation. - Minimal hero section with a short
introduction, a role/interests line, and one or two clear links such as
"Read the Blog" and "Explore Projects." - Optional portrait placeholder
only if appropriate; do not invent or fetch a real portrait of the
owner. - A small featured/recent writing section. - A selected projects
section. - A concise About Me preview. - Social links for GitHub,
Instagram, and LinkedIn using
clearly marked placeholders until the owner provides real URLs. - Shared
footer with navigation and social links.

Keep the homepage concise. Do not duplicate the full contents of every
other page.

### 4.2 `blog.html` --- Blog Listing

Purpose: Present articles, reflections, learning notes, and experiences
in a readable editorial format.

Include: - Page title and a short editable description. - A clean list
or grid of article cards. - Each card may include category, title, short
excerpt, date, estimated reading time, and an optional thumbnail or
neutral placeholder. - A clear link from each example card to
`article.html`. - Optional category labels such as Learning, Software,
University, Projects, or Personal Reflections. Treat these as examples
that the owner can edit. - If a search field or category filter is
included, implement simple client-side behavior or clearly label it as a
visual prototype. Do not make it appear operational if it is not. - Use
placeholder article content and dates where real content has not been
supplied.

### 4.3 `article.html` --- Reusable Article Template

Purpose: Establish a consistent format for individual articles.

Include: - Article title, category, author placeholder, publication date
placeholder, and estimated reading time. - Optional featured image with
useful alt text or a neutral placeholder. - Readable article content
with semantic headings, paragraphs, lists, links, inline code, and code
blocks where relevant. - Comfortable line length and line height. -
Optional table of contents if it can be implemented simply and
accessibly. - Link back to the blog listing. - Optional related-article
links and social sharing links, using only valid destinations. - Clear
placeholder content, not invented claims about the owner's life or work.

Do not write application PHP code. Technical examples may use harmless
illustrative snippets only when useful to demonstrate article styling.

For the initial version, one `article.html` template/example is enough.
Keep its layout easy to copy into a separately named HTML file when the
owner later publishes an individual article. Document this workflow in
the README. Do not create a complex JavaScript article engine or content
management system.

### 4.4 `projects.html` --- Projects Portfolio

Purpose: Showcase software projects, university work, experiments, and
case studies.

Include: - Page title and short introduction. - Project cards with
title, summary, technology tags, status, and repository/demo links where
known. - A featured project or case-study area. - Use clear placeholders
for unknown project details. - Never invent accomplishments, production
usage, metrics, repository URLs, or live demos. - A link should only
point to a real supplied destination. Otherwise label it as a
placeholder or omit it. - Make it easy to add, remove, or update
projects without changing the overall design.

### 4.5 `about.html` --- About Me

Purpose: Explain the owner's background, interests, and ongoing learning
journey in a personal but well-organized way.

Include: - Introduction/biography section with editable placeholder
text. - Learning journey and areas of interest. - Education section with
placeholders for unknown details. - Skills or current learning topics,
clearly editable. - Optional timeline for milestones, only populated
with supplied or explicitly labeled sample information. - Links to
projects, blog, CV, and social profiles.

Do not invent personal facts, awards, credentials, employment history,
or achievements. Make all personal details easy to edit.

### 4.7 `cv.html` --- CV / Professional Profile

Purpose: Present a concise professional profile separately from the more
personal About Me page.

Include: - Name placeholder and professional summary placeholder. -
Education section. - Technical skills section. - Projects section with
links to the project portfolio. - Experience and certifications sections
only as placeholders unless real information is provided. -
Contact/social links using placeholders until supplied. - A CV download
button only if a real local PDF is available. If no PDF exists, show a
clearly labeled placeholder state rather than a broken download. - A
print-friendly layout may be added if it is straightforward.

Do not invent qualifications, dates, grades, work experience,
certifications, or achievements.

## 5. Shared Navigation and Social Links

Use the same navigation structure across the public pages: - Home -
Blog - Projects - About Me - CV

Requirements: - Highlight the current page. - Use working local links
for all pages that exist. - Collapse navigation on smaller screens using
an accessible mobile menu. - Include the theme toggle in a consistent
location. - Add GitHub, Instagram, and LinkedIn links in the header or
footer as appropriate. - Until the owner provides URLs, use clearly
marked placeholders and do not invent URLs. A placeholder must not
pretend to be a working profile link. It may be rendered as
non-clickable text or be omitted from the active-link list until
configured. - Do not add a separate Contact page. Social links are
sufficient for this phase.

## 6. Suggested Project Structure

Use this structure unless the existing repository already has a sensible
layout:

``` text
personal-website/
├── index.html
├── blog.html
├── article.html
├── projects.html
├── about.html
├── cv.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       └── README.md
├── README.md
└── .gitignore
```

Notes: - Keep filenames lowercase and descriptive. - Put shared styling
in `assets/css/styles.css`. - Put small interactions in
`assets/js/main.js`. - Use `assets/images/` for local assets. - If
JavaScript is unnecessary for a page, do not add page-specific scripts
just for the sake of it. - Do not create unnecessary folders or
dependencies. - Do not overwrite an existing repository structure before
inspecting it.

## 7. Bootstrap and Dependency Rules

-   Use Bootstrap 5.3 through its official CDN unless the repository
    already has a suitable setup.
-   Add custom CSS to establish the site's own identity; do not leave
    the site looking like an unmodified Bootstrap example.
-   Do not include Tailwind.
-   Do not add a charting library, icon framework, animation library, or
    other dependency unless it is genuinely necessary.
-   If using Bootstrap Icons or another optional dependency, explain why
    and document it in the README. Prefer simple inline SVG or CSS for a
    small number of icons if appropriate.
-   Keep the website static and build-tool-free.

## 8. Responsive Behavior

Support mobile, tablet, laptop, and desktop screen widths.

-   No horizontal overflow at 320px wide.
-   The header/navigation must remain usable on small screens.
-   Article content must remain comfortable to read on mobile.
-   Cards should stack on small screens and use additional columns only
    when space permits.
-   Images must scale within their containers without distortion.
-   Buttons and controls must have usable touch targets.
-   CV sections and timelines must adapt to narrow layouts.
-   The footer must remain organized and readable on mobile.
-   Test both light and night themes at mobile and desktop sizes.

## 9. Accessibility and Quality Requirements

-   Use semantic HTML elements such as `header`, `nav`, `main`,
    `article`, `section`, and `footer`.
-   Include a skip-to-content link.
-   Give every page a meaningful, unique title and meta description.
-   Associate visible labels with form controls if any forms are added.
-   Use useful alt text for meaningful images and empty alt text for
    decorative images.
-   Ensure keyboard navigation works.
-   Provide visible focus states.
-   Use links for navigation and buttons for actions.
-   Ensure accessible color contrast in both themes.
-   Give the theme toggle and mobile menu meaningful accessible names
    and state indicators where applicable.
-   Avoid broken image paths, invalid local links, and dead placeholder
    controls.
-   Keep the CSS organized using custom properties for colors, spacing,
    typography, borders, and other shared tokens.
-   Use consistent heading hierarchy.
-   Respect reduced-motion preferences if any transitions are included.

## 10. Content and Asset Guidance

-   Use editable placeholders for the brand name, tagline, biography,
    dates, profile links, and other missing personal details.
-   Do not invent the owner's personal history, credentials,
    accomplishments, projects, or social URLs.
-   Use clearly fictional sample titles and summaries when sample
    content is necessary to demonstrate layout.
-   Mark sample content in a way that is easy for the owner to identify
    and replace.
-   Prefer existing local images that are appropriate for the content.
-   Do not use broken image URLs.
-   Do not present unrelated stock imagery as the owner's own
    photography or portrait.
-   Avoid copyrighted logos or assets unless their use is authorized and
    appropriate.
-   Keep image file paths relative so the site can be published as a
    static website.

## 11. Future-Phase Boundaries

Do not implement the following in Phase 1: - Private
workspace/dashboard. - Calendar, finance tracker, file manager,
settings, or admin editor. - Backend or server-side rendering. -
Database or content management system. - Authentication or user
accounts. - Real contact form submission. - Google Calendar, Gmail, or
other third-party integrations. - React, Node.js, or a frontend build
system. - Complex animations or interactive environments.

The code should be reasonably organized for future development, but do
not over-engineer it or attempt to solve future architecture decisions
prematurely. A later phase may add a private dashboard, richer
animations, a backend, or a framework after the owner has reviewed and
learned from the static version.

## 12. GitHub and Static Hosting Readiness

-   Use relative links and asset paths that work when hosted as a static
    website in a repository subdirectory.
-   Avoid root-relative asset paths such as `/assets/...` if they would
    break on GitHub Pages project sites.
-   Do not rely on server-side routing or rewrite rules.
-   Explain how to preview the website locally and how it can be
    published through GitHub Pages.
-   Do not create or modify repository remotes, publish the site, or
    push commits without the owner's explicit instruction.
-   Do not expose private information, secrets, API keys, or personal
    data in the repository.

## 13. Incremental Implementation Sequence

Follow this sequence and report progress at each major stage.

### Stage 1 --- Inspect and plan

1.  Inspect the current repository and report its files, structure,
    existing design, and any useful assets.
2.  Identify files that would be created, modified, or preserved.
3.  Propose the implementation plan before making destructive changes.
4.  If the repository contains an existing website, preserve useful
    content and integrate carefully.

### Stage 2 --- Establish the design system

1.  Define CSS custom properties for colors, light/night themes,
    spacing, typography, borders, radii, and shadows.
2.  Establish the content container, responsive breakpoints, buttons,
    links, cards, section headings, and shared spacing rules.
3.  Create the shared header, mobile navigation, theme toggle, and
    footer patterns.

### Stage 3 --- Build the homepage

1.  Implement `index.html`.
2.  Confirm the visual direction, spacing, responsiveness, theme toggle,
    and navigation.
3.  Use placeholders for unknown personal details.

### Stage 4 --- Build the content pages

1.  Implement `blog.html` and the reusable `article.html` template.
2.  Implement `projects.html`.
3.  Implement `about.html` and `cv.html`.
5.  Keep shared visual patterns consistent and all local navigation
    links valid.

### Stage 5 --- Add and test interactions

1.  Implement the mobile navigation and light/night theme toggle.
2.  Add subtle hover and focus states.
3.  Implement any search/filter only if it can be done simply and
    honestly in the frontend.
4.  Ensure all buttons and links behave as described.

### Stage 6 --- Validate and document

1.  Check all local page links and asset paths.
2.  Test responsive behavior at mobile, tablet, and desktop widths,
    including 320px.
3.  Test the theme toggle on every page.
4.  Test keyboard navigation, focus visibility, semantic structure, and
    contrast.
5.  Check for obvious browser console errors and broken assets.
6.  Update `README.md` with project structure, technologies, local
    preview instructions, placeholder content notes, and GitHub Pages
    guidance.
7.  Summarize files created or modified, interactions implemented, tests
    performed, and known limitations.

Do not claim that a test was performed unless it was actually performed.

## 14. Definition of Done

The first frontend phase is complete when:

-   All five core public pages exist: Home, Blog, Projects, About Me,
    and CV.
-   The reusable `article.html` template exists and is linked from the
    blog listing.
-   Pages share a consistent header, footer, navigation, typography, and
    design system.
-   Light mode is the default and night mode works consistently across
    pages.
-   Mobile navigation works.
-   Local navigation and asset paths work.
-   The site is responsive and has no obvious horizontal overflow at
    320px.
-   Social links are placeholders until real URLs are supplied; no
    invented URLs are present.
-   Personal content is editable and no personal facts have been
    fabricated.
-   There is no PHP, backend, database, authentication, API integration,
    or private dashboard in Phase 1.
-   The site can be previewed locally without a build step.
-   The README explains the structure, how to preview the site, and how
    to publish it as a static site.
-   The final summary accurately states what was implemented, what was
    tested, and what remains incomplete.

## 15. Instructions for Copilot

Work incrementally and communicate clearly.

First inspect the repository and propose the file plan. Do not overwrite
or delete useful existing work without explaining the proposed changes.
Then implement the site in the sequence above, checking the result at
each major stage.

Prioritize a polished, minimal editorial design, readable content,
maintainable HTML/CSS, responsive behavior, and honest interactions over
unnecessary features. Keep the initial version small enough that the
owner can understand it and extend it.

At the end, provide: 1. A summary of files created and modified. 2. A
summary of interactions implemented. 3. The tests and viewport checks
actually performed. 4. Any placeholders that still need the owner's
information. 5. Known limitations and recommended next steps.

Do not implement future-phase functionality unless the owner explicitly
requests it.
