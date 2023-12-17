import rss, { pagesGlobToRssItems } from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET() {
  const blogs = await pagesGlobToRssItems(import.meta.glob("./**/*.md"));
  const news = await getCollection("news");
  const items = [
    ...blogs,
    ...news.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/news/${post.slug}`,
    })),
  ];
  return rss({
    title: "Astro学習者 | ブログ",
    description: "Astro学ぶたび",
    site: "https://astro-lab.dev",
    items: items,
    customData: `<language>ja</language>`,
  });
}
