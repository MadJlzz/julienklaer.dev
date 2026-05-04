import rss from '@astrojs/rss';
import { getPosts } from '../lib/posts';
import { SITE } from '../site';

export async function GET(context) {
  const items = (await getPosts()).map((entry) => ({
    title: entry.data.title,
    pubDate: entry.data.date,
    description: entry.data.excerpt ?? '',
    link: `/posts/${entry.id}/`,
    categories: entry.data.tags ?? [],
  }));

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items,
    customData: '<language>en-us</language>',
  });
}
