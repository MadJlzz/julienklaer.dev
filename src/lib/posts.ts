import { getCollection, type CollectionEntry } from 'astro:content';

export async function getPosts() {
  const entries = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return entries.sort((a, b) => +b.data.date - +a.data.date);
}

export function toListItem(entry: CollectionEntry<'posts'>) {
  return {
    slug: entry.id,
    title: entry.data.title,
    date: entry.data.date,
    level: entry.data.level,
    excerpt: entry.data.excerpt,
    href: `/posts/${entry.id}/`,
    draft: entry.data.draft,
  };
}

export async function getAllTags() {
  const posts = await getPosts();
  const tags = new Set<string>();
  for (const p of posts) for (const t of p.data.tags) tags.add(t);
  return [...tags].sort();
}

export async function getPostsByTag(tag: string) {
  const posts = await getPosts();
  return posts.filter((p) => p.data.tags.includes(tag));
}
