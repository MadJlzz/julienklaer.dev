import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

const SITE_TITLE = '// MadJlzz';
const SITE_DESC = 'logs from the edge of the network';

export async function GET(context) {
  const entries = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);

  const items = entries
    .map((entry) => ({
      title: entry.data.title,
      pubDate: entry.data.date,
      description: entry.data.excerpt ?? '',
      link: `/posts/${entry.id}/`,
      categories: entry.data.tags ?? [],
    }))
    .sort((a, b) => +b.pubDate - +a.pubDate);

  return rss({
    title: SITE_TITLE,
    description: SITE_DESC,
    site: context.site,
    items,
    customData: '<language>en-us</language>',
  });
}
