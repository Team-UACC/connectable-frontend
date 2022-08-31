import fs from 'fs';

const generatedSitemap = `
User-agent: *
Disallow: /my/

Sitemap: https://connectable.fans/sitemap.xml

`;

fs.writeFileSync('../../public/robots.txt', generatedSitemap, 'utf8');
