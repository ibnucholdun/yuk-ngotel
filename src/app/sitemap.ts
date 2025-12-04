import { getRooms } from "@/lib/data";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yuk-ngotel.vercel.app";

  // Static routes
  const routes = [
    "",
    "/about",
    "/rooms",
    "/contact",
    "/sign-in",
    "/sign-up",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic routes (Rooms)
  const { rooms } = await getRooms();
  const roomRoutes = rooms.map((room) => ({
    url: `${baseUrl}/rooms/${room.id}`,
    lastModified: room.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...routes, ...roomRoutes];
}
