import { MetadataRoute } from "next";
import { getCases } from "@/lib/cases";

const BASE = "https://realawyer.vercel.app";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${BASE}/cases`, lastModified: new Date() },
  ];

  try {
    const cases = await getCases();
    const caseEntries: MetadataRoute.Sitemap = cases
      .filter((c) => c?.slug && String(c.slug).trim())
      .map((c) => {
        const lastMod = c.updatedAt || c.createdAt;
        return {
          url: `${BASE}/case/${c.slug}`,
          lastModified: lastMod ? new Date(lastMod) : new Date(),
        };
      });

    return [...staticEntries, ...caseEntries];
  } catch (err) {
    console.error("[sitemap] Failed to fetch cases:", err);
    return staticEntries;
  }
}
