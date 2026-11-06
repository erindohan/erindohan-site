import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );

  return rss({
    title: 'Erin Dohan',
    description:
      "Essays on survival, healing, women's health, and the memoir process from Erin Dohan, author of I Think I'm Ready to Talk.",
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.slug}/`,
      author: post.data.author,
      categories: post.data.tags,
    })),
    customData: '<language>en-us</language>',
  });
}
