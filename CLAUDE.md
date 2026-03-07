# CLAUDE.md — Jason Malmberg Website

AI assistant guide for this repository. Read this before making any changes.

---

## Project Overview

A music-focused personal website for Jason Malmberg covering gigs, releases, and upcoming projects.

**Repository status:** Early scaffold — no framework or source code has been committed yet. The technology stack has not been finalized.

---

## Repository Structure (Current State)

```
Jason-Malmberg-Website/
├── CLAUDE.md          # This file
└── README.md          # Project description
```

Source code, configuration, and dependencies will be added as the project is built out. Update this file whenever the stack or structure changes significantly.

---

## Technology Stack

**Not yet decided.** When the stack is chosen, record it here. Common choices for a music portfolio site:

| Layer       | Options to consider                          |
|-------------|----------------------------------------------|
| Framework   | Next.js, Astro, SvelteKit, plain HTML/CSS    |
| Styling     | Tailwind CSS, CSS Modules, Sass              |
| Deployment  | Vercel, Netlify, GitHub Pages, Cloudflare    |
| CMS/Data    | Markdown files, Sanity, Contentful, Notion   |

Once selected, document the exact versions in this section.

---

## Development Workflows

### Starting fresh (once a stack is chosen)

```bash
# Install dependencies
npm install          # or pnpm install / yarn

# Start dev server
npm run dev

# Build for production
npm run build

# Run tests (if configured)
npm test
```

Update these commands to match the actual scripts in `package.json` once it exists.

### Git branch conventions

- Active development branch: `claude/claude-md-mmgs0djiyw055inm-h984B`
- Default/main branch: `master`
- Feature branches should use descriptive names: `feature/<short-description>`
- Always push with: `git push -u origin <branch-name>`

### Commit message style

Follow conventional commits:
```
feat: add gig listing page
fix: correct date formatting on releases
docs: update README with setup steps
chore: add .gitignore
```

---

## Key Conventions (to adopt as code is written)

These conventions should be followed once development begins:

1. **Accessibility first** — the repository is under the `a11y` GitHub account prefix (`jasonmalmberg7-a11y`). Prioritize semantic HTML, ARIA labels, and keyboard navigation.
2. **Mobile-first responsive design** — music fans browse on phones.
3. **Performance** — keep assets optimized; lazy-load images and embeds.
4. **Content separation** — keep data (gig dates, release info) separate from presentation logic so non-developers can update it easily.
5. **No unnecessary dependencies** — prefer native browser APIs and small, well-maintained packages.

---

## Site Sections (Planned)

Based on the README description, the site should include:

- **Gigs** — upcoming and past shows with dates, venues, and ticket links
- **Releases** — albums, EPs, singles with streaming/purchase links
- **Upcoming Projects** — news, announcements, works in progress
- *(Optional)* Bio, Press Kit, Contact

---

## AI Assistant Instructions

- **Do not invent a technology stack** without confirming with the user. The stack is undecided.
- **Do not create files speculatively** — only scaffold what has been agreed upon.
- **Accessibility is a priority** — always use semantic HTML elements and include ARIA attributes where needed.
- **Keep this file updated** — after any significant architectural decision (framework choice, deployment target, directory structure), update `CLAUDE.md` to reflect the current state.
- **Read before editing** — always read a file before modifying it.
- **Small, focused commits** — commit one logical change at a time with a clear message.

---

## Remote & CI

- **Remote:** `http://local_proxy@127.0.0.1:31183/git/jasonmalmberg7-a11y/Jason-Malmberg-Website`
- **CI/CD:** Not yet configured. Document pipeline details here once set up.

---

*Last updated: 2026-03-07. Update this file as the project evolves.*
