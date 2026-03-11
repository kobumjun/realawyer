import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://realawyer.vercel.app",
      lastModified: new Date(),
    },
    {
      url: "https://realawyer.vercel.app/cases",
      lastModified: new Date(),
    },
  ];
}
