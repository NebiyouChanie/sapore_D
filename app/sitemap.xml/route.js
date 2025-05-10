import { NextResponse } from 'next/server';

const BASE_URL = 'https://www.saporerestaurant.com';

const staticPages = [
  '/',
  '/about-us',
  '/booking',
  '/gallery',
  '/location',
  '/menu',
];

export async function GET() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages
      .map((page) => {
        return `
      <url>
        <loc>${BASE_URL}${page}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>`;
      })
      .join('')}
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}
