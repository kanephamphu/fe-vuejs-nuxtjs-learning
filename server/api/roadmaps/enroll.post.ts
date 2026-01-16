import { db } from '~/server/db';
import { userRoadmaps } from '~/server/db/schema';
import { eq, and } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    const user = event.context.user;
    if (!user) throw createError({ statusCode: 401, message: 'Unauthorized' });

    const body = await readBody(event);
    const { roadmapId } = body;

    if (!roadmapId) throw createError({ statusCode: 400, message: 'Missing roadmapId' });

    // Check if already enrolled
    const existing = await db.select().from(userRoadmaps).where(
        and(
            eq(userRoadmaps.userId, user.id),
            eq(userRoadmaps.roadmapId, roadmapId)
        )
    ).get();

    if (existing) return { success: true, message: 'Already enrolled' };

    // Enroll
    await db.insert(userRoadmaps).values({
        userId: user.id,
        roadmapId: roadmapId
    }).run();

    return { success: true };
});
