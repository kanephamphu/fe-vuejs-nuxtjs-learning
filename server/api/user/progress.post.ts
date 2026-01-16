import { db } from '~/server/db';
import { userProgress } from '~/server/db/schema';
import { eq, and } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  if (!user) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });

  const body = await readBody(event);
  const { lessonId, status } = body;

  if (!lessonId || !status) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' });
  }

  const existing = await db.select().from(userProgress)
    .where(and(eq(userProgress.userId, user.id), eq(userProgress.lessonId, lessonId)))
    .get();

  if (existing) {
    await db.update(userProgress)
      .set({ status, updatedAt: new Date() })
      .where(eq(userProgress.id, existing.id))
      .run();
  } else {
    await db.insert(userProgress)
      .values({ userId: user.id, lessonId, status })
      .run();
  }

  return { success: true };
});
