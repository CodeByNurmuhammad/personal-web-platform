# Personal Website Prototype

A build-free personal website prototype using semantic HTML5, Bootstrap 5.3
from the official CDN, custom CSS, and a small vanilla JavaScript file.

## Structure

- `index.html` — home page
- `blog.html` — article listing
- `article.html` — reusable sample article template
- `projects.html` — project portfolio
- `travel.html` — travel and photo stories
- `about.html` — personal background and learning journey
- `cv.html` — professional profile
- `assets/css/styles.css` — design tokens, themes, responsive components
- `assets/js/main.js` — mobile navigation and theme persistence
- `assets/images/` — location for authorized local images

## Preview locally

Open `index.html` directly in a browser, or serve this folder with any simple
static server. No build step or package installation is required. For example:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000/`. Relative links and assets are intentional
so the site also works from a GitHub Pages project subdirectory.

## Editing content

Replace `YOUR_NAME_OR_BRAND`, `YOUR_TAGLINE`, `YOUR_INTRODUCTION`, and the other
uppercase placeholders with information you want to publish. Replace the
fictional sample cards and article text with verified personal content.
Social profiles remain non-clickable placeholders until real URLs are supplied.
To publish another article, copy `article.html`, rename it, update its metadata
and content, then link it from `blog.html`.

Add authorized images to `assets/images/`, use relative paths, and write useful
alternative text. The CV page intentionally has no download link because no
local PDF was supplied; its print-friendly layout can be saved from the browser.

## GitHub Pages

Commit the static files to a repository and enable GitHub Pages for the chosen
branch and folder in repository settings. Do not use root-relative paths or
server-side routing. Confirm the six navigation pages and article template on
the published project-site URL.

## Phase 1 boundaries

This prototype has no backend, database, authentication, forms, APIs, private
dashboard, PHP, framework, or build system. The theme preference is stored in
`localStorage`; the mobile menu is a small client-side interaction.
