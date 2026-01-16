import { db } from '~/server/db';
import { lessons, exercises, userProgress } from '~/server/db/schema';
import { eq, and } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug required' });
  }

  const lesson = await db.select().from(lessons).where(eq(lessons.slug, slug)).get();
  
  if (!lesson) {
    throw createError({ statusCode: 404, statusMessage: 'Lesson not found' });
  }

  const exercise = await db.select().from(exercises).where(eq(exercises.lessonId, lesson.id)).get();

  const user = event.context.user;
  let progress = null;
  if (user) {
    progress = await db.select().from(userProgress)
      .where(and(eq(userProgress.userId, user.id), eq(userProgress.lessonId, lesson.id)))
      .get();
  }

  return { ...lesson, exercise, progress };
});
