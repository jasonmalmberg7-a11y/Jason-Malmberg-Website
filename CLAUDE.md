# CLAUDE.md — Jason Malmberg Website

AI assistant guide for this repository. Read this before making any changes.

---

## Project Overview

A music-focused personal website for Jason Malmberg — bassist and bandleader — covering gigs,
releases, and projects. Design aesthetic: punk rock meets jazz, dark and moody with gold accents.

**Repository status:** Initial site built. Plain HTML/CSS/JS. No framework, no build step.

---

## Repository Structure

```
Jason-Malmberg-Website/
├── CLAUDE.md                    # This file
├── README.md                    # Project description
├── index.html                   # Homepage (hero, gigs, band cards, personal social)
├── this-house-has-lions.html    # This House Has Lions band page
├── nice-work.html               # Nice Work Jazz Ensemble band page
├── metro-jazz.html              # Metropolitan Jazz Orchestra band page
├── css/
│   └── style.css                # Full design system (CSS custom properties, all components)
└── js/
    ├── main.js                  # Core interactions: nav, scroll reveal, loader, utilities
    └── easter-eggs.js           # Hidden Easter eggs (Konami code, keyboard words, click tricks)
```

Update this file whenever the structure or conventions change significantly.

---

## Technology Stack

| Layer      | Choice                              | Notes                                          |
|------------|-------------------------------------|------------------------------------------------|
| Framework  | None — plain HTML5                  | Zero build step, easy to deploy anywhere       |
| Styling    | Vanilla CSS with custom properties  | `css/style.css` — single file, well-commented  |
| JavaScript | Vanilla ES2020 (`'use strict'`)     | No bundler, `defer` loaded                     |
| Fonts      | Google Fonts (Playfair Display, Bebas Neue, Inter) | Loaded via `<link>` in `<head>`  |
| Embeds     | Facebook Page Plugin (official SDK) | Instagram links out (no official embed API)    |
| Calendar   | Google Calendar iframe              | Placeholder in `index.html` and `metro-jazz.html` |
| Deployment | TBD — static file host (Vercel, Netlify, GitHub Pages, Cloudflare Pages) | |

### Fonts
- **Playfair Display** — serif, jazz elegance; used for quotes, taglines, body on band pages
- **Bebas Neue** — condensed display, punk boldness; used for large headings and the site name
- **Inter** — clean sans-serif; body text, nav, labels

### Color Palette (defined in `:root`)
| Variable         | Value     | Use                           |
|------------------|-----------|-------------------------------|
| `--bg`           | `#0a0a0a` | Page background               |
| `--gold`         | `#c9a227` | Primary accent (jazz)         |
| `--punk`         | `#e8003d` | Secondary accent (punk)       |
| `--text`         | `#f0ece0` | Body text                     |
| `--thhl-red`     | `#9b0000` | This House Has Lions accent   |
| `--nwje-blue`    | `#1c3d8c` | Nice Work Jazz Ensemble accent|
| `--mjo-purple`   | `#5c1f85` | Metropolitan Jazz Orchestra   |

---

## Development Workflows

### Opening the site locally

No server required — open any `.html` file directly in a browser.

For live reloading during development, use a simple static server:
```bash
# Python (built-in)
python3 -m http.server 8080

# Node.js (npx, no install)
npx serve .

# VS Code: Live Server extension
```

### Git branch conventions

- Active development branch: `claude/claude-md-mmgs0djiyw055inm-h984B`
- Default/main branch: `master`
- Feature branches: `feature/<short-description>`
- Always push with: `git push -u origin <branch-name>`

### Commit message style

Follow conventional commits:
```
feat: add gig listing page
fix: correct date formatting on releases
docs: update README with setup steps
chore: add .gitignore
content: update THHL album info
```

---

## Key Conventions

1. **Accessibility first** — semantic HTML (`<main>`, `<nav>`, `<section>`, `<article>`),
   ARIA labels on interactive elements, skip-nav link, `aria-live` on dynamic regions,
   `prefers-reduced-motion` respected in scroll animations.
2. **Mobile-first** — base styles are mobile; `@media (max-width: 768px)` handles responsive breakpoints.
3. **No unnecessary dependencies** — no npm, no bundler. Add external resources sparingly.
4. **Inline placeholders** — images and embeds use clearly-marked HTML comment instructions
   (`<!-- TO ADD YOUR PHOTO: ... -->`). Replace placeholders rather than restructuring.
5. **CSS custom properties** — all design tokens live in `:root` in `style.css`. Change the design there.
6. **`'use strict'`** — both JS files use strict mode. Keep it.

---

## Site Sections

### Homepage (`index.html`)
- **Hero** — full-screen, bass player photo placeholder, CTA buttons
- **Gigs** — Google Calendar iframe embed (placeholder; replace `src` with real calendar URL)
- **Mingus quote** — decorative quote block, double-clickable to cycle quotes (Easter egg)
- **Projects** — cards for the three bands
- **Personal social** — Instagram (grid placeholder → link out) + Facebook Page Plugin embed

### This House Has Lions (`this-house-has-lions.html`)
- Hero, links bar (Bandcamp · Instagram · Facebook)
- About section
- Albums: debut album + upcoming album (both with Bandcamp embed placeholders)
- Social: Instagram grid + Facebook Page Plugin
- Photo gallery (placeholder grid)
- Roland Kirk quote

### Nice Work Jazz Ensemble (`nice-work.html`)
- Hero, links bar (niceworkjazz.com · Facebook)
- About section
- Official site feature card → niceworkjazz.com
- Facebook Page Plugin embed
- Photo gallery
- Jaco Pastorius quote

### Metropolitan Jazz Orchestra (`metro-jazz.html`)
- Hero, links bar (Facebook · Calendar)
- About section with stat row (18+ musicians, 5 sections, 1 groove)
- Calendar embed placeholder (MJO calendar)
- Facebook Page Plugin embed
- Photo gallery
- Mingus quote

---

## Easter Eggs

All Easter eggs live in `js/easter-eggs.js`. They reference Jason's musical influences:

| Trigger              | Effect                                      | Influence           |
|----------------------|---------------------------------------------|---------------------|
| Konami code (↑↑↓↓←→←→BA) | Opens Punk Jazz Mode overlay           | General             |
| Click logo ×3        | Dee Dee count-in: "1! 2! 3! 4!"            | Dee Dee Ramone      |
| Type `MINGUS`        | Quote flash + body colour pulse             | Charles Mingus      |
| Type `JACO`          | Quote flash                                 | Jaco Pastorius      |
| Type `FUGAZI`        | Quote flash (Joe Lally)                     | Joe Lally / Fugazi  |
| Type `RAMONE`        | Count-in + quote flash                      | Dee Dee Ramone      |
| Type `ROLAND`        | Quote flash (Roland Kirk)                   | Roland Kirk         |
| Double-click quote block | Cycles through influence quotes        | All                 |
| Hover/focus `.secret-link` in footer | Reveals hidden message      | Joe Lally           |
| Open DevTools console| ASCII art + influence list + Konami hint    | All                 |

---

## Content Update Guide (for non-developers)

### Adding a photo
1. Add the image file to an `images/` folder (create if needed).
2. In the relevant `.html` file, find the `<!-- TO ADD YOUR PHOTO: -->` comment.
3. Follow the example `<img>` tag shown in the comment.
4. Remove the placeholder `<div>` and the `no-image` / placeholder class.

### Updating Google Calendar
1. Open Google Calendar → Settings → [Your Calendar] → "Integrate calendar".
2. Copy the embed URL from "Embed code".
3. In `index.html`, find the `<!-- GOOGLE CALENDAR EMBED -->` comment and replace the
   commented-out `<iframe>` block (uncomment it and update the `src`).

### Adding a Bandcamp embed
1. Go to the album on Bandcamp → Share/Embed → copy the iframe code.
2. In `this-house-has-lions.html`, find the `<!-- Bandcamp embed -->` comment
   and paste the iframe code, replacing the placeholder `<div>`.

### Updating album titles/years
Search for `[Album Title]` or `[Release Year]` in `this-house-has-lions.html` and replace.

---

## AI Assistant Instructions

- **Stack is decided** — plain HTML/CSS/JS. Do not introduce a framework or bundler.
- **Read before editing** — always read a file before modifying it.
- **Accessibility is mandatory** — every interactive element needs a label; images need alt text.
- **Placeholders use HTML comments** — instructions for replacing content are in the comments.
  Keep the comment style consistent when adding new placeholder sections.
- **One CSS file** — add new styles to `css/style.css`. Do not create additional CSS files
  unless there is a strong reason (e.g., a major new section with 200+ lines of unique styles).
- **Keep Easter eggs** — do not remove the Easter egg code. It's a feature, not clutter.
- **Small, focused commits** — one logical change per commit.
- **Keep this file updated** — update CLAUDE.md after structural changes, new pages, or
  significant convention changes.

---

## Remote & CI

- **Remote:** `http://local_proxy@127.0.0.1:31183/git/jasonmalmberg7-a11y/Jason-Malmberg-Website`
- **CI/CD:** Not yet configured. The site is static; any static host will work without a build step.

---

*Last updated: 2026-03-07. Update this file as the project evolves.*
