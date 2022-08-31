import fs from 'fs';

import axios from 'axios';
import prettier from 'prettier';

// 오늘 날짜 가져오기 & 도메인 설정
const getDate = new Date().toISOString();
const DOMAIN = 'https://connectable.fans';

const formatted = sitemap => prettier.format(sitemap, { parser: 'html' });

(async () => {
  let response = [];

  await axios
    .get(`https://api.connectable.fans/events`)
    .then(res => {
      response = res.data;
    })
    .catch(e => {
      console.log(e);
    });

  const eventList = [];
  // 적절히 파싱
  response.forEach(event => eventList.push({ id: event.id, title: event.name }));

  // 요것도 xml 구조에 맞게 파싱하여 재조립
  const eventListSitemap = `
  ${eventList
    .map(event => {
      return `
        <url>
          <loc>${`${DOMAIN}/community/threads/${event.id}`}</loc>
          <lastmod>${getDate}</lastmod>
        </url>`;
    })
    .join('')}
`;

  const generatedSitemap = `
	<?xml version="1.0" encoding="UTF-8"?>
  	<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
  >
    ${eventListSitemap}
  </urlset>
`;

  const formattedSitemap = formatted(generatedSitemap);

  fs.writeFileSync('../../public/sitemap/sitemap-events.xml', formattedSitemap, 'utf8');
})();
