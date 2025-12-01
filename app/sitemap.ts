import { MetadataRoute } from "next";
import { VALID_ROLES } from "@/lib/demo-data";

const BASE_URL = "https://free-meeting-cost-calculator.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const costPages = VALID_ROLES.map((role) => ({
    url: `${BASE_URL}/cost/${role}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...costPages,
  ];
}
