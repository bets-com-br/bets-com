import { getAllPostsWithSlug } from '@/lib/api';
import { SitemapStream, streamToPromise } from 'sitemap';

export default async (req, res) => {
  const webUrl = `https://${req.headers.host}`;
  try {
    const smStream = new SitemapStream({
      hostname: webUrl,
      cacheTime: 600000,
    });

    // List of posts
    const posts = await getAllPostsWithSlug();

    // Create each URL row
    posts.forEach(post => {
      smStream.write({
        url: `/${post.slug}`,
        changefreq: 'daily',
        priority: 0.9
      });
    });

    // End sitemap stream
    smStream.end();

    // XML sitemap string
    const sitemapOutput = (await streamToPromise(smStream)).toString();

    // Change headers
    res.writeHead(200, {
      'Content-Type': 'application/xml'
    });

    // Display output to user
    res.end(sitemapOutput);
  } catch(e) {
    res.send(JSON.stringify(e))
  }
}
