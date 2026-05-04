---
title: hello, world
date: 2026-05-04
level: easy
draft: true
excerpt: a first transmission — and a tour of what astro lets us do.
tags: [meta, astro, beginnings]
---

This is the first post. The blog is up; the writing is the work.

## what lives here

Anything I want to think out loud about — long-form essays, technical
walkthroughs, short TILs, project notes. Drafted in Markdown and shipped
on `git push`. No CMS, no admin panel, no excuses.

> The medium shapes the message. The terminal shapes how I think about both.

## what astro gives us

Astro 5's `glob` loader pairs with zod for typed frontmatter. The build
fails fast if a post is missing `title`, `date`, or `level`:

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    level: z.enum(['easy', 'intermediate', 'advanced']),
    excerpt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});
```

Drafts skip production builds but stay visible in `astro dev`, which is
exactly the workflow I'm after.

## still true in 2026

The Internet Archive's GeoCities mirror is the best argument for static
HTML I know. Pages from 1998 still load instantly: no broken JS, no
trackers, no cookie banner. If a webpage outlives the company that hosted
it, you got the architecture right.

## what's painted in the background

The drifting starfield is ~50 lines of vanilla JS in
`src/components/Starfield.astro`. It paints ~150 pixel stars on a canvas,
twinkles them with a sine wave, and pauses on `prefers-reduced-motion: reduce`.

Engines on.
