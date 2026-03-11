import { NextResponse } from "next/server";
import { getCases } from "@/lib/cases";

const BASE = "https://realawyer.vercel.app";

export const dynamic = "force-dynamic";

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toLastmod(date: Date): string {
  return date.toISOString();
}

export async function GET() {
  const urls: { loc: string; lastmod: string }[] = [
    { loc: `${BASE}/cases`, lastmod: toLastmod(new Date()) },
  ];

  try {
    const cases = await getCases();
    for (const c of cases) {
      if (c?.slug && String(c.slug).trim()) {
        const lastMod = c.updatedAt || c.createdAt;
        urls.push({
          loc: `${BASE}/case/${c.slug}`,
          lastmod: lastMod ? toLastmod(new Date(lastMod)) : toLastmod(new Date()),
        });
      }
    }
  } catch (err) {
    console.error("[sitemap] Failed to fetch cases:", err);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <lastmod>${escapeXml(u.lastmod)}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
