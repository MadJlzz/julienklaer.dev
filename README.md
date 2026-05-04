# // MadJlzz

Personal blog. Terminal/space aesthetic. Astro + Markdown + Gohufont Nerd Font.

## Writing

```bash
npm run dev          # localhost:4321
npm run build        # static site -> ./dist
npm run preview      # preview built output
```

Add a post in `src/content/posts/*.{md,mdx}`.

Frontmatter is validated by zod (`src/content/config.ts`). Required fields:
`title`, `date`, `level` (`easy` | `intermediate` | `advanced`). Use
`draft: true` to hide a post in production.

## Customizing

- Site title — `SITE_TITLE` in `src/layouts/BaseLayout.astro`
- Colors — CSS custom properties in `src/styles/global.css`
- Hero — `src/components/Hero.astro`
- Code theme — `shikiConfig.theme` in `astro.config.mjs`
