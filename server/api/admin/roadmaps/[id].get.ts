import { db } from '../../../db';
import { roadmaps } from '../../../db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  // TODO: Add admin authentication check
  const id = Number(event.context.params?.id);
  if (!id) throw createError({ statusCode: 400, message: "Invalid ID" });

  // 1. Fetch Roadmap
  const roadmap = await db.select().from(roadmaps).where(eq(roadmaps.id, id)).get();
  if (!roadmap) throw createError({ statusCode: 404, message: "Roadmap not found" });

  return {
    roadmap: {
      id: roadmap.id,
      title: roadmap.title,
      description: roadmap.description,
      createdAt: roadmap.createdAt
    }
  };
});
